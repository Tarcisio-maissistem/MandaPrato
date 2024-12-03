import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { api } from './services/api';
import { Produto } from './services/api/produtos.service';
import { Pedido } from './services/api/pedidos.service';
import { Cliente } from './services/api/clientes.service';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Types
interface QueryParams {
  page?: string;
  limit?: string;
}

interface ParamsWithId {
  id: string;
}

// Error handler
const errorHandler = (error: Error, message: string = 'Internal server error') => ({
  error: message,
  details: error.message
});

// Produtos routes
const getProdutos = async (
  req: Request<{}, any, any, QueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await api.produtos.findAll({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    });
    
    if (error) {
      res.status(500).json(errorHandler(error));
      return;
    }
    res.json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    res.status(500).json(errorHandler(error));
  }
};

const getProdutoById = async (
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await api.produtos.findById(req.params.id);
    if (error) {
      res.status(500).json(errorHandler(error));
      return;
    }
    if (!data) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }
    res.json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    res.status(500).json(errorHandler(error));
  }
};

const createProduto = async (
  req: Request<{}, any, Produto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await api.produtos.create(req.body);
    if (error) {
      res.status(500).json(errorHandler(error));
      return;
    }
    res.status(201).json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    res.status(500).json(errorHandler(error));
  }
};

// Pedidos routes
const getPedidos = async (
  req: Request<{}, any, any, QueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await api.pedidos.findAll({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    });
    if (error) {
      res.status(500).json(errorHandler(error));
      return;
    }
    res.json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    res.status(500).json(errorHandler(error));
  }
};

const getPedidoById = async (
  req: Request<ParamsWithId>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await api.pedidos.findById(req.params.id);
    if (error) {
      res.status(500).json(errorHandler(error));
      return;
    }
    if (!data) {
      res.status(404).json({ error: 'Pedido não encontrado' });
      return;
    }
    res.json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    res.status(500).json(errorHandler(error));
  }
};

// Clientes routes
const getClientes = async (
  req: Request<{}, any, any, QueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await api.clientes.findAll({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    });
    if (error) {
      res.status(500).json(errorHandler(error));
      return;
    }
    res.json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    res.status(500).json(errorHandler(error));
  }
};

// Routes
app.get('/produtos', getProdutos);
app.get('/produtos/:id', getProdutoById);
app.post('/produtos', createProduto);
app.get('/pedidos', getPedidos);
app.get('/pedidos/:id', getPedidoById);
app.get('/clientes', getClientes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});