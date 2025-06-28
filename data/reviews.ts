export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: '1',
    restaurantId: '1',
    userName: 'María González',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Excelente restaurante! La comida regional es auténtica y deliciosa. El servicio fue muy amable y el ambiente es acogedor. Definitivamente volveré.',
    date: 'Hace 2 días',
    helpful: 12
  },
  {
    id: '2',
    restaurantId: '1',
    userName: 'Carlos Rodríguez',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Muy buena experiencia. Los platos están bien preparados y las porciones son generosas. El precio es justo para la calidad.',
    date: 'Hace 1 semana',
    helpful: 8
  },
  {
    id: '3',
    restaurantId: '1',
    userName: 'Ana Martínez',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Increíble lugar! La terraza tiene una vista hermosa y la comida es espectacular. Recomiendo el locro, está perfecto.',
    date: 'Hace 3 días',
    helpful: 15
  },
  {
    id: '4',
    restaurantId: '2',
    userName: 'Luis Fernández',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Las mejores empanadas que he probado en Resistencia. La masa es perfecta y el relleno muy sabroso.',
    date: 'Hace 5 días',
    helpful: 6
  },
  {
    id: '5',
    restaurantId: '2',
    userName: 'Sofía López',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Ambiente familiar y comida casera. El choripán es espectacular y el precio muy accesible.',
    date: 'Hace 1 día',
    helpful: 9
  },
  {
    id: '6',
    restaurantId: '3',
    userName: 'Diego Pérez',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Sushi fresco y bien preparado. El ambiente es elegante y el servicio muy profesional.',
    date: 'Hace 4 días',
    helpful: 7
  },
  {
    id: '7',
    restaurantId: '4',
    userName: 'Valentina Silva',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Pizza artesanal italiana auténtica. El horno de leña le da un sabor único. Muy recomendable!',
    date: 'Hace 2 días',
    helpful: 11
  },
  {
    id: '8',
    restaurantId: '5',
    userName: 'Roberto Torres',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Café de especialidad excelente. La pastelería es artesanal y deliciosa. Vista al río muy bonita.',
    date: 'Hace 1 semana',
    helpful: 5
  },
  {
    id: '9',
    restaurantId: '6',
    userName: 'Camila Ruiz',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Hamburguesas gourmet muy sabrosas. Las papas están perfectas y los milkshakes son deliciosos.',
    date: 'Hace 3 días',
    helpful: 8
  },
  {
    id: '10',
    restaurantId: '7',
    userName: 'Javier Morales',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Helados artesanales con sabores únicos. El chocolate amargo es mi favorito. Muy buena atención.',
    date: 'Hace 1 día',
    helpful: 13
  },
  {
    id: '11',
    restaurantId: '8',
    userName: 'Lucía Herrera',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Comida vegetariana gourmet muy bien preparada. Las opciones sin gluten son excelentes.',
    date: 'Hace 5 días',
    helpful: 6
  },
  {
    id: '12',
    restaurantId: '9',
    userName: 'Miguel Castro',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Postres artesanales espectaculares. La pastelería francesa está perfecta. Muy recomendable para dulces.',
    date: 'Hace 2 días',
    helpful: 10
  },
  {
    id: '13',
    restaurantId: '10',
    userName: 'Isabella Vargas',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Pasta fresca artesanal con salsas tradicionales. El ambiente es romántico y acogedor.',
    date: 'Hace 1 semana',
    helpful: 7
  },
  {
    id: '14',
    restaurantId: '11',
    userName: 'Andrés Mendoza',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Bodegón tradicional con las mejores empanadas del Chaco. El locro es espectacular y el ambiente muy familiar.',
    date: 'Hace 3 días',
    helpful: 14
  },
  {
    id: '15',
    restaurantId: '12',
    userName: 'Daniela Ríos',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Bodegón de esquina con comida casera deliciosa. Las milanesas están perfectas y el precio muy accesible.',
    date: 'Hace 1 día',
    helpful: 9
  }
];

export const getReviewsByRestaurantId = (restaurantId: string): Review[] => {
  return reviews.filter(review => review.restaurantId === restaurantId);
};

export const getAverageRating = (restaurantId: string): number => {
  const restaurantReviews = getReviewsByRestaurantId(restaurantId);
  if (restaurantReviews.length === 0) return 0;
  
  const totalRating = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / restaurantReviews.length) * 10) / 10;
}; 