import { BaseService } from './base.service';
import { supabase } from '../../lib/supabase/client';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  categoria_id: number;
  ativo: boolean;
  created_at: string;
}

export class ProdutoService extends BaseService<Produto> {
  constructor() {
    super('produtos');
  }

  async findByCategoria(categoriaId: number) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('categoria_id', categoriaId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error in ProdutoService.findByCategoria:', error);
      return { data: null, error };
    }
  }
}