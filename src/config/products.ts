import { Product } from '../types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Producto Premium',
    description: 'Nuestro producto estrella con características avanzadas',
    price: 299.99,
    category: 'Premium'
  },
  {
    id: '2',
    name: 'Producto Estándar',
    description: 'Perfecto para uso diario con excelente relación calidad-precio',
    price: 149.99,
    category: 'Estándar'
  },
  {
    id: '3',
    name: 'Producto Básico',
    description: 'Ideal para comenzar, con funciones esenciales',
    price: 79.99,
    category: 'Básico'
  }
]