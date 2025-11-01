import { supabase } from '../supabase';

export const ordersApi = {
  async createOrder(studentId: string, paymentMethod: string, notes?: string) {
    const { data, error } = await supabase.rpc('create_order_from_cart', {
      student_id_param: studentId,
      payment_method_param: paymentMethod,
      notes_param: notes || null,
    });

    if (error) throw error;
    return data;
  },

  async getStudentOrders(studentId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          menu_items (*)
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase.rpc('get_order_summary', {
      order_id_param: orderId,
    });

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  },

  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (full_name, email),
        order_items (
          *,
          menu_items (name, is_vegetarian)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOrdersByStatus(status: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (full_name, email),
        order_items (
          *,
          menu_items (name, is_vegetarian)
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateOrderStatus(orderId: string, newStatus: string) {
    const { data, error } = await supabase.rpc('update_order_status', {
      order_id_param: orderId,
      new_status: newStatus,
    });

    if (error) throw error;
    return data;
  },

  async updatePaymentStatus(orderId: string, paymentStatus: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getRecentOrders(limit: number = 5) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getOrderStats() {
    const { data, error } = await supabase.rpc('get_sales_statistics');

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  },
};
