import { supabase } from '../../lib/supabase/client';

export class BaseService<T> {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  async findAll(options: { 
    page?: number; 
    limit?: number;
    order?: { column: string; direction?: 'asc' | 'desc' };
    filters?: Record<string, any>;
  } = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        order = { column: 'created_at', direction: 'desc' },
        filters = {}
      } = options;

      let query = supabase
        .from(this.table)
        .select('*')
        .range((page - 1) * limit, page * limit - 1)
        .order(order.column, { ascending: order.direction === 'asc' });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });

      const { data, error } = await query;

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error(`Error in ${this.table}.findAll:`, error);
      return { data: null, error };
    }
  }
}