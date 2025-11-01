import { supabase } from '../supabase';

export interface StudentSignupData {
  email: string;
  password: string;
  fullName: string;
  studentId: string;
  department: string;
}

export interface AdminSignupData {
  email: string;
  password: string;
  fullName: string;
  staffId: string;
  cafeteriaName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authApi = {
  async signupStudent(data: StudentSignupData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned');

    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: data.email,
      full_name: data.fullName,
      role: 'student',
      student_id: data.studentId,
      department: data.department,
    });

    if (profileError) throw profileError;

    return authData;
  },

  async signupAdmin(data: AdminSignupData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned');

    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: data.email,
      full_name: data.fullName,
      role: 'admin',
      staff_id: data.staffId,
      cafeteria_name: data.cafeteriaName,
    });

    if (profileError) throw profileError;

    return authData;
  },

  async login(data: LoginData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    return authData;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    return profile;
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },
};
