import { BaseService } from './base.service';
import { supabase } from '../../lib/supabase/client';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  created_at: string;
}

export class ClienteService extends BaseService<Cliente> {
  constructor() {
    super('clientes');
  }

  async findByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error in ClienteService.findByEmail:', error);
      return { data: null, error };
    }
  }
}