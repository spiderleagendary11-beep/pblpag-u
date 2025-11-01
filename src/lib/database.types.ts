export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'student' | 'admin'
          student_id: string | null
          department: string | null
          staff_id: string | null
          cafeteria_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: 'student' | 'admin'
          student_id?: string | null
          department?: string | null
          staff_id?: string | null
          cafeteria_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'student' | 'admin'
          student_id?: string | null
          department?: string | null
          staff_id?: string | null
          cafeteria_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: string
          is_vegetarian: boolean
          image_url: string | null
          is_available: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          category: string
          is_vegetarian?: boolean
          image_url?: string | null
          is_available?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string
          is_vegetarian?: boolean
          image_url?: string | null
          is_available?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          student_id: string
          status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
          subtotal: number
          tax: number
          total: number
          payment_method: 'upi' | 'card' | 'razorpay'
          payment_status: 'pending' | 'completed' | 'failed'
          notes: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          order_number?: string
          student_id: string
          status?: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
          subtotal: number
          tax: number
          total: number
          payment_method: 'upi' | 'card' | 'razorpay'
          payment_status?: 'pending' | 'completed' | 'failed'
          notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          student_id?: string
          status?: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
          subtotal?: number
          tax?: number
          total?: number
          payment_method?: 'upi' | 'card' | 'razorpay'
          payment_status?: 'pending' | 'completed' | 'failed'
          notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          menu_item_id: string
          quantity: number
          price_at_order: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          menu_item_id: string
          quantity?: number
          price_at_order: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          menu_item_id?: string
          quantity?: number
          price_at_order?: number
          subtotal?: number
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'order' | 'offer' | 'alert' | 'system'
          is_read: boolean
          is_important: boolean
          related_order_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: 'order' | 'offer' | 'alert' | 'system'
          is_read?: boolean
          is_important?: boolean
          related_order_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'order' | 'offer' | 'alert' | 'system'
          is_read?: boolean
          is_important?: boolean
          related_order_id?: string | null
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          student_id: string
          menu_item_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          menu_item_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          menu_item_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      get_order_summary: {
        Args: { order_id_param: string }
        Returns: {
          order_id: string
          order_number: string
          student_name: string
          student_email: string
          status: string
          subtotal: number
          tax: number
          total: number
          payment_method: string
          payment_status: string
          created_at: string
          items: Json
        }[]
      }
      update_order_status: {
        Args: { order_id_param: string; new_status: string }
        Returns: boolean
      }
      get_sales_statistics: {
        Args: { start_date?: string; end_date?: string }
        Returns: {
          total_orders: number
          total_revenue: number
          pending_orders: number
          preparing_orders: number
          ready_orders: number
          completed_orders: number
          cancelled_orders: number
          daily_sales: Json
          top_items: Json
          category_breakdown: Json
        }[]
      }
      clear_cart: {
        Args: { student_id_param: string }
        Returns: void
      }
      add_to_cart: {
        Args: { student_id_param: string; menu_item_id_param: string; quantity_param?: number }
        Returns: string
      }
      get_cart_with_items: {
        Args: { student_id_param: string }
        Returns: {
          cart_item_id: string
          menu_item_id: string
          name: string
          price: number
          quantity: number
          subtotal: number
          image_url: string | null
          is_vegetarian: boolean
          category: string
        }[]
      }
      create_order_from_cart: {
        Args: { student_id_param: string; payment_method_param: string; notes_param?: string | null }
        Returns: string
      }
    }
  }
}
