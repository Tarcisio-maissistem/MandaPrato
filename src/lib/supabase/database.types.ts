// src/lib/supabase/database.types.ts
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
        Insert: Omit<Produtos['Row'], 'id' | 'created_at'>;
        Update: Partial<Produtos['Insert']>;
      };
      pedidos: {
        Row: {
          id: number;
          cliente_id: number;
          status: string;
          valor_total: number;
          created_at: string;
        };
        Insert: Omit<Pedidos['Row'], 'id' | 'created_at'>;
        Update: Partial<Pedidos['Insert']>;
      };
      clientes: {
        Row: {
          id: number;
          nome: string;
          email: string;
          telefone: string;
          created_at: string;
        };
        Insert: Omit<Clientes['Row'], 'id' | 'created_at'>;
        Update: Partial<Clientes['Insert']>;
      };
    };
  };
}