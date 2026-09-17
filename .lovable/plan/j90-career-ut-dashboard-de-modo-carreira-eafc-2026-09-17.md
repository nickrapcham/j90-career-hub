# J90 Career UT — Dashboard de Modo Carreira (EAFC)

App completo de gestão de carreira Ultimate Team, com backend real (banco de dados,
login e armazenamento de imagens) e visual escuro "navy & gold" estilo carta FUT.

## Etapa 1 — Backend e dados

Ativar o Lovable Cloud e criar todas as tabelas descritas: carreiras, jogadores,
cartas, evoluções, investimentos, convocações e escalações, formações, táticas,
competições e campanhas, eras (requisitos, objetivos, marcos), finanças
(transações e objetivos financeiros).

Regras aplicadas no banco:
- Apenas uma carreira ATIVA e uma Era ATIVA por carreira.
- Cada evolução gera automaticamente o investimento correspondente (sem duplicar).
- Transações não podem ser contabilizadas duas vezes (chave única por origem).
- Acesso protegido: cada usuário só enxerga os próprios dados.
- Três áreas de imagens: cartas de jogador, escudos de carreira, cartas-alvo.

Catálogo de formações global (4-3-3, 4-2-3-1, 3-5-2, 4-4-2, 5-2-1-2, etc.).

Dados de exemplo já criados: uma carreira ativa com escudo, ~14 jogadores,
uma convocação escalada (11 + 7), algumas evoluções, uma era ativa com
requisitos e objetivos, competições com campanhas e movimentações financeiras.

## Etapa 2 — Design system

Tokens de cor, fontes Oswald/Barlow, painéis de vidro com filete dourado,
barras de progresso finas, cabeçalhos com linha dourada. Tudo centralizado no
tema — nada de cor solta nos componentes.

Componentes base: Painel, Cabeçalho de painel, Barra de progresso, Gráfico
radial (donut V/E/D), Carta de jogador (arte enviada ou carta FUT desenhada por
raridade), Campo de futebol em SVG.

## Etapa 3 — Central do Clube (home)

Tela cheia estilo cockpit: cabeçalho com escudo, clube, era e HUD (temporada,
elenco, caixa, "No ar"); faixa de 5 painéis (Era Atual, Reconstrução do Elenco,
Objetivo Principal, Última FUT Champions, Próximo Compromisso); coluna esquerda
com a convocação ativa no campo + banco + plano de jogo com código copiável;
coluna direita com mosaico (Desempenho FUT Champions, Desempenho Geral,
La Fábrica, Finanças Recentes, Objetivos da Temporada).

Todos os números vêm do banco.

## Etapa 4 — Painel do Técnico (8 seções)

Sidebar fixa com Central do Clube + Gestão. Cada seção com cadastro completo:

- Carreiras: criar/editar, escudo, ativar (arquiva as outras), saldo inicial, V/E/D.
- Elenco: lista com filtros, ficha completa, upload e histórico de cartas.
- Convocações: montar escalação pela formação, banco de 7, tática e código EAFC.
- La Fábrica: aplicar evolução (OVR antes/depois e custo), resetar cadeia, excluir.
- Táticas: cadastro ligado à formação, com código EAFC.
- Competições: competições e campanhas com prêmios narrativos.
- Finanças: lançamentos, resumo, objetivos financeiros (conclusão por caixa ou
  por aquisição alternativa) e conciliação de saldo.
- Eras/História: eras em ordem, requisitos automáticos e manuais, objetivos,
  timeline de marcos, ativar/concluir com as regras de progresso.

## Notas técnicas

- Rotas TanStack: `/` (Central), `/gestao/*` para as oito seções.
- Leitura/escrita via server functions com o cliente autenticado (RLS).
- Cálculos derivados (saldo, capital investido, progresso da Era, jovens
  desenvolvidos) em funções utilitárias compartilhadas, alimentadas por consultas.
- Login simples por e-mail/senha; a carreira padrão de exemplo é associada ao
  primeiro usuário que entrar.

## Premissas

- Login por e-mail/senha (sem Google), já que não foi especificado.
- Entrego nesta ordem: banco + exemplos, Central do Clube, depois as seções de
  gestão — entregues na mesma execução.
