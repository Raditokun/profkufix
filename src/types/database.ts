export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          code: string | null
          created_at: string
          id: string
          name: string
          professor_id: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          name: string
          professor_id: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string
          professor_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professors"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          faculty_id: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          faculty_id: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          faculty_id?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "faculties"
            referencedColumns: ["id"]
          },
        ]
      }
      faculties: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          university_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          university_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          university_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "faculties_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      professors: {
        Row: {
          avg_difficulty: number | null
          avg_rating: number | null
          created_at: string
          department_id: string
          full_name: string
          id: string
          nidn: string | null
          photo_url: string | null
          review_count: number | null
          search_vector: unknown
          title: string | null
          updated_at: string
          would_take_again_pct: number | null
        }
        Insert: {
          avg_difficulty?: number | null
          avg_rating?: number | null
          created_at?: string
          department_id: string
          full_name: string
          id?: string
          nidn?: string | null
          photo_url?: string | null
          review_count?: number | null
          search_vector?: unknown
          title?: string | null
          updated_at?: string
          would_take_again_pct?: number | null
        }
        Update: {
          avg_difficulty?: number | null
          avg_rating?: number | null
          created_at?: string
          department_id?: string
          full_name?: string
          id?: string
          nidn?: string | null
          photo_url?: string | null
          review_count?: number | null
          search_vector?: unknown
          title?: string | null
          updated_at?: string
          would_take_again_pct?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "professors_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          academic_year: number | null
          author_alias: string | null
          body: string
          course_id: string | null
          course_name_raw: string | null
          created_at: string
          difficulty: number
          grade_received: string | null
          id: string
          ip_hash: string | null
          professor_id: string
          rating: number
          semester: string | null
          tags: string[] | null
          thumbs_up: number | null
          would_take_again: boolean | null
        }
        Insert: {
          academic_year?: number | null
          author_alias?: string | null
          body: string
          course_id?: string | null
          course_name_raw?: string | null
          created_at?: string
          difficulty: number
          grade_received?: string | null
          id?: string
          ip_hash?: string | null
          professor_id: string
          rating: number
          semester?: string | null
          tags?: string[] | null
          thumbs_up?: number | null
          would_take_again?: boolean | null
        }
        Update: {
          academic_year?: number | null
          author_alias?: string | null
          body?: string
          course_id?: string | null
          course_name_raw?: string | null
          created_at?: string
          difficulty?: number
          grade_received?: string | null
          id?: string
          ip_hash?: string | null
          professor_id?: string
          rating?: number
          semester?: string | null
          tags?: string[] | null
          thumbs_up?: number | null
          would_take_again?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "professors"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          city: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          province: string | null
          search_vector: unknown
          short_name: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          province?: string | null
          search_vector?: unknown
          short_name?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          province?: string | null
          search_vector?: unknown
          short_name?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
