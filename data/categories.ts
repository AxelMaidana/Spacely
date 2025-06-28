export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Todos', 
    icon: 'restaurant',
    description: 'Todos los restaurantes disponibles'
  },
  { 
    id: '2', 
    name: 'Italiana', 
    icon: 'local-pizza',
    description: 'Pasta, pizza y cocina italiana'
  },
  { 
    id: '3', 
    name: 'Japonesa', 
    icon: 'set-meal',
    description: 'Sushi, ramen y cocina japonesa'
  },
  { 
    id: '4', 
    name: 'Parrilla', 
    icon: 'outdoor-grill',
    description: 'Asados y parrillas argentinas'
  },
  { 
    id: '5', 
    name: 'Vegetariana', 
    icon: 'grass',
    description: 'Cocina vegetariana y vegana'
  },
  { 
    id: '6', 
    name: 'Heladerías', 
    icon: 'icecream',
    description: 'Helados artesanales y gelato'
  },
  { 
    id: '7', 
    name: 'Cafeterías', 
    icon: 'local-cafe',
    description: 'Café de especialidad y pastelería'
  },
  { 
    id: '8', 
    name: 'Postres', 
    icon: 'cake',
    description: 'Postres gourmet y pastelería'
  },
  { 
    id: '9', 
    name: 'Gastronomía Regional', 
    icon: 'local-dining',
    description: 'Cocina regional y tradicional'
  },
  { 
    id: '10', 
    name: 'Bodegones', 
    icon: 'local-dining',
    description: 'Bodegones tradicionales argentinos'
  },
  { 
    id: '11', 
    name: 'Cervecería', 
    icon: 'sports-bar',
    description: 'Cervecerías artesanales y barras'
  },
  { 
    id: '12', 
    name: 'Resto Bar', 
    icon: 'local-bar',
    description: 'Resto-bares y gastronomía nocturna'
  },
  { 
    id: '13', 
    name: 'Francesa', 
    icon: 'restaurant',
    description: 'Cocina francesa y brasserie'
  },
  { 
    id: '14', 
    name: 'Mexicana', 
    icon: 'restaurant',
    description: 'Cocina mexicana auténtica'
  },
  { 
    id: '15', 
    name: 'Bar', 
    icon: 'local-bar',
    description: 'Bares y pubs'
  },
  { 
    id: '16', 
    name: 'Gastronómico', 
    icon: 'restaurant',
    description: 'Gastronomía gourmet y de autor'
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getAllCategories = (): Category[] => {
  return categories;
}; 