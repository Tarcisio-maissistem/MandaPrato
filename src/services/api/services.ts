// produtos.service.ts
export class ProdutoService extends BaseService<Produto> {
    constructor() {
      super('produtos', 'nome'); // Ordena por nome por padrão
    }
  }
  
  // pedidos.service.ts
  export class PedidoService extends BaseService<Pedido> {
    constructor() {
      super('pedidos', 'created_at'); // Ordena por data de criação por padrão
    }
  }
  
  // clientes.service.ts
  export class ClienteService extends BaseService<Cliente> {
    constructor() {
      super('clientes', 'nome'); // Ordena por nome por padrão
    }
  }