export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: any;
  restaurantId?: string;
  restaurantName?: string;
  validUntil: string;
  terms?: string[];
  category?: string;
}

export const promotions: Promotion[] = [
  {
    id: '1',
    title: '50% OFF en Pizzas',
    description: 'Disfruta de nuestras pizzas artesanales con 50% de descuento',
    discount: '50% OFF',
    image: require('@/assets/images/promo1.jpg'),
    restaurantId: '1',
    restaurantName: 'La Trattoria',
    validUntil: '2024-12-31',
    category: 'Italiana',
    terms: [
      'Válido solo para pizzas',
      'No válido con otras promociones',
      'Solo para pedidos online'
    ]
  },
  {
    id: '2',
    title: '2x1 en Hamburguesas',
    description: 'Lleva dos hamburguesas por el precio de una',
    discount: '2x1',
    image: require('@/assets/images/promo1.jpg'),
    restaurantId: '3',
    restaurantName: 'Burger Factory',
    validUntil: '2024-12-31',
    category: 'Americana',
    terms: [
      'Válido solo para hamburguesas clásicas',
      'No válido con otras promociones',
      'Solo para pedidos presenciales'
    ]
  },
  {
    id: '3',
    title: '30% OFF en Sushi',
    description: '30% de descuento en todo el menú de sushi',
    discount: '30% OFF',
    image: require('@/assets/images/promo1.jpg'),
    restaurantId: '2',
    restaurantName: 'Sushi Palace',
    validUntil: '2024-12-31',
    category: 'Japonesa',
    terms: [
      'Válido para todo el menú de sushi',
      'No válido con otras promociones',
      'Solo para pedidos online'
    ]
  }
];

export const getPromotionById = (id: string): Promotion | undefined => {
  return promotions.find(promotion => promotion.id === id);
};

export const getAllPromotions = (): Promotion[] => {
  return promotions;
};

export const getPromotionsByCategory = (category: string): Promotion[] => {
  return promotions.filter(promotion => promotion.category === category);
}; 