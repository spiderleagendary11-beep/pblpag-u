import { supabase } from '../supabase';
import type { Database } from '../database.types';

type MenuItemInsert = Database['public']['Tables']['menu_items']['Insert'];
type MenuItemUpdate = Database['public']['Tables']['menu_items']['Update'];

export const menuApi = {
  async getAllItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getItemById(id: string) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getItemsByCategory(category: string) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .eq('is_available', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  async searchItems(query: string) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .ilike('name', `%${query}%`)
      .eq('is_available', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data;
  },

  async filterByVegetarian(isVeg: boolean) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_vegetarian', isVeg)
      .eq('is_available', true)
      .order('category', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createItem(item: MenuItemInsert) {
    const { data, error } = await supabase
      .from('menu_items')
      .insert(item)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateItem(id: string, updates: MenuItemUpdate) {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteItem(id: string) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async toggleAvailability(id: string, isAvailable: boolean) {
    const { data, error } = await supabase
      .from('menu_items')
      .update({ is_available: isAvailable })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
