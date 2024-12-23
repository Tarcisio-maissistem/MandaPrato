import { supabase } from '../../lib/supabase/client';

export interface ServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

export class BaseService<T> {
  protected table: string;
  protected defaultOrderColumn: string;

  constructor(table: string, defaultOrderColumn: string = 'id') {
    this.table = table;
    this.defaultOrderColumn = defaultOrderColumn;
  }

  async findAll(options: { 
    page?: number; 
    limit?: number;
    order?: { column?: string; direction?: 'asc' | 'desc' };
    filters?: Record<string, any>;
  } = {}): Promise<ServiceResponse<T[]>> {
    try {
      const {
        page = 1,
        limit = 10,
        order = { column: this.defaultOrderColumn, direction: 'asc' },
        filters = {}
      } = options;

      let query = supabase
        .from(this.table)
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order(order.column || this.defaultOrderColumn, { ascending: order.direction === 'asc' });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);
      return { 
        data, 
        error: null,
        metadata: {
          total: count,
          page,
          limit
        }
      };
    } catch (error) {
      console.error(`Error in ${this.table}.findAll:`, error);
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  async findById(id: string | number): Promise<ServiceResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw new Error(error.message);
      return { data, error: null };
    } catch (error) {
      console.error(`Error in ${this.table}.findById:`, error);
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  async create(record: Partial<T>): Promise<ServiceResponse<T>> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(record)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return { data, error: null };
    } catch (error) {
      console.error(`Error in ${this.table}.create:`, error);
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }
}