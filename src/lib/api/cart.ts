import { supabase } from '../supabase';

export const cartApi = {
  async getCart(studentId: string) {
    const { data, error } = await supabase.rpc('get_cart_with_items', {
      student_id_param: studentId,
    });

    if (error) throw error;
    return data || [];
  },

  async addToCart(studentId: string, menuItemId: string, quantity: number = 1) {
    const { data, error } = await supabase.rpc('add_to_cart', {
      student_id_param: studentId,
      menu_item_id_param: menuItemId,
      quantity_param: quantity,
    });

    if (error) throw error;
    return data;
  },

  async updateCartItemQuantity(cartItemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromCart(cartItemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  },

  async clearCart(studentId: string) {
    const { error } = await supabase.rpc('clear_cart', {
      student_id_param: studentId,
    });

    if (error) throw error;
  },

  async getCartTotal(studentId: string) {
    const items = await this.getCart(studentId);
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    return { subtotal, tax, total, itemCount: items.length };
  },
};
