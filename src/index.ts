import { api } from './services/api';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    // Exemplo de uso da API
    const { data: produtos, error } = await api.produtos.findAll({
      limit: 10,
      order: { column: 'created_at', direction: 'desc' }
    });

    if (error) {
      console.error('Erro ao buscar produtos:', error);
      return;
    }

    console.log('Produtos encontrados:', produtos);
  } catch (error) {
    console.error('Erro na execução:', error);
  }
}

main();