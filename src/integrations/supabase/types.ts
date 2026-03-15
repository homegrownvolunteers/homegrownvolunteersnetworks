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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          donor_email: string
          donor_name: string
          donor_phone: string | null
          frequency: Database["public"]["Enums"]["donation_frequency"]
          id: string
          message: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          donor_email: string
          donor_name: string
          donor_phone?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          message?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          donor_email?: string
          donor_name?: string
          donor_phone?: string | null
          frequency?: Database["public"]["Enums"]["donation_frequency"]
          id?: string
          message?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          intent: string[] | null
          membership_type: string | null
          sector: Database["public"]["Enums"]["membership_sector"]
          skill_level: string | null
          status: Database["public"]["Enums"]["membership_status"]
          subcategory: string
          tier: Database["public"]["Enums"]["membership_tier"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          approved?: boolean
          created_at?: string
          id?: string
          intent?: string[] | null
          membership_type?: string | null
          sector: Database["public"]["Enums"]["membership_sector"]
          skill_level?: string | null
          status?: Database["public"]["Enums"]["membership_status"]
          subcategory: string
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          intent?: string[] | null
          membership_type?: string | null
          sector?: Database["public"]["Enums"]["membership_sector"]
          skill_level?: string | null
          status?: Database["public"]["Enums"]["membership_status"]
          subcategory?: string
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity?: number
        }
        Update: {
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          shipping_address: string | null
          status: Database["public"]["Enums"]["order_status"]
          total: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          shipping_address?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          shipping_address?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          user_id?: string | null
        }
        Relationships: []
      }
      partnerships: {
        Row: {
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string
          organization_name: string
          partnership_type: string
          phone: string | null
        }
        Insert: {
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message: string
          organization_name: string
          partnership_type: string
          phone?: string | null
        }
        Update: {
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          organization_name?: string
          partnership_type?: string
          phone?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          artist_id: string | null
          artist_name: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          name: string
          price: number
        }
        Insert: {
          artist_id?: string | null
          artist_name?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          name: string
          price: number
        }
        Update: {
          artist_id?: string | null
          artist_name?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          author_id: string | null
          author_name: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      story_submissions: {
        Row: {
          category: string
          created_at: string
          description: string
          email: string
          id: string
          name: string
          title: string
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          title: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          title?: string
          video_url?: string | null
        }
        Relationships: []
      }
      tv_episodes: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          published: boolean
          thumbnail_url: string | null
          title: string
          video_url: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          published?: boolean
          thumbnail_url?: string | null
          title: string
          video_url: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          published?: boolean
          thumbnail_url?: string | null
          title?: string
          video_url?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          areas_of_interest: string[]
          created_at: string
          email: string
          experience: string | null
          full_name: string
          hours_per_week: string | null
          id: string
          location: string | null
          phone: string | null
          skills: string | null
          user_id: string | null
          why_join: string | null
        }
        Insert: {
          areas_of_interest: string[]
          created_at?: string
          email: string
          experience?: string | null
          full_name: string
          hours_per_week?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          skills?: string | null
          user_id?: string | null
          why_join?: string | null
        }
        Update: {
          areas_of_interest?: string[]
          created_at?: string
          email?: string
          experience?: string | null
          full_name?: string
          hours_per_week?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          skills?: string | null
          user_id?: string | null
          why_join?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_membership: {
        Args: {
          p_approved?: boolean
          p_intent?: string[]
          p_sector: Database["public"]["Enums"]["membership_sector"]
          p_skill_level?: string
          p_status?: Database["public"]["Enums"]["membership_status"]
          p_subcategory: string
          p_tier?: Database["public"]["Enums"]["membership_tier"]
          p_user_id: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_profile_on_signup: {
        Args: {
          p_bio?: string
          p_location?: string
          p_phone?: string
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      donation_frequency: "one_time" | "monthly"
      membership_sector: "agriculture" | "arts" | "culture"
      membership_status: "active" | "pending" | "expired"
      membership_tier: "free" | "supporter" | "premium"
      order_status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      donation_frequency: ["one_time", "monthly"],
      membership_sector: ["agriculture", "arts", "culture"],
      membership_status: ["active", "pending", "expired"],
      membership_tier: ["free", "supporter", "premium"],
      order_status: ["pending", "paid", "shipped", "delivered", "cancelled"],
    },
  },
} as const
