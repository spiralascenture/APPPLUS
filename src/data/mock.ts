export interface Professional {
  id: string;
  name: string;
  profession: string;
  price: number;
  rating: number;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'teal' | 'pink';
  icon: string;
}

export const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Ana Silva',
    profession: 'Psicóloga',
    price: 200.00,
    rating: 5,
    color: 'blue',
    icon: '💬'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    profession: 'Nutricionista',
    price: 150.00,
    rating: 4,
    color: 'green',
    icon: '📈'
  },
  {
    id: '3',
    name: 'Maria Costa',
    profession: 'Terapeuta',
    price: 400.00,
    rating: 5,
    color: 'orange',
    icon: '🧘'
  },
  {
    id: '4',
    name: 'João Oliveira',
    profession: 'Personal Trainer',
    price: 120.00,
    rating: 4,
    color: 'purple',
    icon: '💪'
  },
  {
    id: '5',
    name: 'Lucia Ferreira',
    profession: 'Dermatologista',
    price: 300.00,
    rating: 5,
    color: 'teal',
    icon: '✨'
  },
  {
    id: '6',
    name: 'Pedro Almeida',
    profession: 'Fisioterapeuta',
    price: 180.00,
    rating: 4,
    color: 'pink',
    icon: '🏃'
  },
  {
    id: '7',
    name: 'Fernanda Lima',
    profession: 'Dentista',
    price: 250.00,
    rating: 5,
    color: 'blue',
    icon: '😁'
  },
  {
    id: '8',
    name: 'Ricardo Souza',
    profession: 'Cardiologista',
    price: 500.00,
    rating: 5,
    color: 'green',
    icon: '❤️'
  }
];