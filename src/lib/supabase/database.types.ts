export interface Database {
  public: {
    Tables: {
      produtos: {
        Row: {
          id: number;
          nome: string;
          preco: number;
          descricao?: string;
          categoria_id: number;
          ativo: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['produtos']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['produtos']['Insert']>;
      };
      pedidos: {
        Row: {
          id: number;
          cliente_id: number;
          status: string;
          valor_total: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pedidos']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['pedidos']['Insert']>;
      };
      clientes: {
        Row: {
          id: number;
          nome: string;
          email: string;
          telefone: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['clientes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['clientes']['Insert']>;
      };
    };
  };
}