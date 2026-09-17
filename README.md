# Career Mastermind

Quero construir um dashboard de "Modo Carreira Ultimate Team" (EAFC) chamado "J90 Career UT" — uma réplica funcional o mais fiel possível de um projeto de referência que já tenho, com backend real (Lovable Cloud / Supabase), não apenas visual estático.

## Visão geral
Um app de gestão de carreira de clube no Ultimate Team: elenco, convocações (escalação titular+banco), evoluções de jogadores (EVOs / La Fábrica), finanças, competições/campanhas, "Eras" (marcos narrativos da carreira) e táticas. Tudo isolado por `career_id` (pode haver múltiplas carreiras, mas só uma "ATIVA" por vez).

## Backend — ative o Lovable Cloud e crie este schema (nomes de tabela e colunas em snake_case, com RLS liberado para o usuário autenticado dono dos dados; pode usar auth simples do Supabase):

**careers**: id, name, club_name, game_edition (ex "EAFC 27"), season (ex "2026/27"), status ("ATIVA"|"ARQUIVADA"), logo_path (storage), primary_color, secondary_color, accent_color, current_funds (saldo inicial), current_era, main_objective, overall_wins, overall_draws, overall_losses, created_at, updated_at. Regra: só UMA carreira ATIVA por vez.

**players**: id, career_id (fk), name, short_name, main_position, alt_positions (text[]), nationality, initial_ovr, current_ovr, card_type ("Ouro"|"Especial"|"EVO"|"Hero"|"Icon"), club_status ("ATIVO"|"ARQUIVADO"|"VENDIDO"), origin ("MERCADO"|"FIRST_OWNER"|"DME"|"OBJETIVO" — forma de aquisição: Mercado/Pack-Recompensa/DME-SBC/Objetivo-Evento), narrative_category ("ATUAL"|"HERO"|"ICON"|"VETERANO_HISTORICO"), acquisition_value (só conta custo se origin=MERCADO ou DME), market_value, arrival_date, arrival_era, arrival_episode, la_fabrica (bool — jogador da base), notes, current_card_id (fk player_cards), created_at, updated_at.

**player_cards**: id, player_id (fk), image_path (storage bucket "player-cards"), label, is_current (bool), card_type, ovr, created_at. Histórico de cartas do jogador; a carta atual referenciada por players.current_card_id.

**player_evos**: id, career_id, player_id (fk), name, applied_at (date), ovr_before, ovr_after, cost, notes, result_card_id (fk player_cards, opcional), status ("ATIVA"|"RESETADA"), reset_at, chain (int, cadeia de evoluções — incrementa a cada reset), created_at, updated_at. Cada EVO gera automaticamente (trigger) um registro espelho em player_investments (kind='EVO', vinculado por evo_id) — nenhum total duplicado.

**player_investments**: id, player_id (fk), evo_id (fk opcional), kind (ex "EVO"), amount, description, created_at. Soma por jogador = investimento total (usado em capital investido / valor de mercado ajustado).

**call_ups**: id, career_id, name, competition, played_on (date), formation (ex "4-3-3", "3-5-2"), tactic, eafc_code (código copiável), tactic_id (fk tactics opcional), status ("ativa"|"arquivada"), created_at, updated_at. Só uma convocação "ativa" relevante por vez (a exibida na Central).

**call_up_slots**: id, call_up_id (fk), career_id, slot_type ("TITULAR"|"BANCO"), slot_index (int, ordem), player_id (fk players, nullable), position, created_at, updated_at. 11 titulares (conforme a formação) + 7 reservas.

**formations**: id, name (ex "4-3-3", "3-5-2"), game_edition, is_active, sort_order, created_at, updated_at. Catálogo global de formações — usado para desenhar as linhas do campo (função formationRows: string "4-2-3-1" vira array de linhas [1,4,2,3,1] etc, GK sempre implícito na primeira linha).

**tactics**: id, career_id, formation_id (fk formations, opcional), name, eafc_code, description, status ("ATIVA"|"ARQUIVADA"), created_at, updated_at.

**competitions**: id, career_id, name, category ("LIGA"|"COPA_DOMESTICA"|"CHAMPIONS_LEAGUE" — CHAMPIONS_LEAGUE é usada narrativamente pra representar a FUT Champions/Weekend League), season, status ("EM_ANDAMENTO"|"CONCLUIDA"|"ARQUIVADA"), started_on, starts_on, ended_on, notes, created_at, updated_at.

**competition_campaigns**: id, career_id, competition_id (fk), played_on, round_number, wins, losses, draws, final_rank, mvp_player_id/villain_player_id/surprise_player_id/fan_favorite_player_id/top_scorer_player_id/top_assister_player_id (todos fk players nullable), top_scorer_goals, top_assister_assists, notes, created_at, updated_at. Prêmios narrativos por campanha: MVP da Semana, Vilão da Semana, Surpresa da Semana, Craque da Galera, Artilheiro, Garçom.

**eras**: id, career_id, order_number (int), name, subtitle, description, status ("FUTURA"|"ATIVA"|"PRONTA_PARA_ENCERRAR"|"CONCLUIDA"|"ARQUIVADA"), started_on, ended_on, notes, financial_goal_id (fk financial_goals, opcional), financial_goal_required (bool), banner_path, symbol, theme, created_at, updated_at. Só uma Era ATIVA por carreira.

**era_requirements**: id, era_id (fk), career_id, kind ("QUANTIDADE_ADQUIRIDA"|"QUANTIDADE_CONVOCADA"|"OBJETIVO_MANUAL"|"COMPETICAO"|"FINANCEIRO"|"LA_FABRICA"|"JOVENS_DESENVOLVIDOS"|"OUTRO"), player_category (mesmas categorias narrativas de players, nullable), player_filter ("QUALQUER"|"LA_FABRICA"), target_value, required (bool), sort_order, description, manual_done (bool, pra tipos não-automáticos), created_at, updated_at.

**era_objectives**: id, era_id, career_id, title, description, kind ("ELENCO"|"FINANCEIRO"|"COMPETICAO"|"LA_FABRICA"|"NARRATIVO"|"OUTRO"), status ("PENDENTE"|"EM_ANDAMENTO"|"CONCLUIDO"), required, progress (0-100 nullable), sort_order, created_at, updated_at.

**era_milestones**: id, era_id, career_id, occurred_on, title, description, category ("CONTRATACAO"|"EVO"|"COMPETICAO"|"FINANCAS"|"CONQUISTA"|"NARRATIVA"|"OUTRO"), player_id (fk nullable), competition_id (fk nullable), financial_goal_id (fk nullable), image_path, created_at, updated_at.

**financial_transactions**: id, career_id, occurred_on, description, kind ("RECEITA"|"DESPESA"), category (receitas: "Premiação","Venda de jogador","Recompensa","Outras receitas"; despesas: "Contratação","Evolução","Taxa / investimento","Outras despesas"), amount, source_type ("MANUAL"|"ELENCO"|"EVO"|"COMPETICAO"|"SISTEMA"|"CONCILIACAO"), source_id (nullable, evita duplicar contabilização — índice único em source_type+source_id quando não nulo), notes, created_at, updated_at.

**financial_goals**: id, career_id, name, target_value, player_id (fk nullable), status ("ATIVO"|"CONCLUIDO"|"ARQUIVADO"), is_primary (bool, só um por carreira), notes, target_card_path (storage bucket "financial-goal-cards"), acquired_player_id (fk nullable), completion_method (nullable: "FINANCEIRO"|"PACK_RECOMPENSA"|"DME_SBC"|"OBJETIVO_EVENTO" — conclusão alternativa não financeira, sem gerar transação), completed_at, created_at, updated_at.

Buckets de storage necessários: "player-cards", "career-logos", "financial-goal-cards" (imagens assinadas/privadas).

## Regras de negócio importantes
- Saldo atual da carreira = careers.current_funds (saldo inicial) + soma(RECEITA) − soma(DESPESA) de financial_transactions daquela carreira.
- "Capital investido" de um jogador = acquisition_value + soma dos investimentos (EVOs). "Valor J90" = market_value + investimentos.
- Resetar uma EVO (ação real do jogo) marca a cadeia como RESETADA mas preserva histórico e o dinheiro gasto continua contando como investido (nada é devolvido).
- "Jovens desenvolvidos" (para requisito JOVENS_DESENVOLVIDOS de Era) = jogadores com la_fabrica=true e pelo menos 1 EVO (qualquer status), contagem distinta.
- Progresso de uma Era = média ponderada dos requisitos+objetivos obrigatórios (se houver algum obrigatório, só eles contam; senão, todos). Requisitos automáticos contam proporcionalmente (atual/meta); objetivos EM_ANDAMENTO valem 0.5, CONCLUIDO vale 1. Se há alvo financeiro obrigatório, ele entra também. Uma Era só pode avançar/concluir se tiver pelo menos 1 requisito obrigatório configurado e todos cumpridos.
- Conciliação de caixa: ajustes manuais viram uma financial_transaction com source_type=CONCILIACAO.

## Design visual (tema escuro "cinematic navy & gold", estilo carta FUT) — use estes tokens de cor:
Fundo geral: gradiente radial azul-marinho profundo (#020b18 → #04101f → #01070f). Painéis ("cards"): fundo translúcido azul-marinho com blur (glassmorphism), borda sutil azul clara translúcida, cantos arredondados (~0.75rem), sombra suave. Um filete dourado vertical opcional na lateral esquerda de painéis destacados ("panel-accent"). Cor dourada de destaque: oklch(0.82 0.14 88) (texto "gold", usado em títulos de painel, números-chave e barras de progresso). Cor de sucesso: verde oklch(0.78 0.19 150). Aviso: amarelo oklch(0.85 0.17 92). Info/azul: #55c7f3 e #168bff (usado em barras de progresso secundárias e nos gráficos radiais). Texto principal quase branco, texto secundário azul-acinzentado (#8fabce). Fontes: títulos/números em "Oswald" (display, uppercase, tracking largo), texto em "Barlow". Painéis têm um cabeçalho com título pequeno em uppercase dourado + uma linha divisória fina ("hairline") com gradiente dourado→transparente. Barras de progresso finas e arredondadas (0.45rem altura) com preenchimento em gradiente dourado ou azul.

## Layout e navegação
Sidebar fixa à esquerda (largura ~13.5rem, fundo quase preto translúcido com blur): logo "J90 / Career UT" no topo, depois "Central do Clube" (home), depois seção "Gestão" com: Carreiras, Elenco, Convocações, La Fábrica, Táticas, Competições, Finanças, Eras/História — cada item com ícone (lucide-react) e texto uppercase pequeno com tracking largo; item ativo tem borda dourada à esquerda. Rodapé da sidebar mostra o escudo/nome do clube da carreira ativa.

### Página "Central do Clube" (home, tela cheia, sem scroll da página — layout tipo cockpit/HUD):
- Header: escudo circular do clube + nome do clube + "Modo Carreira UT" + era atual, e à direita um HUD com Temporada / Elenco (X/Y) / Caixa (dourado) / badge "No ar" pulsante verde.
- Linha de 5 painéis: "Era Atual" (número romano da era + nome + barra de progresso), "Reconstrução do Elenco" (contagem atual/meta + barra), "Objetivo Principal" (carta-alvo + nome + caixa/alvo/faltam + barra, ou "concluído" com o método de aquisição), "Última FUT Champions" (placar V-D + craque da semana com a carta dele), "Próximo Compromisso" (nome da competição + data).
- Área principal dividida em duas colunas:
  - Esquerda: "Convocação Ativa" — um campo de futebol estilizado em perspectiva (gramado verde escuro com linhas do campo desenhadas em SVG, leve efeito 3D só no fundo, as cartas dos jogadores SEM inclinação) mostrando as linhas de titulares conforme a formação, mais o "Banco de Reservas" (7 jogadores em miniatura) abaixo. No canto do painel, um mini card "Plano de Jogo" com Formação / Tática / Código EAFC (com botão copiar).
  - Direita: mosaico 2x com "Desempenho FUT Champions" (gráfico radial donut de aproveitamento V/E/D), "Desempenho Geral" (mesmo gráfico, editável manualmente), "La Fábrica" (lista de jovens com OVR inicial→atual e investimento), "Finanças Recentes" (últimas transações com ícone e valor colorido +/-), "Objetivos da Temporada" (checklist com status colorido).
- Cartas de jogador (PlayerCard): se houver imagem real (upload), mostra só a arte da carta (PNG) sem moldura. Sem imagem, desenha uma carta estilizada tipo FUT (formato hexagonal recortado, faixa de cor por raridade — Ícone dourado, Herói laranja, TOTY azul, Ouro amarelo, Especial verde —, OVR grande + posição no topo, silhueta de jogador no meio, nome + raridade embaixo).

### Painel do Técnico (uma página com as 8 seções de Gestão navegáveis por essa mesma sidebar, cada seção com CRUD completo via formulários/diálogos):
- **Carreiras**: criar/editar carreiras, upload de logo, ativar uma carreira (arquiva as demais automaticamente), editar saldo inicial e V/E/D gerais.
- **Elenco**: listar/filtrar jogadores (posição, status, categoria narrativa), formulário completo de jogador, upload de carta, histórico de cartas, marcar como vendido/arquivado.
- **Convocações**: criar convocação nomeando formação (puxa do catálogo formations), escalar titulares por posição conforme a formação e banco de 7, definir tática e código EAFC, ativar/arquivar.
- **La Fábrica**: gerenciar EVOs por jogador (aplicar evolução com OVR antes/depois e custo, resetar cadeia, excluir com cascata recalculando OVR/carta anteriores).
- **Táticas**: CRUD de táticas vinculadas a formações, com código EAFC.
- **Competições**: CRUD de competições e, dentro de cada uma, registrar campanhas (V/D/E, colocação final, prêmios narrativos MVP/Vilão/Surpresa/Craque da Galera/Artilheiro/Garçom).
- **Finanças**: lançar receitas/despesas manuais, ver resumo (entradas, saídas, investimento em elenco, investimento em EVOs), gerenciar objetivos financeiros (criar, definir principal, concluir por caixa OU por aquisição alternativa — Pack/DME/Objetivo — sem mexer no caixa), conciliação de saldo.
- **Eras / História**: CRUD de eras em ordem, requisitos (automáticos calculados a partir do elenco/convocação/EVOs, ou manuais), objetivos, marcos históricos (timeline), vincular objetivo financeiro à era, concluir/ativar era (só uma ativa por vez, só avança se todos requisitos obrigatórios cumpridos).

Comece criando o schema completo no Lovable Cloud com uma carreira padrão de exemplo já ativa (para o dashboard não ficar vazio), depois construa a página "Central do Clube" com os dados reais vindos do banco, e por fim as seções de gestão do Painel do Técnico. Pode usar dados de exemplo mínimos (alguns jogadores, uma convocação, uma era) só pra eu conseguir visualizar tudo funcionando, mas toda a lógica deve ler/escrever de verdade no banco — nada fixo no código.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://j90-career-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/82a26cf0-7745-483d-bbb2-a0df2a50d5ee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
