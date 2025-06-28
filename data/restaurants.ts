export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: any;
}

export interface Restaurant {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  rating: number;
  distance: string;
  image: any;
  featured?: boolean;
  address: string;
  subtitle?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  priceRange?: string;
  prices?: {
    minPrice: number;
    maxPrice: number;
    currency: string;
    description: string;
  };
  menu?: MenuItem[];
  tags?: string[];
  discount?: string;
  reviewCount?: number;
  isOpen?: boolean;
  location?: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  images?: string[];
  amenities?: string[];
  openingHoursDetailed?: {
    [key: string]: string;
  };
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    title: 'Mula Mala Cervecería y Bar',
    category: 'Cervecería',
    categoryId: '11',
    rating: 4.6,
    distance: '0.8 km',
    image: { uri: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    featured: true,
    address: 'Av. 9 de Julio, Resistencia',
    subtitle: 'Cervecería artesanal con ambiente moderno y gastronomía de autor',
    phone: '+54 362 4123-4567',
    website: 'www.mulamala.com',
    openingHours: 'Lun-Dom 18:00-02:00',
    priceRange: '$$',
    prices: {
      minPrice: 6000,
      maxPrice: 12000,
      currency: 'ARS',
      description: 'Cervezas y platos entre $6.000 y $12.000'
    },
    menu: [
      {
        id: '1-1',
        name: 'Hamburguesa Mula Mala',
        description: 'Hamburguesa con queso cheddar, bacon y salsa especial',
        price: '$8.500',
        category: 'Hamburguesas'
      },
      {
        id: '1-2',
        name: 'IPA Artesanal',
        description: 'Cerveza IPA de la casa con lúpulo aromático',
        price: '$2.800',
        category: 'Cervezas'
      },
      {
        id: '1-3',
        name: 'Nachos con Guacamole',
        description: 'Nachos con guacamole casero y queso fundido',
        price: '$5.200',
        category: 'Entradas'
      }
    ],
    tags: ['Cerveza Artesanal', 'Hamburguesas', 'Bar'],
    discount: '15% OFF',
    reviewCount: 234,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio, Resistencia',
      coordinates: { lat: -27.44350, lng: -58.98620 },
    },
    images: [
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Música en Vivo', 'Cerveza Artesanal'],
    openingHoursDetailed: {
      'Lunes': '6:00 PM - 2:00 AM',
      'Martes': '6:00 PM - 2:00 AM',
      'Miércoles': '6:00 PM - 2:00 AM',
      'Jueves': '6:00 PM - 2:00 AM',
      'Viernes': '6:00 PM - 3:00 AM',
      'Sábado': '6:00 PM - 3:00 AM',
      'Domingo': '6:00 PM - 2:00 AM',
    },
  },
  {
    id: '2',
    title: 'Humberto M Café Resto Bar',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.4,
    distance: '1.2 km',
    image: { uri: 'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Alberdi, Resistencia',
    subtitle: 'Café de especialidad con ambiente bohemio y gastronomía moderna',
    phone: '+54 362 4456-7890',
    website: 'www.humbertom.com',
    openingHours: 'Lun-Dom 8:00-23:00',
    priceRange: '$$',
    prices: {
      minPrice: 3000,
      maxPrice: 8000,
      currency: 'ARS',
      description: 'Cafés y platos entre $3.000 y $8.000'
    },
    menu: [
      {
        id: '2-1',
        name: 'Café de Especialidad',
        description: 'Café de origen único con métodos artesanales',
        price: '$2.500',
        category: 'Cafés'
      },
      {
        id: '2-2',
        name: 'Tostado de Aguacate',
        description: 'Tostado con aguacate, huevo y semillas',
        price: '$6.800',
        category: 'Sandwiches'
      },
      {
        id: '2-3',
        name: 'Tarta de Manzana',
        description: 'Tarta casera con manzanas y canela',
        price: '$4.200',
        category: 'Pastelería'
      }
    ],
    tags: ['Café', 'Especialidad', 'Bohemio'],
    reviewCount: 189,
    isOpen: true,
    location: {
      address: 'Av. Alberdi, Resistencia',
      coordinates: { lat: -27.44810, lng: -58.98590 },
    },
    images: [
      'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Café de Especialidad', 'Ambiente Bohemio'],
    openingHoursDetailed: {
      'Lunes': '8:00 AM - 11:00 PM',
      'Martes': '8:00 AM - 11:00 PM',
      'Miércoles': '8:00 AM - 11:00 PM',
      'Jueves': '8:00 AM - 11:00 PM',
      'Viernes': '8:00 AM - 12:00 AM',
      'Sábado': '8:00 AM - 12:00 AM',
      'Domingo': '8:00 AM - 11:00 PM',
    },
  },
  {
    id: '3',
    title: 'La Fábrica Resto Bar',
    category: 'Resto Bar',
    categoryId: '12',
    rating: 4.7,
    distance: '0.9 km',
    image: { uri: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio, Resistencia',
    subtitle: 'Resto bar con ambiente industrial y gastronomía de autor',
    phone: '+54 362 4789-0123',
    website: 'www.lafabrica.com',
    openingHours: 'Mar-Dom 19:00-02:00',
    priceRange: '$$$',
    prices: {
      minPrice: 8000,
      maxPrice: 15000,
      currency: 'ARS',
      description: 'Platos principales entre $8.000 y $15.000'
    },
    menu: [
      {
        id: '3-1',
        name: 'Risotto de Hongos',
        description: 'Risotto cremoso con hongos portobello y parmesano',
        price: '$12.500',
        category: 'Platos Principales'
      },
      {
        id: '3-2',
        name: 'Ceviche de Pescado',
        description: 'Ceviche fresco con limón, cebolla y cilantro',
        price: '$9.800',
        category: 'Entradas'
      },
      {
        id: '3-3',
        name: 'Cocktail La Fábrica',
        description: 'Cocktail signature con gin y frutos rojos',
        price: '$4.500',
        category: 'Bebidas'
      }
    ],
    tags: ['Gastronomía', 'Cocktails', 'Industrial'],
    discount: '20% OFF',
    reviewCount: 156,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio, Resistencia',
      coordinates: { lat: -27.45000, lng: -58.98680 },
    },
    images: [
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958547/pexels-photo-958547.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Cocktails', 'Ambiente Industrial'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 2:00 AM',
      'Miércoles': '7:00 PM - 2:00 AM',
      'Jueves': '7:00 PM - 2:00 AM',
      'Viernes': '7:00 PM - 3:00 AM',
      'Sábado': '7:00 PM - 3:00 AM',
      'Domingo': '7:00 PM - 2:00 AM',
    },
  },
  {
    id: '4',
    title: 'Le Béret Brasserie',
    category: 'Francesa',
    categoryId: '13',
    rating: 4.5,
    distance: '1.5 km',
    image: { uri: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Sarmiento, Resistencia',
    subtitle: 'Brasserie francesa con ambiente parisino y gastronomía clásica',
    phone: '+54 362 4455-6789',
    website: 'www.leberet.com',
    openingHours: 'Mar-Dom 19:00-23:00',
    priceRange: '$$$',
    prices: {
      minPrice: 10000,
      maxPrice: 18000,
      currency: 'ARS',
      description: 'Platos franceses entre $10.000 y $18.000'
    },
    menu: [
      {
        id: '4-1',
        name: 'Coq au Vin',
        description: 'Pollo al vino tinto con vegetales y hierbas',
        price: '$15.800',
        category: 'Platos Principales'
      },
      {
        id: '4-2',
        name: 'Croque Monsieur',
        description: 'Sándwich de jamón y queso gratinado',
        price: '$8.200',
        category: 'Entradas'
      },
      {
        id: '4-3',
        name: 'Crème Brûlée',
        description: 'Postre clásico francés con caramelo quemado',
        price: '$6.500',
        category: 'Postres'
      }
    ],
    tags: ['Francesa', 'Brasserie', 'Parisino'],
    reviewCount: 98,
    isOpen: true,
    location: {
      address: 'Av. Sarmiento, Resistencia',
      coordinates: { lat: -27.44090, lng: -58.98850 },
    },
    images: [
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1437268/pexels-photo-1437268.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1437269/pexels-photo-1437269.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Vinos Franceses', 'Ambiente Parisino'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 11:00 PM',
      'Miércoles': '7:00 PM - 11:00 PM',
      'Jueves': '7:00 PM - 11:00 PM',
      'Viernes': '7:00 PM - 12:00 AM',
      'Sábado': '7:00 PM - 12:00 AM',
      'Domingo': '7:00 PM - 11:00 PM',
    },
  },
  {
    id: '5',
    title: 'Olegario Café Resto Bar',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.3,
    distance: '0.7 km',
    image: { uri: 'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 25 de Mayo, Resistencia',
    subtitle: 'Café tradicional con ambiente familiar y gastronomía casera',
    phone: '+54 362 4122-3456',
    website: 'www.olegario.com',
    openingHours: 'Lun-Dom 7:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 2000,
      maxPrice: 6000,
      currency: 'ARS',
      description: 'Cafés y platos entre $2.000 y $6.000'
    },
    menu: [
      {
        id: '5-1',
        name: 'Café con Leche',
        description: 'Café con leche caliente tradicional',
        price: '$2.800',
        category: 'Cafés'
      },
      {
        id: '5-2',
        name: 'Medialunas',
        description: 'Medialunas recién horneadas',
        price: '$2.500',
        category: 'Pastelería'
      },
      {
        id: '5-3',
        name: 'Tostado de Jamón y Queso',
        description: 'Tostado con jamón cocido y queso mozzarella',
        price: '$4.800',
        category: 'Sandwiches'
      }
    ],
    tags: ['Café', 'Tradicional', 'Familiar'],
    discount: '10% OFF',
    reviewCount: 145,
    isOpen: true,
    location: {
      address: 'Av. 25 de Mayo, Resistencia',
      coordinates: { lat: -27.45047, lng: -58.98412 },
    },
    images: [
      'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941866/pexels-photo-941866.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941867/pexels-photo-941867.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Café Tradicional', 'Ambiente Familiar'],
    openingHoursDetailed: {
      'Lunes': '7:00 AM - 10:00 PM',
      'Martes': '7:00 AM - 10:00 PM',
      'Miércoles': '7:00 AM - 10:00 PM',
      'Jueves': '7:00 AM - 10:00 PM',
      'Viernes': '7:00 AM - 11:00 PM',
      'Sábado': '7:00 AM - 11:00 PM',
      'Domingo': '7:00 AM - 10:00 PM',
    },
  },
  {
    id: '6',
    title: 'Marco Aurelio Restobar',
    category: 'Resto Bar',
    categoryId: '12',
    rating: 4.4,
    distance: '1.8 km',
    image: { uri: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Sarmiento, Resistencia',
    subtitle: 'Restobar con ambiente elegante y gastronomía internacional',
    phone: '+54 362 4456-7890',
    website: 'www.marcoaurelio.com',
    openingHours: 'Mar-Dom 19:00-02:00',
    priceRange: '$$$',
    prices: {
      minPrice: 8000,
      maxPrice: 16000,
      currency: 'ARS',
      description: 'Platos internacionales entre $8.000 y $16.000'
    },
    menu: [
      {
        id: '6-1',
        name: 'Pasta Carbonara',
        description: 'Espagueti con huevo, queso parmesano y panceta',
        price: '$12.500',
        category: 'Pastas'
      },
      {
        id: '6-2',
        name: 'Ensalada César',
        description: 'Lechuga romana, crutones, parmesano y aderezo César',
        price: '$8.200',
        category: 'Ensaladas'
      },
      {
        id: '6-3',
        name: 'Cocktail Marco Aurelio',
        description: 'Cocktail signature con vodka y frutos rojos',
        price: '$4.800',
        category: 'Bebidas'
      }
    ],
    tags: ['Internacional', 'Elegante', 'Cocktails'],
    discount: '15% OFF',
    reviewCount: 167,
    isOpen: true,
    location: {
      address: 'Av. Sarmiento, Resistencia',
      coordinates: { lat: -27.44190, lng: -58.98900 },
    },
    images: [
      'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/156114/pexels-photo-156114.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Cocktails', 'Ambiente Elegante'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 2:00 AM',
      'Miércoles': '7:00 PM - 2:00 AM',
      'Jueves': '7:00 PM - 2:00 AM',
      'Viernes': '7:00 PM - 3:00 AM',
      'Sábado': '7:00 PM - 3:00 AM',
      'Domingo': '7:00 PM - 2:00 AM',
    },
  },
  {
    id: '7',
    title: 'Madre Cantina',
    category: 'Mexicana',
    categoryId: '14',
    rating: 4.5,
    distance: '1.1 km',
    image: { uri: 'https://images.pexels.com/photos/1352281/pexels-photo-1352281.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio, Resistencia',
    subtitle: 'Cantina mexicana auténtica con tequila y tacos tradicionales',
    phone: '+54 362 4789-0123',
    website: 'www.madrecantina.com',
    openingHours: 'Mar-Dom 19:00-02:00',
    priceRange: '$$',
    prices: {
      minPrice: 5000,
      maxPrice: 12000,
      currency: 'ARS',
      description: 'Platos mexicanos entre $5.000 y $12.000'
    },
    menu: [
      {
        id: '7-1',
        name: 'Tacos al Pastor',
        description: 'Tacos con carne de cerdo marinada y piña',
        price: '$6.500',
        category: 'Tacos'
      },
      {
        id: '7-2',
        name: 'Guacamole Fresco',
        description: 'Guacamole casero con aguacate, tomate y cilantro',
        price: '$4.200',
        category: 'Entradas'
      },
      {
        id: '7-3',
        name: 'Margarita Clásica',
        description: 'Margarita con tequila, limón y triple sec',
        price: '$3.800',
        category: 'Bebidas'
      }
    ],
    tags: ['Mexicana', 'Tequila', 'Tacos'],
    discount: '20% OFF',
    reviewCount: 198,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio, Resistencia',
      coordinates: { lat: -27.44420, lng: -58.98470 },
    },
    images: [
      'https://images.pexels.com/photos/1352281/pexels-photo-1352281.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352280/pexels-photo-1352280.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352279/pexels-photo-1352279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Tequila', 'Ambiente Mexicano'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 2:00 AM',
      'Miércoles': '7:00 PM - 2:00 AM',
      'Jueves': '7:00 PM - 2:00 AM',
      'Viernes': '7:00 PM - 3:00 AM',
      'Sábado': '7:00 PM - 3:00 AM',
      'Domingo': '7:00 PM - 2:00 AM',
    },
  },
  {
    id: '8',
    title: 'Local Bar',
    category: 'Bar',
    categoryId: '15',
    rating: 4.3,
    distance: '0.6 km',
    image: { uri: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio, Resistencia',
    subtitle: 'Bar de barrio con ambiente relajado y cerveza artesanal',
    phone: '+54 362 4456-7891',
    website: 'www.localbar.com',
    openingHours: 'Lun-Dom 18:00-02:00',
    priceRange: '$',
    prices: {
      minPrice: 3000,
      maxPrice: 8000,
      currency: 'ARS',
      description: 'Cervezas y snacks entre $3.000 y $8.000'
    },
    menu: [
      {
        id: '8-1',
        name: 'Cerveza Artesanal',
        description: 'Cerveza artesanal de la casa',
        price: '$2.500',
        category: 'Cervezas'
      },
      {
        id: '8-2',
        name: 'Hamburguesa Local',
        description: 'Hamburguesa con queso, lechuga y tomate',
        price: '$6.800',
        category: 'Hamburguesas'
      },
      {
        id: '8-3',
        name: 'Papas Fritas',
        description: 'Papas fritas caseras con sal',
        price: '$3.200',
        category: 'Snacks'
      }
    ],
    tags: ['Bar', 'Cerveza', 'Barrio'],
    reviewCount: 145,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio, Resistencia',
      coordinates: { lat: -27.45100, lng: -58.98750 },
    },
    images: [
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Cerveza Artesanal', 'Ambiente Relajado', 'Bar de Barrio'],
    openingHoursDetailed: {
      'Lunes': '6:00 PM - 2:00 AM',
      'Martes': '6:00 PM - 2:00 AM',
      'Miércoles': '6:00 PM - 2:00 AM',
      'Jueves': '6:00 PM - 2:00 AM',
      'Viernes': '6:00 PM - 3:00 AM',
      'Sábado': '6:00 PM - 3:00 AM',
      'Domingo': '6:00 PM - 2:00 AM',
    },
  },
  {
    id: '9',
    title: 'La Biela Resto-Bar',
    category: 'Resto Bar',
    categoryId: '12',
    rating: 4.6,
    distance: '0.8 km',
    image: { uri: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio, Resistencia',
    subtitle: 'Resto-bar con ambiente deportivo y gastronomía variada',
    phone: '+54 362 4456-7892',
    website: 'www.labiela.com',
    openingHours: 'Lun-Dom 12:00-02:00',
    priceRange: '$$',
    prices: {
      minPrice: 5000,
      maxPrice: 12000,
      currency: 'ARS',
      description: 'Platos variados entre $5.000 y $12.000'
    },
    menu: [
      {
        id: '9-1',
        name: 'Milanesa Napolitana',
        description: 'Milanesa con jamón, queso y salsa de tomate',
        price: '$8.500',
        category: 'Platos Principales'
      },
      {
        id: '9-2',
        name: 'Pizza Margherita',
        description: 'Pizza con tomate, mozzarella y albahaca',
        price: '$7.200',
        category: 'Pizzas'
      },
      {
        id: '9-3',
        name: 'Cerveza Nacional',
        description: 'Cerveza nacional de barril',
        price: '$2.800',
        category: 'Bebidas'
      }
    ],
    tags: ['Deportivo', 'Variado', 'Bar'],
    discount: '10% OFF',
    reviewCount: 234,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio, Resistencia',
      coordinates: { lat: -27.45200, lng: -58.98600 },
    },
    images: [
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/291529/pexels-photo-291529.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/291530/pexels-photo-291530.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'TV Deportiva', 'Ambiente Deportivo', 'Bar Completo'],
    openingHoursDetailed: {
      'Lunes': '12:00 PM - 2:00 AM',
      'Martes': '12:00 PM - 2:00 AM',
      'Miércoles': '12:00 PM - 2:00 AM',
      'Jueves': '12:00 PM - 2:00 AM',
      'Viernes': '12:00 PM - 3:00 AM',
      'Sábado': '12:00 PM - 3:00 AM',
      'Domingo': '12:00 PM - 2:00 AM',
    },
  },
  {
    id: '10',
    title: 'Foodie Bar',
    category: 'Gastronómico',
    categoryId: '16',
    rating: 4.7,
    distance: '1.0 km',
    image: { uri: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio, Resistencia',
    subtitle: 'Bar gastronómico con platos gourmet y cocktails de autor',
    phone: '+54 362 4456-7893',
    website: 'www.foodiebar.com',
    openingHours: 'Mar-Dom 19:00-02:00',
    priceRange: '$$$',
    prices: {
      minPrice: 8000,
      maxPrice: 15000,
      currency: 'ARS',
      description: 'Platos gourmet entre $8.000 y $15.000'
    },
    menu: [
      {
        id: '10-1',
        name: 'Tartar de Salmón',
        description: 'Tartar de salmón fresco con aguacate y cítricos',
        price: '$12.800',
        category: 'Entradas'
      },
      {
        id: '10-2',
        name: 'Risotto de Hongos',
        description: 'Risotto cremoso con hongos portobello',
        price: '$13.500',
        category: 'Platos Principales'
      },
      {
        id: '10-3',
        name: 'Cocktail Foodie',
        description: 'Cocktail signature con gin y hierbas aromáticas',
        price: '$5.200',
        category: 'Bebidas'
      }
    ],
    tags: ['Gourmet', 'Cocktails', 'Autor'],
    discount: '15% OFF',
    reviewCount: 167,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio, Resistencia',
      coordinates: { lat: -27.45300, lng: -58.98500 },
    },
    images: [
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1437268/pexels-photo-1437268.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1437269/pexels-photo-1437269.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Cocktails de Autor', 'Ambiente Gourmet'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 2:00 AM',
      'Miércoles': '7:00 PM - 2:00 AM',
      'Jueves': '7:00 PM - 2:00 AM',
      'Viernes': '7:00 PM - 3:00 AM',
      'Sábado': '7:00 PM - 3:00 AM',
      'Domingo': '7:00 PM - 2:00 AM',
    },
  },
  {
    id: '11',
    title: 'Alfonso Bar & Café',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.4,
    distance: '1.3 km',
    image: { uri: 'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Alberdi, Resistencia',
    subtitle: 'Café de especialidad con ambiente moderno y gastronomía saludable',
    phone: '+54 362 4456-7894',
    website: 'www.alfonso.com',
    openingHours: 'Lun-Dom 8:00-22:00',
    priceRange: '$$',
    prices: {
      minPrice: 3000,
      maxPrice: 9000,
      currency: 'ARS',
      description: 'Cafés y platos entre $3.000 y $9.000'
    },
    menu: [
      {
        id: '11-1',
        name: 'Café de Especialidad',
        description: 'Café de origen único con métodos artesanales',
        price: '$3.200',
        category: 'Cafés'
      },
      {
        id: '11-2',
        name: 'Bowl de Açaí',
        description: 'Bowl de açaí con granola y frutas frescas',
        price: '$8.500',
        category: 'Desayunos'
      },
      {
        id: '11-3',
        name: 'Smoothie Verde',
        description: 'Smoothie con espinaca, banana y manzana',
        price: '$5.800',
        category: 'Bebidas'
      }
    ],
    tags: ['Café', 'Saludable', 'Moderno'],
    discount: '10% OFF',
    reviewCount: 189,
    isOpen: true,
    location: {
      address: 'Av. Alberdi, Resistencia',
      coordinates: { lat: -27.44500, lng: -58.98800 },
    },
    images: [
      'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Café de Especialidad', 'Opciones Saludables'],
    openingHoursDetailed: {
      'Lunes': '8:00 AM - 10:00 PM',
      'Martes': '8:00 AM - 10:00 PM',
      'Miércoles': '8:00 AM - 10:00 PM',
      'Jueves': '8:00 AM - 10:00 PM',
      'Viernes': '8:00 AM - 11:00 PM',
      'Sábado': '8:00 AM - 11:00 PM',
      'Domingo': '8:00 AM - 10:00 PM',
    },
  },
  {
    id: '12',
    title: 'Burger Factory',
    category: 'Americana',
    categoryId: '1',
    rating: 4.3,
    distance: '0.8 km',
    image: { uri: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. San Martín 456, Resistencia',
    subtitle: 'Las mejores hamburguesas gourmet con ingredientes premium',
    phone: '+54 362 4456-7890',
    website: 'www.burgerfactory.com',
    openingHours: 'Lun-Dom 11:00-22:00',
    priceRange: '$$',
    prices: {
      minPrice: 4000,
      maxPrice: 10000,
      currency: 'ARS',
      description: 'Hamburguesas entre $4.000 y $10.000'
    },
    menu: [
      {
        id: '6-1',
        name: 'Classic Burger',
        description: 'Hamburguesa con carne, lechuga, tomate, cebolla y queso',
        price: '$6.500',
        category: 'Hamburguesas'
      },
      {
        id: '6-2',
        name: 'Bacon Cheeseburger',
        description: 'Hamburguesa con bacon, queso cheddar y salsa especial',
        price: '$8.200',
        category: 'Hamburguesas'
      },
      {
        id: '6-3',
        name: 'Mushroom Swiss',
        description: 'Hamburguesa con champiñones salteados y queso suizo',
        price: '$7.800',
        category: 'Hamburguesas'
      },
      {
        id: '6-4',
        name: 'Veggie Burger',
        description: 'Hamburguesa vegetariana con quinoa y vegetales',
        price: '$6.800',
        category: 'Hamburguesas'
      },
      {
        id: '6-5',
        name: 'Papas Fritas',
        description: 'Papas fritas caseras con sal y especias',
        price: '$3.200',
        category: 'Acompañamientos'
      },
      {
        id: '6-6',
        name: 'Milkshake de Vainilla',
        description: 'Milkshake cremoso de vainilla con crema batida',
        price: '$4.500',
        category: 'Bebidas'
      }
    ],
    tags: ['Hamburguesas', 'Papas', 'Milkshakes'],
    reviewCount: 145,
    isOpen: true,
    location: {
      address: 'Av. San Martín 456, Resistencia',
      coordinates: { lat: -27.4495, lng: -58.9845 },
    },
    images: [
      'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/156114/pexels-photo-156114.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Delivery', 'Take Away', 'Terraza'],
    openingHoursDetailed: {
      'Lunes': '11:00 AM - 10:00 PM',
      'Martes': '11:00 AM - 10:00 PM',
      'Miércoles': '11:00 AM - 10:00 PM',
      'Jueves': '11:00 AM - 10:00 PM',
      'Viernes': '11:00 AM - 11:00 PM',
      'Sábado': '10:00 AM - 11:00 PM',
      'Domingo': '10:00 AM - 10:00 PM',
    },
  },
  {
    id: '13',
    title: 'Heladería Artesanal',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.4,
    distance: '0.7 km',
    image: { uri: 'https://images.pexels.com/photos/1352281/pexels-photo-1352281.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio 890, Resistencia',
    subtitle: 'Helados artesanales con sabores únicos y naturales',
    phone: '+54 362 4789-0123',
    website: 'www.heladeriaartesanal.com',
    openingHours: 'Lun-Dom 10:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 1500,
      maxPrice: 4000,
      currency: 'ARS',
      description: 'Helados entre $1.500 y $4.000'
    },
    menu: [
      {
        id: '7-1',
        name: 'Helado de Vainilla',
        description: 'Helado cremoso de vainilla natural',
        price: '$2.000',
        category: 'Helados'
      },
      {
        id: '7-2',
        name: 'Helado de Chocolate',
        description: 'Helado de chocolate belga con chips de chocolate',
        price: '$2.500',
        category: 'Helados'
      },
      {
        id: '7-3',
        name: 'Helado de Frutilla',
        description: 'Helado de frutilla con frutas reales',
        price: '$2.200',
        category: 'Helados'
      },
      {
        id: '7-4',
        name: 'Helado de Dulce de Leche',
        description: 'Helado de dulce de leche casero',
        price: '$2.300',
        category: 'Helados'
      },
      {
        id: '7-5',
        name: 'Copa Banana Split',
        description: 'Copa con helados variados, banana y crema',
        price: '$4.000',
        category: 'Copas Especiales'
      },
      {
        id: '7-6',
        name: 'Sundae de Chocolate',
        description: 'Helado con salsa de chocolate y crema batida',
        price: '$3.500',
        category: 'Copas Especiales'
      }
    ],
    tags: ['Helados', 'Postres', 'Sin gluten'],
    reviewCount: 98,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio 890, Resistencia',
      coordinates: { lat: -27.4508, lng: -58.9872 },
    },
    images: [
      'https://images.pexels.com/photos/1352281/pexels-photo-1352281.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352280/pexels-photo-1352280.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352279/pexels-photo-1352279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Take Away', 'Delivery', 'Opciones Veganas', 'Sin Gluten'],
    openingHoursDetailed: {
      'Lunes': '10:00 AM - 10:00 PM',
      'Martes': '10:00 AM - 10:00 PM',
      'Miércoles': '10:00 AM - 10:00 PM',
      'Jueves': '10:00 AM - 10:00 PM',
      'Viernes': '10:00 AM - 11:00 PM',
      'Sábado': '9:00 AM - 11:00 PM',
      'Domingo': '9:00 AM - 10:00 PM',
    },
  },
  {
    id: '14',
    title: 'Veggie Paradise',
    category: 'Vegetariana',
    categoryId: '5',
    rating: 4.6,
    distance: '1.3 km',
    image: { uri: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Alberdi 234, Resistencia',
    subtitle: 'Cocina vegetariana gourmet con productos de estación',
    phone: '+54 362 4456-7891',
    website: 'www.veggieparadise.com',
    openingHours: 'Lun-Dom 12:00-22:00',
    priceRange: '$$',
    prices: {
      minPrice: 6000,
      maxPrice: 13000,
      currency: 'ARS',
      description: 'Platos vegetarianos entre $6.000 y $13.000'
    },
    menu: [
      {
        id: '8-1',
        name: 'Bowl de Quinoa',
        description: 'Quinoa con vegetales de estación y aderezo de limón',
        price: '$8.500',
        category: 'Platos Principales'
      },
      {
        id: '8-2',
        name: 'Pasta Integral con Pesto',
        description: 'Pasta integral con pesto de albahaca y piñones',
        price: '$9.200',
        category: 'Platos Principales'
      },
      {
        id: '8-3',
        name: 'Ensalada César Vegana',
        description: 'Lechuga romana, crutones, aderezo vegano',
        price: '$6.800',
        category: 'Ensaladas'
      },
      {
        id: '8-4',
        name: 'Hamburguesa de Lentejas',
        description: 'Hamburguesa de lentejas con vegetales y salsa tahini',
        price: '$7.500',
        category: 'Platos Principales'
      },
      {
        id: '8-5',
        name: 'Sopa de Verduras',
        description: 'Sopa casera con vegetales orgánicos',
        price: '$5.500',
        category: 'Entradas'
      },
      {
        id: '8-6',
        name: 'Postre Vegano de Chocolate',
        description: 'Postre de chocolate sin lácteos con frutos rojos',
        price: '$4.800',
        category: 'Postres'
      }
    ],
    tags: ['Vegetariano', 'Gourmet', 'Sin TACC'],
    discount: '10% OFF',
    reviewCount: 76,
    isOpen: true,
    location: {
      address: 'Av. Alberdi 234, Resistencia',
      coordinates: { lat: -27.4492, lng: -58.9868 },
    },
    images: [
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Opciones Veganas', 'Sin Gluten'],
    openingHoursDetailed: {
      'Lunes': '12:00 PM - 10:00 PM',
      'Martes': '12:00 PM - 10:00 PM',
      'Miércoles': '12:00 PM - 10:00 PM',
      'Jueves': '12:00 PM - 10:00 PM',
      'Viernes': '12:00 PM - 11:00 PM',
      'Sábado': '11:00 AM - 11:00 PM',
      'Domingo': '11:00 AM - 10:00 PM',
    },
  },
  {
    id: '15',
    title: 'Sweet Dreams',
    category: 'Postres',
    categoryId: '8',
    rating: 4.5,
    distance: '0.6 km',
    image: { uri: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 25 de Mayo 654, Resistencia',
    subtitle: 'Postres artesanales y pastelería francesa',
    phone: '+54 362 4456-7892',
    website: 'www.sweetdreams.com',
    openingHours: 'Lun-Dom 9:00-21:00',
    priceRange: '$$',
    prices: {
      minPrice: 2000,
      maxPrice: 6000,
      currency: 'ARS',
      description: 'Postres entre $2.000 y $6.000'
    },
    menu: [
      {
        id: '9-1',
        name: 'Tiramisú Clásico',
        description: 'Tiramisú tradicional con café y mascarpone',
        price: '$4.500',
        category: 'Postres'
      },
      {
        id: '9-2',
        name: 'Cheesecake de Frutilla',
        description: 'Cheesecake con mermelada de frutilla casera',
        price: '$3.800',
        category: 'Postres'
      },
      {
        id: '9-3',
        name: 'Tarta de Chocolate',
        description: 'Tarta de chocolate negro con ganache',
        price: '$4.200',
        category: 'Postres'
      },
      {
        id: '9-4',
        name: 'Macarons Variados',
        description: '6 macarons de diferentes sabores',
        price: '$5.500',
        category: 'Postres'
      },
      {
        id: '9-5',
        name: 'Profiteroles',
        description: 'Profiteroles con chocolate caliente',
        price: '$3.500',
        category: 'Postres'
      },
      {
        id: '9-6',
        name: 'Té de la Tarde',
        description: 'Té con selección de pasteles',
        price: '$6.000',
        category: 'Bebidas'
      }
    ],
    tags: ['Postres', 'Pastelería', 'Sin gluten'],
    discount: '15% OFF',
    reviewCount: 134,
    isOpen: true,
    location: {
      address: 'Av. 25 de Mayo 654, Resistencia',
      coordinates: { lat: -27.4485, lng: -58.9789 },
    },
    images: [
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/291529/pexels-photo-291529.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/291530/pexels-photo-291530.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Take Away', 'Delivery', 'Sin Gluten', 'Opciones Veganas'],
    openingHoursDetailed: {
      'Lunes': '9:00 AM - 9:00 PM',
      'Martes': '9:00 AM - 9:00 PM',
      'Miércoles': '9:00 AM - 9:00 PM',
      'Jueves': '9:00 AM - 9:00 PM',
      'Viernes': '9:00 AM - 10:00 PM',
      'Sábado': '8:00 AM - 10:00 PM',
      'Domingo': '8:00 AM - 9:00 PM',
    },
  },
  {
    id: '16',
    title: 'Pasta Mia',
    category: 'Italiana',
    categoryId: '2',
    rating: 4.7,
    distance: '1.4 km',
    image: { uri: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Sarmiento 123, Resistencia',
    subtitle: 'Pasta fresca artesanal con salsas tradicionales',
    phone: '+54 362 4456-7893',
    website: 'www.pastamia.com',
    openingHours: 'Mar-Dom 19:00-23:00',
    priceRange: '$$',
    prices: {
      minPrice: 7000,
      maxPrice: 14000,
      currency: 'ARS',
      description: 'Platos de pasta entre $7.000 y $14.000'
    },
    menu: [
      {
        id: '10-1',
        name: 'Spaghetti Carbonara',
        description: 'Espagueti con huevo, queso parmesano y panceta',
        price: '$12.000',
        category: 'Pastas'
      },
      {
        id: '10-2',
        name: 'Fettuccine Alfredo',
        description: 'Fettuccine con salsa cremosa y parmesano',
        price: '$11.500',
        category: 'Pastas'
      },
      {
        id: '10-3',
        name: 'Lasagna Bolognese',
        description: 'Lasagna con salsa boloñesa y bechamel',
        price: '$13.500',
        category: 'Pastas'
      },
      {
        id: '10-4',
        name: 'Ravioles de Ricotta',
        description: 'Ravioles caseros con ricotta y salsa de tomate',
        price: '$12.800',
        category: 'Pastas'
      },
      {
        id: '10-5',
        name: 'Penne Arrabbiata',
        description: 'Penne con salsa picante de tomate y ajo',
        price: '$10.500',
        category: 'Pastas'
      },
      {
        id: '10-6',
        name: 'Tiramisú',
        description: 'Tiramisú casero con café y mascarpone',
        price: '$5.200',
        category: 'Postres'
      }
    ],
    tags: ['Pasta', 'Vino', 'Casero'],
    reviewCount: 89,
    isOpen: true,
    location: {
      address: 'Av. Sarmiento 123, Resistencia',
      coordinates: { lat: -27.4502, lng: -58.9921 },
    },
    images: [
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1437268/pexels-photo-1437268.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1437269/pexels-photo-1437269.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Bar de Vinos', 'Reservas'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 11:00 PM',
      'Miércoles': '7:00 PM - 11:00 PM',
      'Jueves': '7:00 PM - 11:00 PM',
      'Viernes': '7:00 PM - 12:00 AM',
      'Sábado': '6:00 PM - 12:00 AM',
      'Domingo': '6:00 PM - 11:00 PM',
    },
  },
  {
    id: '17',
    title: 'Bodegón El Abuelo',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.8,
    distance: '0.9 km',
    image: { uri: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio 1456, Resistencia',
    subtitle: 'Bodegón tradicional con las mejores empanadas y locro del Chaco',
    phone: '+54 362 4123-4568',
    website: 'www.bodegonelabuelo.com',
    openingHours: 'Lun-Dom 11:00-23:00',
    priceRange: '$',
    prices: {
      minPrice: 2500,
      maxPrice: 8000,
      currency: 'ARS',
      description: 'Platos típicos entre $2.500 y $8.000'
    },
    menu: [
      {
        id: '11-1',
        name: 'Empanadas Salteñas',
        description: 'Empanadas de carne con papa, huevo y aceitunas',
        price: '$3.200',
        category: 'Entradas'
      },
      {
        id: '11-2',
        name: 'Locro Chaqueño',
        description: 'Locro tradicional con maíz, porotos y carne',
        price: '$6.500',
        category: 'Platos Principales'
      },
      {
        id: '11-3',
        name: 'Milanesa Napolitana',
        description: 'Milanesa con jamón, queso y salsa de tomate',
        price: '$7.800',
        category: 'Platos Principales'
      },
      {
        id: '11-4',
        name: 'Choripán Criollo',
        description: 'Chorizo casero en pan de campo con chimichurri',
        price: '$4.500',
        category: 'Entradas'
      },
      {
        id: '11-5',
        name: 'Humita en Chala',
        description: 'Humita tradicional con choclo rallado y especias',
        price: '$5.200',
        category: 'Platos Principales'
      },
      {
        id: '11-6',
        name: 'Postre de Miel',
        description: 'Postre casero con miel de caña',
        price: '$2.800',
        category: 'Postres'
      }
    ],
    tags: ['Empanadas', 'Locro', 'Choripán', 'Casero'],
    discount: '30% OFF',
    reviewCount: 234,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio 1456, Resistencia',
      coordinates: { lat: -27.4515, lng: -58.9878 },
    },
    images: [
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958547/pexels-photo-958547.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Delivery', 'Take Away', 'Música Folklórica'],
    openingHoursDetailed: {
      'Lunes': '11:00 AM - 11:00 PM',
      'Martes': '11:00 AM - 11:00 PM',
      'Miércoles': '11:00 AM - 11:00 PM',
      'Jueves': '11:00 AM - 11:00 PM',
      'Viernes': '11:00 AM - 12:00 AM',
      'Sábado': '10:00 AM - 12:00 AM',
      'Domingo': '10:00 AM - 11:00 PM',
    },
  },
  {
    id: '18',
    title: 'Bodegón La Esquina',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.6,
    distance: '1.1 km',
    image: { uri: 'https://images.pexels.com/photos/958548/pexels-photo-958548.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Esquina de Av. Alberdi y San Martín, Resistencia',
    subtitle: 'Bodegón de esquina con ambiente familiar y comida casera',
    phone: '+54 362 4456-7894',
    website: 'www.bodegonlaesquina.com',
    openingHours: 'Lun-Dom 12:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 3000,
      maxPrice: 9000,
      currency: 'ARS',
      description: 'Platos caseros entre $3.000 y $9.000'
    },
    menu: [
      {
        id: '12-1',
        name: 'Milanesa a la Suiza',
        description: 'Milanesa con jamón, queso y salsa bechamel',
        price: '$8.500',
        category: 'Platos Principales'
      },
      {
        id: '12-2',
        name: 'Pasta Casera',
        description: 'Fideos caseros con salsa de tomate y albahaca',
        price: '$6.200',
        category: 'Platos Principales'
      },
      {
        id: '12-3',
        name: 'Ensalada de la Casa',
        description: 'Lechuga, tomate, cebolla y aceite de oliva',
        price: '$3.500',
        category: 'Acompañamientos'
      },
      {
        id: '12-4',
        name: 'Sopa de Verduras',
        description: 'Sopa casera con vegetales de estación',
        price: '$4.800',
        category: 'Entradas'
      },
      {
        id: '12-5',
        name: 'Pollo al Horno',
        description: 'Pollo entero al horno con hierbas aromáticas',
        price: '$9.000',
        category: 'Platos Principales'
      },
      {
        id: '12-6',
        name: 'Flan Casero',
        description: 'Flan casero con dulce de leche',
        price: '$2.500',
        category: 'Postres'
      }
    ],
    tags: ['Milanesas', 'Pasta', 'Ensaladas', 'Familiar'],
    discount: '20% OFF',
    reviewCount: 167,
    isOpen: true,
    location: {
      address: 'Esquina de Av. Alberdi y San Martín, Resistencia',
      coordinates: { lat: -27.4498, lng: -58.9855 },
    },
    images: [
      'https://images.pexels.com/photos/958548/pexels-photo-958548.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958549/pexels-photo-958549.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958550/pexels-photo-958550.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Take Away', 'Mesa Familiar', 'Terraza'],
    openingHoursDetailed: {
      'Lunes': '12:00 PM - 10:00 PM',
      'Martes': '12:00 PM - 10:00 PM',
      'Miércoles': '12:00 PM - 10:00 PM',
      'Jueves': '12:00 PM - 10:00 PM',
      'Viernes': '12:00 PM - 11:00 PM',
      'Sábado': '11:00 AM - 11:00 PM',
      'Domingo': '11:00 AM - 10:00 PM',
    },
  },
  {
    id: '19',
    title: 'Bodegón Don José',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.7,
    distance: '1.5 km',
    image: { uri: 'https://images.pexels.com/photos/958551/pexels-photo-958551.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 25 de Mayo 987, Resistencia',
    subtitle: 'Bodegón histórico con las mejores empanadas salteñas del Chaco',
    phone: '+54 362 4456-7895',
    website: 'www.bodegondonjose.com',
    openingHours: 'Mar-Dom 11:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 2000,
      maxPrice: 7000,
      currency: 'ARS',
      description: 'Empanadas y platos entre $2.000 y $7.000'
    },
    menu: [
      {
        id: '13-1',
        name: 'Empanadas Salteñas',
        description: 'Empanadas de carne con papa, huevo y aceitunas',
        price: '$2.800',
        category: 'Entradas'
      },
      {
        id: '13-2',
        name: 'Empanadas de Pollo',
        description: 'Empanadas de pollo con cebolla y especias',
        price: '$2.600',
        category: 'Entradas'
      },
      {
        id: '13-3',
        name: 'Empanadas de Humita',
        description: 'Empanadas de humita con choclo rallado',
        price: '$2.400',
        category: 'Entradas'
      },
      {
        id: '13-4',
        name: 'Locro Tradicional',
        description: 'Locro con maíz, porotos y carne de cerdo',
        price: '$5.800',
        category: 'Platos Principales'
      },
      {
        id: '13-5',
        name: 'Tamales Chaqueños',
        description: 'Tamales de maíz con carne y especias',
        price: '$4.200',
        category: 'Platos Principales'
      },
      {
        id: '13-6',
        name: 'Chipá Casero',
        description: 'Chipá tradicional de mandioca y queso',
        price: '$1.800',
        category: 'Acompañamientos'
      }
    ],
    tags: ['Empanadas Salteñas', 'Locro', 'Humita', 'Tradicional'],
    discount: '25% OFF',
    reviewCount: 189,
    isOpen: true,
    location: {
      address: 'Av. 25 de Mayo 987, Resistencia',
      coordinates: { lat: -27.4489, lng: -58.9795 },
    },
    images: [
      'https://images.pexels.com/photos/958551/pexels-photo-958551.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958552/pexels-photo-958552.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958553/pexels-photo-958553.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Delivery', 'Take Away', 'Música en Vivo', 'Histórico'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '11:00 AM - 10:00 PM',
      'Miércoles': '11:00 AM - 10:00 PM',
      'Jueves': '11:00 AM - 10:00 PM',
      'Viernes': '11:00 AM - 11:00 PM',
      'Sábado': '10:00 AM - 11:00 PM',
      'Domingo': '10:00 AM - 10:00 PM',
    },
  },
  {
    id: '20',
    title: 'Bodegón El Fogón Criollo',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.5,
    distance: '0.7 km',
    image: { uri: 'https://images.pexels.com/photos/958554/pexels-photo-958554.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. San Martín 654, Resistencia',
    subtitle: 'Bodegón criollo con especialidades del norte argentino',
    phone: '+54 362 4456-7896',
    website: 'www.bodegonelfogoncriollo.com',
    openingHours: 'Lun-Dom 12:00-23:00',
    priceRange: '$',
    prices: {
      minPrice: 3500,
      maxPrice: 8500,
      currency: 'ARS',
      description: 'Platos criollos entre $3.500 y $8.500'
    },
    menu: [
      {
        id: '14-1',
        name: 'Carbonada Criolla',
        description: 'Carbonada con carne, zapallo y choclo',
        price: '$7.200',
        category: 'Platos Principales'
      },
      {
        id: '14-2',
        name: 'Tamales del Norte',
        description: 'Tamales de maíz con carne y especias del norte',
        price: '$4.800',
        category: 'Platos Principales'
      },
      {
        id: '14-3',
        name: 'Empanadas Tucumanas',
        description: 'Empanadas de carne con cebolla y comino',
        price: '$3.500',
        category: 'Entradas'
      },
      {
        id: '14-4',
        name: 'Locro Norteño',
        description: 'Locro con maíz blanco y carne de cerdo',
        price: '$6.800',
        category: 'Platos Principales'
      },
      {
        id: '14-5',
        name: 'Humita en Olla',
        description: 'Humita cremosa con choclo rallado',
        price: '$5.500',
        category: 'Platos Principales'
      },
      {
        id: '14-6',
        name: 'Postre de Cayote',
        description: 'Postre tradicional con dulce de cayote',
        price: '$2.800',
        category: 'Postres'
      }
    ],
    tags: ['Criollo', 'Tamales', 'Carbonada', 'Regional'],
    discount: '15% OFF',
    reviewCount: 145,
    isOpen: true,
    location: {
      address: 'Av. San Martín 654, Resistencia',
      coordinates: { lat: -27.4492, lng: -58.9838 },
    },
    images: [
      'https://images.pexels.com/photos/958554/pexels-photo-958554.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958555/pexels-photo-958555.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958556/pexels-photo-958556.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Delivery', 'Patio', 'Música Regional'],
    openingHoursDetailed: {
      'Lunes': '12:00 PM - 11:00 PM',
      'Martes': '12:00 PM - 11:00 PM',
      'Miércoles': '12:00 PM - 11:00 PM',
      'Jueves': '12:00 PM - 11:00 PM',
      'Viernes': '12:00 PM - 12:00 AM',
      'Sábado': '11:00 AM - 12:00 AM',
      'Domingo': '11:00 AM - 11:00 PM',
    },
  },
  {
    id: '21',
    title: 'Bodegón La Familia',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.4,
    distance: '1.8 km',
    image: { uri: 'https://images.pexels.com/photos/958557/pexels-photo-958557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Sarmiento 432, Resistencia',
    subtitle: 'Bodegón familiar con recetas de la abuela chaqueña',
    phone: '+54 362 4456-7897',
    website: 'www.bodegonlafamilia.com',
    openingHours: 'Lun-Dom 11:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 2800,
      maxPrice: 7500,
      currency: 'ARS',
      description: 'Platos familiares entre $2.800 y $7.500'
    },
    menu: [
      {
        id: '15-1',
        name: 'Sopa Paraguaya',
        description: 'Sopa paraguaya casera con queso y cebolla',
        price: '$4.200',
        category: 'Platos Principales'
      },
      {
        id: '15-2',
        name: 'Chipá Guazú',
        description: 'Chipá guazú con choclo rallado y queso',
        price: '$3.800',
        category: 'Platos Principales'
      },
      {
        id: '15-3',
        name: 'Empanadas Caseras',
        description: 'Empanadas de carne con receta de la abuela',
        price: '$3.200',
        category: 'Entradas'
      },
      {
        id: '15-4',
        name: 'Milanesa Familiar',
        description: 'Milanesa grande para compartir en familia',
        price: '$7.500',
        category: 'Platos Principales'
      },
      {
        id: '15-5',
        name: 'Pasta Casera',
        description: 'Fideos caseros con salsa de tomate',
        price: '$5.800',
        category: 'Platos Principales'
      },
      {
        id: '15-6',
        name: 'Postre de Leche',
        description: 'Postre casero de leche con canela',
        price: '$2.200',
        category: 'Postres'
      }
    ],
    tags: ['Familiar', 'Casero', 'Sopa Paraguaya', 'Chipá'],
    discount: '10% OFF',
    reviewCount: 123,
    isOpen: true,
    location: {
      address: 'Av. Sarmiento 432, Resistencia',
      coordinates: { lat: -27.4508, lng: -58.9912 },
    },
    images: [
      'https://images.pexels.com/photos/958557/pexels-photo-958557.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958558/pexels-photo-958558.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958559/pexels-photo-958559.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Take Away', 'Mesa Familiar', 'Jardín', 'Recetas Caseras'],
    openingHoursDetailed: {
      'Lunes': '11:00 AM - 10:00 PM',
      'Martes': '11:00 AM - 10:00 PM',
      'Miércoles': '11:00 AM - 10:00 PM',
      'Jueves': '11:00 AM - 10:00 PM',
      'Viernes': '11:00 AM - 11:00 PM',
      'Sábado': '10:00 AM - 11:00 PM',
      'Domingo': '10:00 AM - 10:00 PM',
    },
  },
  {
    id: '22',
    title: 'Bodegón El Rincón',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.6,
    distance: '1.2 km',
    image: { uri: 'https://images.pexels.com/photos/958560/pexels-photo-958560.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio 789, Resistencia',
    subtitle: 'Bodegón de barrio con las mejores milanesas napolitanas',
    phone: '+54 362 4456-7898',
    website: 'www.bodegonelrincon.com',
    openingHours: 'Lun-Dom 12:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 3200,
      maxPrice: 7800,
      currency: 'ARS',
      description: 'Milanesas y platos entre $3.200 y $7.800'
    },
    menu: [
      {
        id: '16-1',
        name: 'Milanesa Napolitana',
        description: 'Milanesa con jamón, queso y salsa de tomate',
        price: '$7.800',
        category: 'Platos Principales'
      },
      {
        id: '16-2',
        name: 'Milanesa a la Suiza',
        description: 'Milanesa con jamón, queso y salsa bechamel',
        price: '$8.200',
        category: 'Platos Principales'
      },
      {
        id: '16-3',
        name: 'Milanesa Completa',
        description: 'Milanesa con huevo frito y papas fritas',
        price: '$7.500',
        category: 'Platos Principales'
      },
      {
        id: '16-4',
        name: 'Pasta con Milanesa',
        description: 'Fideos con milanesa picada y salsa de tomate',
        price: '$6.800',
        category: 'Platos Principales'
      },
      {
        id: '16-5',
        name: 'Ensalada de la Casa',
        description: 'Lechuga, tomate, cebolla y aceite de oliva',
        price: '$3.200',
        category: 'Acompañamientos'
      },
      {
        id: '16-6',
        name: 'Papas Fritas',
        description: 'Papas fritas caseras con sal',
        price: '$2.800',
        category: 'Acompañamientos'
      }
    ],
    tags: ['Milanesas', 'Pasta', 'Barrio', 'Casero'],
    discount: '20% OFF',
    reviewCount: 178,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio 789, Resistencia',
      coordinates: { lat: -27.4512, lng: -58.9862 },
    },
    images: [
      'https://images.pexels.com/photos/958560/pexels-photo-958560.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958561/pexels-photo-958561.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958562/pexels-photo-958562.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Delivery', 'Take Away', 'Ambiente Familiar'],
    openingHoursDetailed: {
      'Lunes': '12:00 PM - 10:00 PM',
      'Martes': '12:00 PM - 10:00 PM',
      'Miércoles': '12:00 PM - 10:00 PM',
      'Jueves': '12:00 PM - 10:00 PM',
      'Viernes': '12:00 PM - 11:00 PM',
      'Sábado': '11:00 AM - 11:00 PM',
      'Domingo': '11:00 AM - 10:00 PM',
    },
  },
  {
    id: '23',
    title: 'Bodegón Los Pinos',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.3,
    distance: '2.0 km',
    image: { uri: 'https://images.pexels.com/photos/958563/pexels-photo-958563.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Alberdi 876, Resistencia',
    subtitle: 'Bodegón con especialidades en pescados del río Paraná',
    phone: '+54 362 4456-7899',
    website: 'www.bodegonlospinos.com',
    openingHours: 'Mar-Dom 12:00-22:00',
    priceRange: '$$',
    prices: {
      minPrice: 5500,
      maxPrice: 12000,
      currency: 'ARS',
      description: 'Pescados y platos entre $5.500 y $12.000'
    },
    menu: [
      {
        id: '17-1',
        name: 'Surubí a la Parrilla',
        description: 'Surubí fresco del Paraná a la parrilla con limón',
        price: '$11.500',
        category: 'Platos Principales'
      },
      {
        id: '17-2',
        name: 'Pacú al Horno',
        description: 'Pacú al horno con hierbas aromáticas',
        price: '$10.800',
        category: 'Platos Principales'
      },
      {
        id: '17-3',
        name: 'Dorado Frito',
        description: 'Dorado frito con papas fritas',
        price: '$9.200',
        category: 'Platos Principales'
      },
      {
        id: '17-4',
        name: 'Ensalada de Pescado',
        description: 'Ensalada con pescado ahumado y vegetales',
        price: '$6.500',
        category: 'Entradas'
      },
      {
        id: '17-5',
        name: 'Sopa de Pescado',
        description: 'Sopa casera con pescados del río',
        price: '$5.500',
        category: 'Entradas'
      },
      {
        id: '17-6',
        name: 'Postre de Limón',
        description: 'Postre de limón con merengue',
        price: '$3.200',
        category: 'Postres'
      }
    ],
    tags: ['Pescado', 'Río', 'Parrilla', 'Regional'],
    discount: '15% OFF',
    reviewCount: 98,
    isOpen: true,
    location: {
      address: 'Av. Alberdi 876, Resistencia',
      coordinates: { lat: -27.4495, lng: -58.9875 },
    },
    images: [
      'https://images.pexels.com/photos/958563/pexels-photo-958563.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958564/pexels-photo-958564.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958565/pexels-photo-958565.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Vista al Río', 'Parrilla'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '12:00 PM - 10:00 PM',
      'Miércoles': '12:00 PM - 10:00 PM',
      'Jueves': '12:00 PM - 10:00 PM',
      'Viernes': '12:00 PM - 11:00 PM',
      'Sábado': '11:00 AM - 11:00 PM',
      'Domingo': '11:00 AM - 10:00 PM',
    },
  },
  {
    id: '24',
    title: 'Bodegón El Gaucho',
    category: 'Bodegones',
    categoryId: '10',
    rating: 4.7,
    distance: '1.6 km',
    image: { uri: 'https://images.pexels.com/photos/958566/pexels-photo-958566.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 25 de Mayo 543, Resistencia',
    subtitle: 'Bodegón gauchesco con las mejores empanadas de carne',
    phone: '+54 362 4456-7900',
    website: 'www.bodegonelgaucho.com',
    openingHours: 'Lun-Dom 11:00-23:00',
    priceRange: '$',
    prices: {
      minPrice: 2200,
      maxPrice: 6500,
      currency: 'ARS',
      description: 'Empanadas y platos entre $2.200 y $6.500'
    },
    menu: [
      {
        id: '18-1',
        name: 'Empanadas de Carne',
        description: 'Empanadas de carne con cebolla y especias',
        price: '$2.800',
        category: 'Entradas'
      },
      {
        id: '18-2',
        name: 'Empanadas de Pollo',
        description: 'Empanadas de pollo con cebolla y comino',
        price: '$2.600',
        category: 'Entradas'
      },
      {
        id: '18-3',
        name: 'Asado de Tira',
        description: 'Asado de tira tradicional con costra crujiente',
        price: '$6.500',
        category: 'Platos Principales'
      },
      {
        id: '18-4',
        name: 'Choripán Criollo',
        description: 'Chorizo casero en pan de campo',
        price: '$3.800',
        category: 'Entradas'
      },
      {
        id: '18-5',
        name: 'Vacío a la Parrilla',
        description: 'Vacío marinado con hierbas y especias',
        price: '$5.800',
        category: 'Platos Principales'
      },
      {
        id: '18-6',
        name: 'Postre de Miel',
        description: 'Postre casero con miel de caña',
        price: '$2.200',
        category: 'Postres'
      }
    ],
    tags: ['Gauchesco', 'Empanadas', 'Asado', 'Tradicional'],
    discount: '25% OFF',
    reviewCount: 156,
    isOpen: true,
    location: {
      address: 'Av. 25 de Mayo 543, Resistencia',
      coordinates: { lat: -27.4487, lng: -58.9802 },
    },
    images: [
      'https://images.pexels.com/photos/958566/pexels-photo-958566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958567/pexels-photo-958567.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/958568/pexels-photo-958568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Delivery', 'Take Away', 'Música Folklórica', 'Ambiente Gauchesco'],
    openingHoursDetailed: {
      'Lunes': '11:00 AM - 11:00 PM',
      'Martes': '11:00 AM - 11:00 PM',
      'Miércoles': '11:00 AM - 11:00 PM',
      'Jueves': '11:00 AM - 11:00 PM',
      'Viernes': '11:00 AM - 12:00 AM',
      'Sábado': '10:00 AM - 12:00 AM',
      'Domingo': '10:00 AM - 11:00 PM',
    },
  },
  {
    id: '25',
    title: 'Heladería La Esquina',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.3,
    distance: '1.3 km',
    image: { uri: 'https://images.pexels.com/photos/1352282/pexels-photo-1352282.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Esquina de Av. Alberdi y San Martín, Resistencia',
    subtitle: 'Heladería de esquina con sabores tradicionales y caseros',
    phone: '+54 362 4456-7901',
    website: 'www.heladerialaesquina.com',
    openingHours: 'Lun-Dom 10:00-23:00',
    priceRange: '$',
    prices: {
      minPrice: 1200,
      maxPrice: 3500,
      currency: 'ARS',
      description: 'Helados entre $1.200 y $3.500'
    },
    menu: [
      {
        id: '19-1',
        name: 'Helado de Dulce de Leche',
        description: 'Helado cremoso de dulce de leche casero',
        price: '$2.000',
        category: 'Helados'
      },
      {
        id: '19-2',
        name: 'Helado de Vainilla',
        description: 'Helado de vainilla natural con vainas',
        price: '$1.800',
        category: 'Helados'
      },
      {
        id: '19-3',
        name: 'Helado de Chocolate',
        description: 'Helado de chocolate con chips de chocolate',
        price: '$2.200',
        category: 'Helados'
      },
      {
        id: '19-4',
        name: 'Helado de Frutilla',
        description: 'Helado de frutilla con frutas reales',
        price: '$2.000',
        category: 'Helados'
      },
      {
        id: '19-5',
        name: 'Copa Helada',
        description: 'Copa con helados variados y crema',
        price: '$3.500',
        category: 'Copas Especiales'
      },
      {
        id: '19-6',
        name: 'Granizado de Limón',
        description: 'Granizado refrescante de limón',
        price: '$1.500',
        category: 'Granizados'
      }
    ],
    tags: ['Helados', 'Casero', 'Esquina', 'Tradicional'],
    discount: '10% OFF',
    reviewCount: 87,
    isOpen: true,
    location: {
      address: 'Esquina de Av. Alberdi y San Martín, Resistencia',
      coordinates: { lat: -27.4498, lng: -58.9855 },
    },
    images: [
      'https://images.pexels.com/photos/1352282/pexels-photo-1352282.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352283/pexels-photo-1352283.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352284/pexels-photo-1352284.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Take Away', 'Delivery', 'Esquina', 'Sabores Caseros'],
    openingHoursDetailed: {
      'Lunes': '10:00 AM - 11:00 PM',
      'Martes': '10:00 AM - 11:00 PM',
      'Miércoles': '10:00 AM - 11:00 PM',
      'Jueves': '10:00 AM - 11:00 PM',
      'Viernes': '10:00 AM - 12:00 AM',
      'Sábado': '9:00 AM - 12:00 AM',
      'Domingo': '9:00 AM - 11:00 PM',
    },
  },
  {
    id: '26',
    title: 'Heladería El Paraíso',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.6,
    distance: '0.9 km',
    image: { uri: 'https://images.pexels.com/photos/1352285/pexels-photo-1352285.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio 567, Resistencia',
    subtitle: 'Heladería gourmet con sabores únicos y artesanales',
    phone: '+54 362 4456-7902',
    website: 'www.heladeriaelparaiso.com',
    openingHours: 'Lun-Dom 11:00-22:00',
    priceRange: '$$',
    prices: {
      minPrice: 2500,
      maxPrice: 6000,
      currency: 'ARS',
      description: 'Helados gourmet entre $2.500 y $6.000'
    },
    menu: [
      {
        id: '20-1',
        name: 'Helado de Pistacho',
        description: 'Helado de pistacho con nueces reales',
        price: '$4.500',
        category: 'Helados Gourmet'
      },
      {
        id: '20-2',
        name: 'Helado de Menta con Chocolate',
        description: 'Helado de menta con chips de chocolate negro',
        price: '$3.800',
        category: 'Helados Gourmet'
      },
      {
        id: '20-3',
        name: 'Helado de Cookies & Cream',
        description: 'Helado de vainilla con galletas Oreo',
        price: '$3.200',
        category: 'Helados Gourmet'
      },
      {
        id: '20-4',
        name: 'Helado de Brownie',
        description: 'Helado de chocolate con trozos de brownie',
        price: '$4.200',
        category: 'Helados Gourmet'
      },
      {
        id: '20-5',
        name: 'Copa Banana Split Gourmet',
        description: 'Copa con helados variados, banana y toppings premium',
        price: '$6.000',
        category: 'Copas Especiales'
      },
      {
        id: '20-6',
        name: 'Sundae de Caramelo',
        description: 'Helado con salsa de caramelo y crema batida',
        price: '$4.800',
        category: 'Copas Especiales'
      }
    ],
    tags: ['Gourmet', 'Artesanal', 'Sabores Únicos', 'Premium'],
    discount: '15% OFF',
    reviewCount: 134,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio 567, Resistencia',
      coordinates: { lat: -27.4510, lng: -58.9868 },
    },
    images: [
      'https://images.pexels.com/photos/1352285/pexels-photo-1352285.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352286/pexels-photo-1352286.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352287/pexels-photo-1352287.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Sabores Gourmet', 'Ambiente Premium'],
    openingHoursDetailed: {
      'Lunes': '11:00 AM - 10:00 PM',
      'Martes': '11:00 AM - 10:00 PM',
      'Miércoles': '11:00 AM - 10:00 PM',
      'Jueves': '11:00 AM - 10:00 PM',
      'Viernes': '11:00 AM - 11:00 PM',
      'Sábado': '10:00 AM - 11:00 PM',
      'Domingo': '10:00 AM - 10:00 PM',
    },
  },
  {
    id: '27',
    title: 'Pizzería Don Corleone',
    category: 'Italiana',
    categoryId: '2',
    rating: 4.5,
    distance: '1.1 km',
    image: { uri: 'https://images.pexels.com/photos/1565983/pexels-photo-1565983.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. San Martín 234, Resistencia',
    subtitle: 'Pizza estilo Nueva York con masa gruesa y sabores intensos',
    phone: '+54 362 4456-7903',
    website: 'www.pizzeriadoncorleone.com',
    openingHours: 'Lun-Dom 18:00-23:00',
    priceRange: '$$',
    prices: {
      minPrice: 4500,
      maxPrice: 12000,
      currency: 'ARS',
      description: 'Pizzas entre $4.500 y $12.000'
    },
    menu: [
      {
        id: '21-1',
        name: 'Pizza Pepperoni',
        description: 'Pizza con pepperoni, mozzarella y salsa de tomate',
        price: '$8.500',
        category: 'Pizzas Clásicas'
      },
      {
        id: '21-2',
        name: 'Pizza Hawaiana',
        description: 'Pizza con jamón, piña y mozzarella',
        price: '$9.200',
        category: 'Pizzas Especiales'
      },
      {
        id: '21-3',
        name: 'Pizza BBQ Chicken',
        description: 'Pizza con pollo, salsa BBQ y cebolla caramelizada',
        price: '$10.500',
        category: 'Pizzas Especiales'
      },
      {
        id: '21-4',
        name: 'Pizza Vegetariana',
        description: 'Pizza con vegetales frescos y mozzarella',
        price: '$8.800',
        category: 'Pizzas Vegetarianas'
      },
      {
        id: '21-5',
        name: 'Pizza Suprema',
        description: 'Pizza con pepperoni, salchicha, pimientos y aceitunas',
        price: '$11.500',
        category: 'Pizzas Especiales'
      },
      {
        id: '21-6',
        name: 'Pizza Margherita',
        description: 'Pizza clásica con tomate, mozzarella y albahaca',
        price: '$7.200',
        category: 'Pizzas Clásicas'
      }
    ],
    tags: ['Estilo NY', 'Masa Gruesa', 'Sabores Intensos', 'Delivery'],
    discount: '20% OFF',
    reviewCount: 156,
    isOpen: true,
    location: {
      address: 'Av. San Martín 234, Resistencia',
      coordinates: { lat: -27.4493, lng: -58.9842 },
    },
    images: [
      'https://images.pexels.com/photos/1565983/pexels-photo-1565983.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1565984/pexels-photo-1565984.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1565985/pexels-photo-1565985.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Delivery', 'Take Away', 'Horno de Piedra', 'Estilo NY'],
    openingHoursDetailed: {
      'Lunes': '6:00 PM - 11:00 PM',
      'Martes': '6:00 PM - 11:00 PM',
      'Miércoles': '6:00 PM - 11:00 PM',
      'Jueves': '6:00 PM - 11:00 PM',
      'Viernes': '6:00 PM - 12:00 AM',
      'Sábado': '5:00 PM - 12:00 AM',
      'Domingo': '5:00 PM - 11:00 PM',
    },
  },
  {
    id: '28',
    title: 'Pizzería La Toscana',
    category: 'Italiana',
    categoryId: '2',
    rating: 4.7,
    distance: '0.8 km',
    image: { uri: 'https://images.pexels.com/photos/1565986/pexels-photo-1565986.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 25 de Mayo 876, Resistencia',
    subtitle: 'Pizza auténtica italiana con ingredientes importados',
    phone: '+54 362 4456-7904',
    website: 'www.pizzerialatoscana.com',
    openingHours: 'Mar-Dom 19:00-23:00',
    priceRange: '$$$',
    prices: {
      minPrice: 8000,
      maxPrice: 18000,
      currency: 'ARS',
      description: 'Pizzas gourmet entre $8.000 y $18.000'
    },
    menu: [
      {
        id: '22-1',
        name: 'Pizza Prosciutto e Funghi',
        description: 'Pizza con jamón crudo italiano y champiñones',
        price: '$15.500',
        category: 'Pizzas Gourmet'
      },
      {
        id: '22-2',
        name: 'Pizza Quattro Stagioni',
        description: 'Pizza con jamón, champiñones, alcachofas y aceitunas',
        price: '$16.800',
        category: 'Pizzas Gourmet'
      },
      {
        id: '22-3',
        name: 'Pizza Diavola',
        description: 'Pizza picante con salami y chile',
        price: '$14.200',
        category: 'Pizzas Gourmet'
      },
      {
        id: '22-4',
        name: 'Pizza Burrata',
        description: 'Pizza con burrata fresca, tomate cherry y albahaca',
        price: '$17.500',
        category: 'Pizzas Gourmet'
      },
      {
        id: '22-5',
        name: 'Pizza Tartufo',
        description: 'Pizza con trufa negra, mozzarella y rúcula',
        price: '$18.000',
        category: 'Pizzas Gourmet'
      },
      {
        id: '22-6',
        name: 'Tiramisú Casero',
        description: 'Tiramisú tradicional con mascarpone italiano',
        price: '$6.500',
        category: 'Postres'
      }
    ],
    tags: ['Auténtica', 'Ingredientes Importados', 'Gourmet', 'Vinos Italianos'],
    reviewCount: 98,
    isOpen: true,
    location: {
      address: 'Av. 25 de Mayo 876, Resistencia',
      coordinates: { lat: -27.4486, lng: -58.9798 },
    },
    images: [
      'https://images.pexels.com/photos/1565986/pexels-photo-1565986.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1565987/pexels-photo-1565987.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1565988/pexels-photo-1565988.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Bar de Vinos', 'Reservas'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '7:00 PM - 11:00 PM',
      'Miércoles': '7:00 PM - 11:00 PM',
      'Jueves': '7:00 PM - 11:00 PM',
      'Viernes': '7:00 PM - 12:00 AM',
      'Sábado': '6:00 PM - 12:00 AM',
      'Domingo': '6:00 PM - 11:00 PM',
    },
  },
  {
    id: '29',
    title: 'Café Central',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.4,
    distance: '0.4 km',
    image: { uri: 'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Plaza 25 de Mayo 123, Resistencia',
    subtitle: 'Café histórico en el corazón de la ciudad con ambiente bohemio',
    phone: '+54 362 4456-7905',
    website: 'www.cafecentral.com',
    openingHours: 'Lun-Dom 7:00-23:00',
    priceRange: '$$',
    prices: {
      minPrice: 2000,
      maxPrice: 8000,
      currency: 'ARS',
      description: 'Cafés y pastelería entre $2.000 y $8.000'
    },
    menu: [
      {
        id: '23-1',
        name: 'Café Expresso',
        description: 'Café expresso italiano tradicional',
        price: '$2.500',
        category: 'Cafés'
      },
      {
        id: '23-2',
        name: 'Cappuccino Clásico',
        description: 'Cappuccino con leche espumada y cacao',
        price: '$3.800',
        category: 'Cafés'
      },
      {
        id: '23-3',
        name: 'Café con Leche',
        description: 'Café con leche caliente',
        price: '$3.200',
        category: 'Cafés'
      },
      {
        id: '23-4',
        name: 'Medialunas',
        description: 'Medialunas recién horneadas',
        price: '$2.800',
        category: 'Pastelería'
      },
      {
        id: '23-5',
        name: 'Tostado de Jamón y Queso',
        description: 'Tostado con jamón cocido y queso mozzarella',
        price: '$5.500',
        category: 'Sandwiches'
      },
      {
        id: '23-6',
        name: 'Té de la Tarde',
        description: 'Té con selección de pasteles caseros',
        price: '$7.500',
        category: 'Bebidas'
      }
    ],
    tags: ['Histórico', 'Bohemio', 'Plaza Central', 'Tradicional'],
    discount: '15% OFF',
    reviewCount: 234,
    isOpen: true,
    location: {
      address: 'Plaza 25 de Mayo 123, Resistencia',
      coordinates: { lat: -27.4480, lng: -58.9765 },
    },
    images: [
      'https://images.pexels.com/photos/941865/pexels-photo-941865.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941866/pexels-photo-941866.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941867/pexels-photo-941867.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Vista a la Plaza', 'Música en Vivo'],
    openingHoursDetailed: {
      'Lunes': '7:00 AM - 11:00 PM',
      'Martes': '7:00 AM - 11:00 PM',
      'Miércoles': '7:00 AM - 11:00 PM',
      'Jueves': '7:00 AM - 11:00 PM',
      'Viernes': '7:00 AM - 12:00 AM',
      'Sábado': '7:00 AM - 12:00 AM',
      'Domingo': '7:00 AM - 11:00 PM',
    },
  },
  {
    id: '30',
    title: 'Café de las Artes',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.6,
    distance: '1.2 km',
    image: { uri: 'https://images.pexels.com/photos/941868/pexels-photo-941868.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Sarmiento 456, Resistencia',
    subtitle: 'Café cultural con exposiciones de arte y música en vivo',
    phone: '+54 362 4456-7906',
    website: 'www.cafedelasartes.com',
    openingHours: 'Mar-Dom 16:00-01:00',
    priceRange: '$$',
    prices: {
      minPrice: 3000,
      maxPrice: 9000,
      currency: 'ARS',
      description: 'Cafés y bebidas entre $3.000 y $9.000'
    },
    menu: [
      {
        id: '24-1',
        name: 'Café de Especialidad',
        description: 'Café de origen único con métodos artesanales',
        price: '$4.500',
        category: 'Cafés de Especialidad'
      },
      {
        id: '24-2',
        name: 'Cold Brew',
        description: 'Café frío extraído lentamente por 24 horas',
        price: '$5.200',
        category: 'Cafés de Especialidad'
      },
      {
        id: '24-3',
        name: 'Café Turco',
        description: 'Café turco tradicional con especias',
        price: '$4.800',
        category: 'Cafés de Especialidad'
      },
      {
        id: '24-4',
        name: 'Tarta de Manzana',
        description: 'Tarta casera con manzanas y canela',
        price: '$4.200',
        category: 'Pastelería'
      },
      {
        id: '24-5',
        name: 'Sándwich Club',
        description: 'Sándwich con pollo, bacon, lechuga y tomate',
        price: '$6.800',
        category: 'Sandwiches'
      },
      {
        id: '24-6',
        name: 'Vino de la Casa',
        description: 'Copa de vino tinto o blanco de la casa',
        price: '$8.500',
        category: 'Bebidas'
      }
    ],
    tags: ['Cultural', 'Arte', 'Música en Vivo', 'Bohemio'],
    reviewCount: 167,
    isOpen: true,
    location: {
      address: 'Av. Sarmiento 456, Resistencia',
      coordinates: { lat: -27.4504, lng: -58.9928 },
    },
    images: [
      'https://images.pexels.com/photos/941868/pexels-photo-941868.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941870/pexels-photo-941870.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Exposiciones de Arte', 'Música en Vivo', 'Bar Completo'],
    openingHoursDetailed: {
      'Lunes': 'Cerrado',
      'Martes': '4:00 PM - 1:00 AM',
      'Miércoles': '4:00 PM - 1:00 AM',
      'Jueves': '4:00 PM - 1:00 AM',
      'Viernes': '4:00 PM - 2:00 AM',
      'Sábado': '3:00 PM - 2:00 AM',
      'Domingo': '3:00 PM - 12:00 AM',
    },
  },
  {
    id: '31',
    title: 'Heladería Los Sabores',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.2,
    distance: '1.7 km',
    image: { uri: 'https://images.pexels.com/photos/1352288/pexels-photo-1352288.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. Alberdi 789, Resistencia',
    subtitle: 'Heladería con más de 50 sabores diferentes y combinaciones únicas',
    phone: '+54 362 4456-7907',
    website: 'www.heladerialossabores.com',
    openingHours: 'Lun-Dom 11:00-22:00',
    priceRange: '$',
    prices: {
      minPrice: 1800,
      maxPrice: 4500,
      currency: 'ARS',
      description: 'Helados entre $1.800 y $4.500'
    },
    menu: [
      {
        id: '25-1',
        name: 'Helado de Limón',
        description: 'Helado refrescante de limón natural',
        price: '$2.200',
        category: 'Helados'
      },
      {
        id: '25-2',
        name: 'Helado de Menta',
        description: 'Helado de menta con chips de chocolate',
        price: '$2.500',
        category: 'Helados'
      },
      {
        id: '25-3',
        name: 'Helado de Coco',
        description: 'Helado de coco con ralladura de coco',
        price: '$2.300',
        category: 'Helados'
      },
      {
        id: '25-4',
        name: 'Helado de Maracuyá',
        description: 'Helado de maracuyá con semillas',
        price: '$2.400',
        category: 'Helados'
      },
      {
        id: '25-5',
        name: 'Copa Triple',
        description: 'Copa con tres sabores a elección',
        price: '$4.500',
        category: 'Copas Especiales'
      },
      {
        id: '25-6',
        name: 'Granizado de Frutilla',
        description: 'Granizado de frutilla con crema',
        price: '$2.000',
        category: 'Granizados'
      }
    ],
    tags: ['50 Sabores', 'Combinaciones', 'Variedad', 'Familiar'],
    discount: '20% OFF',
    reviewCount: 145,
    isOpen: true,
    location: {
      address: 'Av. Alberdi 789, Resistencia',
      coordinates: { lat: -27.4496, lng: -58.9882 },
    },
    images: [
      'https://images.pexels.com/photos/1352288/pexels-photo-1352288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352289/pexels-photo-1352289.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1352290/pexels-photo-1352290.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Take Away', 'Delivery', '50 Sabores', 'Ambiente Familiar'],
    openingHoursDetailed: {
      'Lunes': '11:00 AM - 10:00 PM',
      'Martes': '11:00 AM - 10:00 PM',
      'Miércoles': '11:00 AM - 10:00 PM',
      'Jueves': '11:00 AM - 10:00 PM',
      'Viernes': '11:00 AM - 11:00 PM',
      'Sábado': '10:00 AM - 11:00 PM',
      'Domingo': '10:00 AM - 10:00 PM',
    },
  },
  {
    id: '32',
    title: 'Pizzería El Horno',
    category: 'Italiana',
    categoryId: '2',
    rating: 4.3,
    distance: '1.4 km',
    image: { uri: 'https://images.pexels.com/photos/1565989/pexels-photo-1565989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 9 de Julio 234, Resistencia',
    subtitle: 'Pizza de horno de leña con masa fina y crujiente',
    phone: '+54 362 4456-7908',
    website: 'www.pizzeriadelhorno.com',
    openingHours: 'Lun-Dom 12:00-22:00',
    priceRange: '$$',
    prices: {
      minPrice: 3500,
      maxPrice: 10000,
      currency: 'ARS',
      description: 'Pizzas entre $3.500 y $10.000'
    },
    menu: [
      {
        id: '26-1',
        name: 'Pizza Margherita',
        description: 'Pizza clásica con tomate, mozzarella y albahaca',
        price: '$6.500',
        category: 'Pizzas Clásicas'
      },
      {
        id: '26-2',
        name: 'Pizza Napolitana',
        description: 'Pizza con mozzarella, jamón, tomate y orégano',
        price: '$7.800',
        category: 'Pizzas Clásicas'
      },
      {
        id: '26-3',
        name: 'Pizza Fugazzeta',
        description: 'Pizza con cebolla caramelizada y mozzarella',
        price: '$6.800',
        category: 'Pizzas Clásicas'
      },
      {
        id: '26-4',
        name: 'Pizza Calabresa',
        description: 'Pizza con salami picante y mozzarella',
        price: '$8.200',
        category: 'Pizzas Especiales'
      },
      {
        id: '26-5',
        name: 'Pizza Cuatro Quesos',
        description: 'Pizza con mozzarella, gorgonzola, parmesano y provolone',
        price: '$9.500',
        category: 'Pizzas Especiales'
      },
      {
        id: '26-6',
        name: 'Faina',
        description: 'Faina tradicional de garbanzos',
        price: '$2.500',
        category: 'Acompañamientos'
      }
    ],
    tags: ['Horno de Leña', 'Masa Fina', 'Crujiente', 'Tradicional'],
    discount: '25% OFF',
    reviewCount: 123,
    isOpen: true,
    location: {
      address: 'Av. 9 de Julio 234, Resistencia',
      coordinates: { lat: -27.4509, lng: -58.9858 },
    },
    images: [
      'https://images.pexels.com/photos/1565989/pexels-photo-1565989.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1565990/pexels-photo-1565990.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1565991/pexels-photo-1565991.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['Horno de Leña', 'Delivery', 'Take Away', 'Masa Fina'],
    openingHoursDetailed: {
      'Lunes': '12:00 PM - 10:00 PM',
      'Martes': '12:00 PM - 10:00 PM',
      'Miércoles': '12:00 PM - 10:00 PM',
      'Jueves': '12:00 PM - 10:00 PM',
      'Viernes': '12:00 PM - 11:00 PM',
      'Sábado': '11:00 AM - 11:00 PM',
      'Domingo': '11:00 AM - 10:00 PM',
    },
  },
  {
    id: '33',
    title: 'Café del Sol',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.5,
    distance: '0.6 km',
    image: { uri: 'https://images.pexels.com/photos/941871/pexels-photo-941871.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' },
    address: 'Av. 25 de Mayo 345, Resistencia',
    subtitle: 'Café con terraza y vista panorámica, perfecto para desayunos',
    phone: '+54 362 4456-7909',
    website: 'www.cafedelsol.com',
    openingHours: 'Lun-Dom 8:00-20:00',
    priceRange: '$$',
    prices: {
      minPrice: 2500,
      maxPrice: 7500,
      currency: 'ARS',
      description: 'Desayunos y cafés entre $2.500 y $7.500'
    },
    menu: [
      {
        id: '27-1',
        name: 'Desayuno Completo',
        description: 'Café, jugo de naranja, tostadas y mermelada',
        price: '$6.500',
        category: 'Desayunos'
      },
      {
        id: '27-2',
        name: 'Café Americano',
        description: 'Café negro con agua caliente',
        price: '$2.800',
        category: 'Cafés'
      },
      {
        id: '27-3',
        name: 'Latte Macchiato',
        description: 'Leche con shot de espresso',
        price: '$4.200',
        category: 'Cafés'
      },
      {
        id: '27-4',
        name: 'Croissant de Mantequilla',
        description: 'Croissant recién horneado',
        price: '$3.500',
        category: 'Pastelería'
      },
      {
        id: '27-5',
        name: 'Tostado de Aguacate',
        description: 'Tostado con aguacate, huevo y semillas',
        price: '$7.200',
        category: 'Sandwiches'
      },
      {
        id: '27-6',
        name: 'Smoothie de Frutas',
        description: 'Smoothie con frutas frescas y yogurt',
        price: '$5.800',
        category: 'Bebidas'
      }
    ],
    tags: ['Desayunos', 'Terraza', 'Vista Panorámica', 'Saludable'],
    discount: '10% OFF',
    reviewCount: 189,
    isOpen: true,
    location: {
      address: 'Av. 25 de Mayo 345, Resistencia',
      coordinates: { lat: -27.4484, lng: -58.9778 },
    },
    images: [
      'https://images.pexels.com/photos/941871/pexels-photo-941871.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941872/pexels-photo-941872.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/941873/pexels-photo-941873.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    amenities: ['WiFi', 'Terraza', 'Vista Panorámica', 'Desayunos'],
    openingHoursDetailed: {
      'Lunes': '8:00 AM - 8:00 PM',
      'Martes': '8:00 AM - 8:00 PM',
      'Miércoles': '8:00 AM - 8:00 PM',
      'Jueves': '8:00 AM - 8:00 PM',
      'Viernes': '8:00 AM - 8:00 PM',
      'Sábado': '8:00 AM - 8:00 PM',
      'Domingo': '8:00 AM - 8:00 PM',
    },
  }
];

export const getRestaurantsByCategory = (category: string): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.category === category);
};

export const getRestaurantsWithDiscount = (): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.discount);
};

export const getAllRestaurants = (): Restaurant[] => {
  return restaurants;
};

export const getRestaurantsByRating = (minRating: number): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.rating >= minRating);
};

export const getRestaurantsByDistance = (maxDistance: number): Restaurant[] => {
  return restaurants.filter(restaurant => {
    const distance = parseFloat(restaurant.distance?.replace('km', '') || '0');
    return distance <= maxDistance;
  });
};

export const getRestaurantsByPriceRange = (minPrice: number, maxPrice: number): Restaurant[] => {
  return restaurants.filter(restaurant => {
    const price = typeof restaurant.priceRange === 'number' ? restaurant.priceRange : 0;
    return price >= minPrice && price <= maxPrice;
  });
};

export const getRestaurantsByAmenity = (amenity: string): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.amenities?.includes(amenity)
  );
};

export const getFeaturedRestaurant = (): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.featured);
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getOpenRestaurants = (): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.isOpen);
}; 