import { ProdutoService } from './produtos.service';
import { PedidoService } from './pedidos.service';
import { ClienteService } from './clientes.service';

export const api = {
  produtos: new ProdutoService(),
  pedidos: new PedidoService(),
  clientes: new ClienteService(),
};

export type { Produto } from './produtos.service';
export type { Pedido } from './pedidos.service';
export type { Cliente } from './clientes.service';