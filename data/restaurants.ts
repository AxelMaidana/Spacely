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
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VbZs6E3WcklBCaNE2i1EgyY5fhLUpuo-fQ&s' },
    featured: true,
    address: 'San lorenzo y Franklin, Resistencia',
    subtitle: 'Birra, amigos y buena vibra',
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
      address: 'San Lorenzo y Franklin, Resistencia',
      coordinates: { lat: -27.46097, lng: -58.98565 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-0n5gUbSj19pvzERW_RidGZ6K8IndVKBCA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy3MroiyEGZJrxC8ePlFdBddb54H6KNGWl9A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbpPWmElbHraEKJkT84nJXA3tPMYN5DDGlHQ&s',
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
    category: 'Resto Bars',
    categoryId: '7',
    rating: 4.4,
    distance: '1.2 km',
    image: { uri: 'https://esa-cdn.carta.menu/storage/media/company_images/78715781/conversions/thumbnail.jpg' },
    address: 'Arturo illia 81, Resistencia',
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
      address: 'Arturo Illia 81, Resistencia',
      coordinates: { lat: -27.45315, lng: -58.98752 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtNC-KwuCqboyCq0zLHqyzU6W-u-_uTwPsg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNloESV1C88frwC5iQNb7bgNEqrQoH9IrrGg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjFIvtes95iol_-xnCqTHBHvpGx5NnOYuL-g&s',
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
    title: 'Foodie bar',
    category: 'Resto Bar',
    categoryId: '12',
    rating: 4.7,
    distance: '0.9 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfYsdxrrBnIu2M_FM_hJHmCwji8jsIdetu8w&s' },
    address: 'Liniers 244, Resistencia',
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
      address: 'Liniers 244, Resistencia',
      coordinates: { lat: -27.44605, lng: -58.98778 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfYsdxrrBnIu2M_FM_hJHmCwji8jsIdetu8w&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhnrbNPQtr4UaVm0mNhFQa1CvQ57FTLN6jWg&s',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/58/76/91/las-mejores-burgers-de.jpg?w=900&h=500&s=1',
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
    title: 'Nanas suena bien',
    category: 'Resto bar',
    categoryId: '13',
    rating: 4.5,
    distance: '1.5 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE92u0Q3B7N1HiFxTQdhhlDNV7KkggGWQ7LA&s' },
    address: 'Av. Paraguay 48, Resistencia',
    subtitle: 'Sabores que abrazan al alma, nanas suena bien siempre!',
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
      address: 'Av. Paraguay 48, Resistencia',
      coordinates: { lat: -27.44769, lng: -58.98182 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrD3mHexwnxSbflYZD53t1NvTmaJpVUjjdQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRErauasa4u7BVYHoLYJlLMJfwf0tFAzIPC1g&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeoN_bZZqRh8Cr5IksX6ewLqmySb_Ug2FPhw&s',
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
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsbSgiM2W8w9E2C01p1XC6cXsY09NldZH7w&s' },
    address: 'Guemes 183, Resistencia',
    subtitle: 'Mas que cafe, una experiencia',
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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUpoRHBYnQqtb_MieQFrOxgBAAOZVmS3vLfw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNh81SopylLuPlpbbXSzj5nahHYUWzUD8F7w&s',
      'https://puntoclick.com.ar/storage/google-places/662b6bea0610f.jpg',
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
    address: 'Av. Paraguay 112, Resistencia',
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
      coordinates: { lat: -27.44821, lng: -58.98129 },
    },
    images: [
      'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDBSxwxLpvUi_oGCyG9XOf4_O4YqWFUQ2fUQ&s',
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
    category: 'Cafeteria',
    categoryId: '14',
    rating: 4.5,
    distance: '1.1 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSKoUnZ_mn6wpPXRsrJYt-xKKHFWBMv1zDnw&s' },
    address: 'C.French 354, Resistencia',
    subtitle: 'cafes con almas para compartir',
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
      address: 'C.French 354, Resistencia',
      coordinates: { lat: -27.45132, lng: -58.97992 },
    },
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Caffe_Latte_cup.jpg/1200px-Caffe_Latte_cup.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQywwegR2QpGhYTbRYm8GUuWYpPDIoYTDMPzg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9o4yI91dp3A1OOIbPd-WAhAJ7GJi1-3Wz_Q&s',
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
    title: 'BREWS',
    category: 'Bar',
    categoryId: '15',
    rating: 4.3,
    distance: '0.6 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPbxnnkytYWASd7su337g619mwVuq4r0dJ8A&s' },
    address: 'Av. Paraguay 24, Resistencia',
    subtitle: 'Bar con variedad en bebidas y musica',
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
      address: 'Av. Paraguay 24, Resistencia',
      coordinates: { lat: -27.44742, lng: -58.98207 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YuUBFIB1nQZ5BhFqdpXZ-nF22wIlgJhnYw&s',
      'https://chacourbano.com.ar/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-01-at-08.55.37-1.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8B7V2Zsh7uUojbCVJAOAaAahrw2kLg5rIg&s',
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
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv7sPQYUPVbMfZah_gDFvJ9lPuiP6d-A0r8w&s' },
    address: 'Guemes 695, Resistencia',
    subtitle: 'Resto-bar con gastronomía variada',
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
      address: 'Guemes 695, Resistencia',
      coordinates: { lat: -27.44633, lng: -58.97976 },
    },
    images: [
      'https://media-cdn.tripadvisor.com/media/photo-s/09/9d/6b/a6/la-biela-resto-bar.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qT9J8rpULnFARgjKCyAPxzT3Fy5aRZOnDg&s',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/39/a8/2c/pizzas.jpg?w=900&h=500&s=1',
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
    title: 'Kharma bar',
    category: 'Gastronómico',
    categoryId: '16',
    rating: 4.7,
    distance: '1.0 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeuPFzqh-EIHlBhUTUmHySt2VEKWdwdr3F9Q&s' },
    address: 'Pellegrini 321, Resistencia',
    subtitle: 'Bar gastronómico con lo mejor en bebidas y comidas',
    phone: '+54 362 4456-7893',
    website: 'www.kharmaBar.com',
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
      address: 'Pellegrini 321, Resistencia',
      coordinates: { lat: -27.45001, lng: -58.98203 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4NRUBrILuni9Mbews2Z7giQuQRgfHeh77wQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9D5maXsGdde-WvIc9E9ApFG7YUbjMyx7-og&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM3etY7PZTF22jeieFQ_qFs3xTzB6l8f-VA&s',
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
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdJ3L1Bu4HWpaZHyNDQgQ6oOjVho2__tLBpg&s' },
    address: 'Av. Sarmiento 410, Resistencia',
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
      address: 'Av. Sarmiento 410, Resistencia',
      coordinates: { lat: -27.44792, lng: -58.98280 },
    },
    images: [
      'https://www.nestleprofessional.es/sites/default/files/styles/np_article_small/public/2023-09/consejos-para-baristas-control-d.png?itok=lXj76RA-',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlepRmKbUHeO39YjQuFcxEHdd4LSZv-tFKYQ&s',
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
    title: 'Bacanal Street Food',
    category: 'Americana',
    categoryId: '1',
    rating: 4.3,
    distance: '0.8 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReW5j1UdhOtbWE-f3s7rO1aSDERkOqaVc8nQ&s' },
    address: 'C.French 683, Resistencia',
    subtitle: 'Las mejores hamburguesas con ingredientes premium',
    phone: '+54 362 4456-7890',
    website: 'www.bacanal.com',
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
      address: 'C.French 683, Resistencia',
      coordinates: { lat: -27.44871, lng: -58.97721 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-T89nWmEeEztBlBzV8EFH6b8HYg9OcjxAUQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RigH-3Xm4H6F5qwOvvSw65Hf724E8Kgjqg&s',
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
    title: 'Luccianos Resistencia',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.4,
    distance: '0.7 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmLUaGf8DXaqvtms4e9h9q3yRwirhhuUNiPw&s' },
    address: 'Av. Paraguay 138, Resistencia',
    subtitle: 'Helados con sabores únicos y naturales',
    phone: '+54 362 4789-0123',
    website: 'www.lucianoss.com',
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
      address: 'Av. Paraguay 138, Resistencia',
      coordinates: { lat: -27.44829, lng: -58.98112 },
    },
    images: [
      'https://infonegocios.info/content/images/2022/07/22/248537/conversions/luccianos-resistencia-plus-medium-size.jpg',
      'https://godiamo.com.ar/wp-content/uploads/2024/01/LuccianosResistencia_Helados.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTklqg9sv9bMXlale6lE5FnjsnvGg4zYcnF6w&s',
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
    title: 'Lo De Lis',
    category: 'Vegetariana',
    categoryId: '5',
    rating: 4.6,
    distance: '1.3 km',
    image: { uri: 'https://media-cdn.tripadvisor.com/media/photo-s/04/b7/79/7e/mun-casarena-winery-vineyards.jpg' },
    address: 'Monteagudo 484, Resistencia',
    subtitle: 'Buen gusto,buena compañia',
    phone: '+54 362 4456-7891',
    website: 'www.LodeLisfood.com',
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
      address: 'Monteagudo 484, Resistencia',
      coordinates: { lat: -27.45210, lng: -58.97708 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmMqeezlZrSyCLjudF2GOcvP807drFTOeog&s',
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
    title: 'Piacepiu',
    category: 'Postres',
    categoryId: '8',
    rating: 4.5,
    distance: '0.6 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4X-Y8PgWngGbqJUNH1PLwL-J9uk9hWyhx3g&s' },
    address: 'C.Pellegrini 98, Resistencia',
    subtitle: 'Lo mejor en helados artesanales',
    phone: '+54 362 4456-7892',
    website: 'www.piacepiu.com',
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
      address: 'C.Pellegrini 98, Resistencia',
      coordinates: { lat: -27.45188, lng: -58.98397 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCb5XoW9FE3xAfbIPhkX9sU8SvRSy7y2vV8g&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcioJ6_GGKlJy1I-HXel8EAeBGGwNL1tGqw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYalb27j-2QjYmKrmvwLEAzN5FwcG7wegiw&s',
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
    title: 'La Bianca',
    category: 'Italiana',
    categoryId: '2',
    rating: 4.7,
    distance: '1.4 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFsiut8jjw2-AHP6r8X6fMhxiA7K02boqqKA&s' },
    address: 'Colon 102, Resistencia',
    subtitle: 'Los mejores platos los encontras en La Bianca',
    phone: '+54 362 4456-7893',
    website: 'www.labianca.com',
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
      address: 'Colon 102, Resistencia',
      coordinates: { lat: -27.45491, lng: -58.98415 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI24rQ4lXbGhma10CVFgYm5hbq0Bbl8wvycQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Ot8nPZKl_VpL31BfhdUWAGlXliRzcslF6A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtTm9V_m9ScA2Wx9j60k7U82OqIZdMn58s9A&s',
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
    title: 'La casa de Pilu',
    category: 'Resto bars',
    categoryId: '10',
    rating: 4.8,
    distance: '0.9 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9MLz8hJan8lmEexB5BHfytoENxKN1L7f5vA&s' },
    address: 'C.Pellegrini 477, Resistencia',
    subtitle: 'La mejor gastronomia para compartir con familia y amigos',
    phone: '+54 362 4123-4568',
    website: 'www.LaCasadePilu.com',
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
      address: 'C.Pellegrini 477, Resistencia',
      coordinates: { lat: -27.44874, lng: -58.98074 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40l5dlHSK8EDzWNjKdT3tMeH_XFGVS-YXaQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_fPKWHGEZ_idm1NW1W2GIbxHx9c8ns4TKw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07K1Ihw2cM7f5hrWOmEgRdkwsQAUoH4QT1A&s',
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
    title: 'Catalino bar',
    category: 'Resto bar',
    categoryId: '10',
    rating: 4.6,
    distance: '1.1 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRqL-yqDJzwt8tHCJrU6w1cJl5RknWMgfLg&s' },
    address: 'Av. Velez Sarsfield 225, Resistencia',
    subtitle: 'Las mejores comidas en tan solo minutos',
    phone: '+54 362 4456-7894',
    website: 'www.catalinoBar.com',
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
      address: 'Av. Velez Sarsfield 225, Resistencia',
      coordinates: { lat: -27.45531, lng: -58.97714 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMiV-PBd_PE9jE80uSsOgZH9s3HARvigqxQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8KZiJz7TX01VkKMepw6Td6xMw5u70Ts4qQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboQGUT3pEkFOQZWBr4Q5JhqhdJpFVH8-b3g&s',
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
    title: 'El Surtidor',
    category: 'Restaurante',
    categoryId: '10',
    rating: 4.7,
    distance: '1.5 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPw0jEuR9GkcyCy-5WPJvlrbR3b0unCy5acA&s' },
    address: 'French y Don Bosco, Resistencia',
    subtitle: 'el mejor lugar para reunirse a tomar y beber',
    phone: '+54 362 4456-7895',
    website: 'www.Elsurtidor.com',
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
      address: 'French y Don Bosco, Resistencia',
      coordinates: { lat: -27.45192, lng: -58.98017 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqctPSRXcDBl2iM62YS4bbf4JfuNUy4aJdw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMOsPP6PKt8y3on2e7M_zS6b3h2FOXtqA1Q&ss',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5_-OVjh0AT0VK3DhZXncSrgK0ngBcrr4TA&s',
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
    title: 'Todo Rico',
    category: 'Hamburgueseria',
    categoryId: '10',
    rating: 4.5,
    distance: '0.7 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-f1FwBmFbAeNLRdl8dMh_EMxQDLPGVBjbOg&s' },
    address: 'Hipolito Yrigoyen 269, Resistencia',
    subtitle: 'No te podes perder estas hamburguesas',
    phone: '+54 362 4456-7896',
    website: 'www.TodoRico.com',
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
      address: 'Hipolito Yrigoyen 269 , Resistencia',
      coordinates: { lat: -27.45172, lng: -58.98309 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROCw_CdMYT5LnfwN_dqnu7KhB1lgbmG9ypQg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBuelo4DhtVKzfz_zH061pKp-T0XDxfELbg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyXN8jq5q-5oCLNdVAz-kcE7Wt5qpvZWkZ9Q&s',
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
    title: 'BURGUER INC',
    category: 'Hamburgueseria',
    categoryId: '10',
    rating: 4.4,
    distance: '1.8 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXu8uJ7A2mmnz_FLtNIeI1GR7lxKnO1DVCkw&s' },
    address: 'Av. San Martin 75, Resistencia',
    subtitle: 'La fabrica de hamburguesas mas buenas de la ciudad',
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
      address: 'Av. San Martin 75, Resistencia',
      coordinates: { lat: -27.45546, lng: -58.98255 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlWcKZ7JIz1nu9n21v_Ozo4WpBpOMeos_kg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoNk2ooR7M-ibQRlIK7hfJIoucg8quSX0IBQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrTyDmNe72PFr_ivFVTYXCPxKa9_ifZoXE0A&s',
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
    title: 'Burger Queen',
    category: 'Hamburgueseria',
    categoryId: '10',
    rating: 4.6,
    distance: '1.2 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkBuIaby6GvU1XVhU49q6o7kS8Mv9bAWuC9g&s' },
    address: 'C. Remedios de Escalada 226, Resistencia',
    subtitle: 'La reina de las hamburguesas llego para quedarse',
    phone: '+54 362 4456-7898',
    website: 'www.burgerqueen.com',
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
      address: 'C. Remedios de Escalada 226, Resistencia',
      coordinates: { lat: -27.44705, lng: -58.98701 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0H6HFAu3lMv6BR915iejd5PEgXUMsWD6o0Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhn3EARk5GTxWT7T-m6sjHkkvB5Ku2zUhwA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYyCvQNZvzQUF7khFO1ty4ziA-Qu2uVueicA&s',
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
    title: 'Pizza Ya',
    category: 'Pizzeria',
    categoryId: '10',
    rating: 4.3,
    distance: '2.0 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0z7obPi5bMPcoeJ3ctsTi2SgYYDVEHNANgA&s' },
    address: 'Av. Rivadavia 128',
    subtitle: 'La mejor atencion y los mejores precios',
    phone: '+54 362 4456-7899',
    website: 'www.PizzaYa.com',
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
      address: 'Av. Rivadavia 128, Resistencia',
      coordinates: { lat: -27.44596, lng: -58.98318 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWGoj03FwZf9KD47dP_hkXtcmacHHwdM8Iiw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYbAyAekZNfHPwdMSDdcaE7d_7u5KPI2DjHw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnJBcuvxG1uR8_AbDhQGErBSt4-6G7885-xQ&s',
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
    title: 'La Merced',
    category: 'Pizzeria',
    categoryId: '10',
    rating: 4.7,
    distance: '1.6 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRE-2SBCt5UXU6vh7gJS2WNLwQCaKdMFwQfQ&s' },
    address: 'Necochea 199, Resistencia',
    subtitle: 'La mejor opcion para almorzar o cenar',
    phone: '+54 362 4456-7900',
    website: 'www.LaMerced.com',
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
      address: 'Necochea 199, Resistencia',
      coordinates: { lat: -27.45023, lng: -58.99065 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6EP7k5GWcV_mH3X8a8awebyO5gPnvcrXQ6w&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmULGx9dXF6A3D0Y9AtM8ENSYdFnV_mesD4g&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQhKmn4fVGMBO_aneIXP0ju4hpOrDlUdoEg&s',
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
    title: 'Luigi heladeria',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.3,
    distance: '1.3 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIh7CqUHUdcls0CA2OQ6NT51GMwGfYHk9B1A&s' },
    address: 'Av Sarmiento y Marcelo T.de Alvear, Resistencia',
    subtitle: 'Heladería con sabores tradicionales y caseros',
    phone: '+54 362 4456-7901',
    website: 'www.LuigiHeladeria.com',
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
      address: 'Av. Sarmiento y Marcelo T. de Alvear, Resistencia',
      coordinates: { lat: -27.44991, lng: -58.98565 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE3d2stbTlO-9qZxqdk2fMocZWEmLCvXY-Gg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvw9rQ5nvSySkh1nQEKp-YbBI3MXPfWJz-PA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9gPbTtJF22_t6jVLf-sKD4jjrXxv-wDjquw&s',
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
    title: 'Grido',
    category: 'Heladerías',
    categoryId: '6',
    rating: 4.6,
    distance: '0.9 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToUPWlkEU07ydlO3PjqrXGSUODCxGKpQwWug&s' },
    address: 'Av. 9 de Julio 779, Resistencia',
    subtitle: 'Grido, sabores unicos para momentos unicos',
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
      address: 'Av. 9 de Julio 779, Resistencia',
      coordinates: { lat: -27.45667, lng: -58.97982 },
    },
    images: [
      'https://images.rappi.com.ar/restaurants_background/portada_grido_1-1749310788537.png',
      'https://media-cdn.tripadvisor.com/media/photo-s/1c/64/90/f7/bombon-escoces-llevalo.jpg',
      'https://media-cdn.tripadvisor.com/media/photo-s/1c/64/91/01/cucuruchos-y-capelinas.jpg',
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
    title: 'BIG PIZZA',
    category: 'Pizzeria',
    categoryId: '2',
    rating: 4.5,
    distance: '1.1 km',
    image: { uri: 'https://pedidosya.dhmedia.io/image/pedidosya/restaurants/big-pizza-quilmes.jpg' },
    address: 'Arturo Illia 325, Resistencia',
    subtitle: 'Pizza con masa gruesa y sabores intensos',
    phone: '+54 362 4456-7903',
    website: 'www.BigPizza.com',
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
      address: 'Arutro Illia 325, Resistencia',
      coordinates: { lat: -27.45507, lng: -58.98530 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJpgUp28uwfENDlFZUmbbMy2OJ5YDXrvdvPg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPAq5JJWg-UTxQfCHAxTv2LYNGrcDUsvyrMQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DZMwRuNOsTdCL_4_UqYnxibX-MC0dYkDyA&s',
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
    title: 'CIAO!',
    category: 'Pizzeria',
    categoryId: '2',
    rating: 4.7,
    distance: '0.8 km',
    image: { uri: 'https://images.rappi.com.ar/restaurants_logo/213554-1686262482798.png?e=webp&d=10x10&q=10' },
    address: 'Arbo y Blanco 324, Resistencia',
    subtitle: 'Pizza auténtica con ingredientes importados',
    phone: '+54 362 4456-7904',
    website: 'www.Ciaopizzeria.com',
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
      address: 'Arbo y blanco 324, Resistencia',
      coordinates: { lat: -27.45785, lng: -58.98426 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPqa6JYCGLBol_Wth9Pq6Gb5O7HupWkfI9ig&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvc6bM92rOWbU3kLhN5UyB3KZg8P7rkgI2NA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWlh99yXxi9yHoOHM-8okWRd1NBdAz_gR0Tw&s',
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
    title: 'Café Martinez',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.4,
    distance: '0.4 km',
    image: { uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/a9/e6/87/renovaron-el-salon-para.jpg?w=900&h=500&s=1' },
    address: 'Güemes 425, Resistencia',
    subtitle: 'Tu pausa ideal, todos los dias',
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
      address: 'Güemes 425, Resistencia',
      coordinates: { lat: -27.44833, lng: -58.98194 },
    },
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/a9/e6/87/renovaron-el-salon-para.jpg?w=900&h=500&s=1',
      'https://media-cdn.tripadvisor.com/media/photo-s/10/0c/46/87/desayuno.jpg',
      'https://esa-cdn.carta.menu/storage/media/company_gallery/82138584/conversions/contribution_gallery.jpg',
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
    title: 'Serafin Cafe de especialidad',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.6,
    distance: '1.2 km',
    image: { uri: 'https://cafedeespecialidad.info/wp-content/uploads/2023/11/AF1QipOgTdtr2TXBEha1cZ15X3CDV0oa5B1ZWdM5z8DUw426-h240-k-no.jpeg' },
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
      coordinates: { lat: -27.44838, lng: -58.98330 },
    },
    images: [
      'https://cafedeespecialidad.info/wp-content/uploads/2023/11/AF1QipOgTdtr2TXBEha1cZ15X3CDV0oa5B1ZWdM5z8DUw426-h240-k-no.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2QHqr8VYw0dEmPGwjECeB31aNCrWJf1kymA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg7S4KKLty4Cf20GX5ZVkoPTI7hdj8YT78XQ&s',
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
    title: 'Freddo',
    category: 'Heladería',
    categoryId: '6',
    rating: 4.2,
    distance: '1.7 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrCDTO9_-TDW9cz7VkmlIQSuOBCAstGCAS6Q&s' },
    address: 'Guemes 410, Resistencia',
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
      address: 'Guemes 410, Resistencia',
      coordinates: { lat: -27.44844, lng: -58.98177 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkC7XZbbcXP1Psm8E9Ko1mPs9IoJgD8E8wA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqBZ5DVEbxPgznASYSYDeVy6yplizaal70A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQXnzhnWKlMVQ7WhHP22cEE5ynJ5HdNSqyA&s',
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
    title: 'Pizzería 4Hermanos',
    category: 'Pizzeria',
    categoryId: '2',
    rating: 4.3,
    distance: '1.4 km',
    image: { uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/7b/5d/95/pizzeria-los-campeones.jpg?w=900&h=500&s=1' },
    address: 'Pueyrredon 400, Resistencia',
    subtitle: 'Pizza de horno de leña con masa fina y crujiente',
    phone: '+54 362 4456-7908',
    website: 'www.pizzeria4Hermanos.com',
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
      address: 'Pueyrredon 400, Resistencia',
      coordinates: { lat: -27.44634, lng: -58.98457 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tzpeVDIe9WdBczbJawzOcwVbIXp_4xO4hA&s',
      'https://i.argentino.com.ar/images/2023/0322/1598765-pizzeria-4-hermanos-20230322063552606.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCN6eV5Lz78zdlsnBhtZv5p8Da-X5bfFqfg&s',
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
    title: 'Amore mio',
    category: 'Cafeterías',
    categoryId: '7',
    rating: 4.5,
    distance: '0.6 km',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNCfNnrNoShVat-it0i-GtH7A80NyCvgmmSg&s' },
    address: 'Almte.Brown 101, Resistencia',
    subtitle: 'Perfecto lugar para desayunos y meriendas',
    phone: '+54 362 4456-7909',
    website: 'www.AmoreMio.com',
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
      address: 'Almte Brown 101, Resistencia',
      coordinates: { lat: -27.45016, lng: -58.98376 },
    },
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwPqm2OlXv0YQXI6YVXUTIdXTMASjlqDNCw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPBMHiZmrfN1b00V-m90n8gNXXp3kDnbh4A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNCfNnrNoShVat-it0i-GtH7A80NyCvgmmSg&s',
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