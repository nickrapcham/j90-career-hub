export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      call_up_slots: {
        Row: {
          call_up_id: string
          career_id: string
          created_at: string
          id: string
          player_id: string | null
          position: string | null
          slot_index: number
          slot_type: string
          updated_at: string
        }
        Insert: {
          call_up_id: string
          career_id: string
          created_at?: string
          id?: string
          player_id?: string | null
          position?: string | null
          slot_index?: number
          slot_type?: string
          updated_at?: string
        }
        Update: {
          call_up_id?: string
          career_id?: string
          created_at?: string
          id?: string
          player_id?: string | null
          position?: string | null
          slot_index?: number
          slot_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_up_slots_call_up_id_fkey"
            columns: ["call_up_id"]
            isOneToOne: false
            referencedRelation: "call_ups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_up_slots_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_up_slots_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      call_ups: {
        Row: {
          career_id: string
          competition: string | null
          created_at: string
          eafc_code: string | null
          formation: string
          id: string
          name: string
          played_on: string | null
          status: string
          tactic: string | null
          tactic_id: string | null
          updated_at: string
        }
        Insert: {
          career_id: string
          competition?: string | null
          created_at?: string
          eafc_code?: string | null
          formation?: string
          id?: string
          name: string
          played_on?: string | null
          status?: string
          tactic?: string | null
          tactic_id?: string | null
          updated_at?: string
        }
        Update: {
          career_id?: string
          competition?: string | null
          created_at?: string
          eafc_code?: string | null
          formation?: string
          id?: string
          name?: string
          played_on?: string | null
          status?: string
          tactic?: string | null
          tactic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_ups_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_ups_tactic_id_fkey"
            columns: ["tactic_id"]
            isOneToOne: false
            referencedRelation: "tactics"
            referencedColumns: ["id"]
          },
        ]
      }
      careers: {
        Row: {
          accent_color: string | null
          club_name: string
          created_at: string
          current_era: string | null
          current_funds: number
          game_edition: string
          id: string
          logo_path: string | null
          main_objective: string | null
          name: string
          overall_draws: number
          overall_losses: number
          overall_wins: number
          primary_color: string | null
          season: string
          secondary_color: string | null
          status: string
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          club_name?: string
          created_at?: string
          current_era?: string | null
          current_funds?: number
          game_edition?: string
          id?: string
          logo_path?: string | null
          main_objective?: string | null
          name: string
          overall_draws?: number
          overall_losses?: number
          overall_wins?: number
          primary_color?: string | null
          season?: string
          secondary_color?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          club_name?: string
          created_at?: string
          current_era?: string | null
          current_funds?: number
          game_edition?: string
          id?: string
          logo_path?: string | null
          main_objective?: string | null
          name?: string
          overall_draws?: number
          overall_losses?: number
          overall_wins?: number
          primary_color?: string | null
          season?: string
          secondary_color?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      competition_campaigns: {
        Row: {
          career_id: string
          competition_id: string
          created_at: string
          draws: number
          fan_favorite_player_id: string | null
          final_rank: string | null
          id: string
          losses: number
          mvp_player_id: string | null
          notes: string | null
          played_on: string | null
          round_number: number | null
          surprise_player_id: string | null
          top_assister_assists: number | null
          top_assister_player_id: string | null
          top_scorer_goals: number | null
          top_scorer_player_id: string | null
          updated_at: string
          villain_player_id: string | null
          wins: number
        }
        Insert: {
          career_id: string
          competition_id: string
          created_at?: string
          draws?: number
          fan_favorite_player_id?: string | null
          final_rank?: string | null
          id?: string
          losses?: number
          mvp_player_id?: string | null
          notes?: string | null
          played_on?: string | null
          round_number?: number | null
          surprise_player_id?: string | null
          top_assister_assists?: number | null
          top_assister_player_id?: string | null
          top_scorer_goals?: number | null
          top_scorer_player_id?: string | null
          updated_at?: string
          villain_player_id?: string | null
          wins?: number
        }
        Update: {
          career_id?: string
          competition_id?: string
          created_at?: string
          draws?: number
          fan_favorite_player_id?: string | null
          final_rank?: string | null
          id?: string
          losses?: number
          mvp_player_id?: string | null
          notes?: string | null
          played_on?: string | null
          round_number?: number | null
          surprise_player_id?: string | null
          top_assister_assists?: number | null
          top_assister_player_id?: string | null
          top_scorer_goals?: number | null
          top_scorer_player_id?: string | null
          updated_at?: string
          villain_player_id?: string | null
          wins?: number
        }
        Relationships: [
          {
            foreignKeyName: "competition_campaigns_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_fan_favorite_player_id_fkey"
            columns: ["fan_favorite_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_mvp_player_id_fkey"
            columns: ["mvp_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_surprise_player_id_fkey"
            columns: ["surprise_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_top_assister_player_id_fkey"
            columns: ["top_assister_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_top_scorer_player_id_fkey"
            columns: ["top_scorer_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_campaigns_villain_player_id_fkey"
            columns: ["villain_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          career_id: string
          category: string
          created_at: string
          ended_on: string | null
          id: string
          name: string
          notes: string | null
          season: string | null
          started_on: string | null
          starts_on: string | null
          status: string
          updated_at: string
        }
        Insert: {
          career_id: string
          category?: string
          created_at?: string
          ended_on?: string | null
          id?: string
          name: string
          notes?: string | null
          season?: string | null
          started_on?: string | null
          starts_on?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          career_id?: string
          category?: string
          created_at?: string
          ended_on?: string | null
          id?: string
          name?: string
          notes?: string | null
          season?: string | null
          started_on?: string | null
          starts_on?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitions_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      era_milestones: {
        Row: {
          career_id: string
          category: string
          competition_id: string | null
          created_at: string
          description: string | null
          era_id: string
          financial_goal_id: string | null
          id: string
          image_path: string | null
          occurred_on: string
          player_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          career_id: string
          category?: string
          competition_id?: string | null
          created_at?: string
          description?: string | null
          era_id: string
          financial_goal_id?: string | null
          id?: string
          image_path?: string | null
          occurred_on?: string
          player_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          career_id?: string
          category?: string
          competition_id?: string | null
          created_at?: string
          description?: string | null
          era_id?: string
          financial_goal_id?: string | null
          id?: string
          image_path?: string | null
          occurred_on?: string
          player_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "era_milestones_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "era_milestones_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "era_milestones_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "era_milestones_financial_goal_id_fkey"
            columns: ["financial_goal_id"]
            isOneToOne: false
            referencedRelation: "financial_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "era_milestones_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      era_objectives: {
        Row: {
          career_id: string
          created_at: string
          description: string | null
          era_id: string
          id: string
          kind: string
          progress: number | null
          required: boolean
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          career_id: string
          created_at?: string
          description?: string | null
          era_id: string
          id?: string
          kind?: string
          progress?: number | null
          required?: boolean
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          career_id?: string
          created_at?: string
          description?: string | null
          era_id?: string
          id?: string
          kind?: string
          progress?: number | null
          required?: boolean
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "era_objectives_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "era_objectives_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
        ]
      }
      era_requirements: {
        Row: {
          career_id: string
          created_at: string
          description: string | null
          era_id: string
          id: string
          kind: string
          manual_done: boolean
          player_category: string | null
          player_filter: string
          required: boolean
          sort_order: number
          target_value: number
          updated_at: string
        }
        Insert: {
          career_id: string
          created_at?: string
          description?: string | null
          era_id: string
          id?: string
          kind?: string
          manual_done?: boolean
          player_category?: string | null
          player_filter?: string
          required?: boolean
          sort_order?: number
          target_value?: number
          updated_at?: string
        }
        Update: {
          career_id?: string
          created_at?: string
          description?: string | null
          era_id?: string
          id?: string
          kind?: string
          manual_done?: boolean
          player_category?: string | null
          player_filter?: string
          required?: boolean
          sort_order?: number
          target_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "era_requirements_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "era_requirements_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "eras"
            referencedColumns: ["id"]
          },
        ]
      }
      eras: {
        Row: {
          banner_path: string | null
          career_id: string
          created_at: string
          description: string | null
          ended_on: string | null
          financial_goal_id: string | null
          financial_goal_required: boolean
          id: string
          name: string
          notes: string | null
          order_number: number
          started_on: string | null
          status: string
          subtitle: string | null
          symbol: string | null
          theme: string | null
          updated_at: string
        }
        Insert: {
          banner_path?: string | null
          career_id: string
          created_at?: string
          description?: string | null
          ended_on?: string | null
          financial_goal_id?: string | null
          financial_goal_required?: boolean
          id?: string
          name: string
          notes?: string | null
          order_number?: number
          started_on?: string | null
          status?: string
          subtitle?: string | null
          symbol?: string | null
          theme?: string | null
          updated_at?: string
        }
        Update: {
          banner_path?: string | null
          career_id?: string
          created_at?: string
          description?: string | null
          ended_on?: string | null
          financial_goal_id?: string | null
          financial_goal_required?: boolean
          id?: string
          name?: string
          notes?: string | null
          order_number?: number
          started_on?: string | null
          status?: string
          subtitle?: string | null
          symbol?: string | null
          theme?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "eras_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eras_financial_goal_id_fkey"
            columns: ["financial_goal_id"]
            isOneToOne: false
            referencedRelation: "financial_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_goals: {
        Row: {
          acquired_player_id: string | null
          career_id: string
          completed_at: string | null
          completion_method: string | null
          created_at: string
          id: string
          is_primary: boolean
          name: string
          notes: string | null
          player_id: string | null
          status: string
          target_card_path: string | null
          target_value: number
          updated_at: string
        }
        Insert: {
          acquired_player_id?: string | null
          career_id: string
          completed_at?: string | null
          completion_method?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          name: string
          notes?: string | null
          player_id?: string | null
          status?: string
          target_card_path?: string | null
          target_value?: number
          updated_at?: string
        }
        Update: {
          acquired_player_id?: string | null
          career_id?: string
          completed_at?: string | null
          completion_method?: string | null
          created_at?: string
          id?: string
          is_primary?: boolean
          name?: string
          notes?: string | null
          player_id?: string | null
          status?: string
          target_card_path?: string | null
          target_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_goals_acquired_player_id_fkey"
            columns: ["acquired_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_goals_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_goals_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          amount: number
          career_id: string
          category: string | null
          created_at: string
          description: string
          id: string
          kind: string
          notes: string | null
          occurred_on: string
          source_id: string | null
          source_type: string
          updated_at: string
        }
        Insert: {
          amount?: number
          career_id: string
          category?: string | null
          created_at?: string
          description: string
          id?: string
          kind?: string
          notes?: string | null
          occurred_on?: string
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          career_id?: string
          category?: string | null
          created_at?: string
          description?: string
          id?: string
          kind?: string
          notes?: string | null
          occurred_on?: string
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      formations: {
        Row: {
          created_at: string
          game_edition: string
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          game_edition?: string
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          game_edition?: string
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      player_cards: {
        Row: {
          card_type: string | null
          created_at: string
          id: string
          image_path: string | null
          is_current: boolean
          label: string | null
          ovr: number | null
          player_id: string
        }
        Insert: {
          card_type?: string | null
          created_at?: string
          id?: string
          image_path?: string | null
          is_current?: boolean
          label?: string | null
          ovr?: number | null
          player_id: string
        }
        Update: {
          card_type?: string | null
          created_at?: string
          id?: string
          image_path?: string | null
          is_current?: boolean
          label?: string | null
          ovr?: number | null
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_cards_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_evos: {
        Row: {
          applied_at: string
          career_id: string
          chain: number
          cost: number
          created_at: string
          id: string
          name: string
          notes: string | null
          ovr_after: number | null
          ovr_before: number | null
          player_id: string
          reset_at: string | null
          result_card_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          applied_at?: string
          career_id: string
          chain?: number
          cost?: number
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          ovr_after?: number | null
          ovr_before?: number | null
          player_id: string
          reset_at?: string | null
          result_card_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          applied_at?: string
          career_id?: string
          chain?: number
          cost?: number
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          ovr_after?: number | null
          ovr_before?: number | null
          player_id?: string
          reset_at?: string | null
          result_card_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_evos_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_evos_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_evos_result_card_id_fkey"
            columns: ["result_card_id"]
            isOneToOne: false
            referencedRelation: "player_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      player_investments: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          evo_id: string | null
          id: string
          kind: string
          player_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          evo_id?: string | null
          id?: string
          kind?: string
          player_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          evo_id?: string | null
          id?: string
          kind?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_investments_evo_id_fkey"
            columns: ["evo_id"]
            isOneToOne: false
            referencedRelation: "player_evos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_investments_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          acquisition_value: number
          alt_positions: string[]
          arrival_date: string | null
          arrival_episode: string | null
          arrival_era: string | null
          card_type: string
          career_id: string
          club_status: string
          created_at: string
          current_card_id: string | null
          current_ovr: number
          id: string
          initial_ovr: number
          la_fabrica: boolean
          main_position: string
          market_value: number
          mercado_card_id: string | null
          name: string
          narrative_category: string
          nationality: string | null
          notes: string | null
          origin: string
          short_name: string | null
          updated_at: string
        }
        Insert: {
          acquisition_value?: number
          alt_positions?: string[]
          arrival_date?: string | null
          arrival_episode?: string | null
          arrival_era?: string | null
          card_type?: string
          career_id: string
          club_status?: string
          created_at?: string
          current_card_id?: string | null
          current_ovr?: number
          id?: string
          initial_ovr?: number
          la_fabrica?: boolean
          main_position?: string
          market_value?: number
          mercado_card_id?: string | null
          name: string
          narrative_category?: string
          nationality?: string | null
          notes?: string | null
          origin?: string
          short_name?: string | null
          updated_at?: string
        }
        Update: {
          acquisition_value?: number
          alt_positions?: string[]
          arrival_date?: string | null
          arrival_episode?: string | null
          arrival_era?: string | null
          card_type?: string
          career_id?: string
          club_status?: string
          created_at?: string
          current_card_id?: string | null
          current_ovr?: number
          id?: string
          initial_ovr?: number
          la_fabrica?: boolean
          main_position?: string
          market_value?: number
          mercado_card_id?: string | null
          name?: string
          narrative_category?: string
          nationality?: string | null
          notes?: string | null
          origin?: string
          short_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_current_card_id_fkey"
            columns: ["current_card_id"]
            isOneToOne: false
            referencedRelation: "player_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      tactics: {
        Row: {
          career_id: string
          created_at: string
          description: string | null
          eafc_code: string | null
          formation_id: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          career_id: string
          created_at?: string
          description?: string | null
          eafc_code?: string | null
          formation_id?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          career_id?: string
          created_at?: string
          description?: string | null
          eafc_code?: string | null
          formation_id?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tactics_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tactics_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
