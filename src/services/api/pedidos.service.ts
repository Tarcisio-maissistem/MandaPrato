import { BaseService } from './base.service';
import { supabase } from '../../lib/supabase/client';

export interface Pedido {
  id: number;
  cliente_id: number;
  status: string;
  valor_total: number;
  created_at: string;
}

export class PedidoService extends BaseService<Pedido> {
  constructor() {
    super('pedidos');
  }

  async findByStatus(status: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('status', status);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error in PedidoService.findByStatus:', error);
      return { data: null, error };
    }
  }
}