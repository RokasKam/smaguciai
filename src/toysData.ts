import { Toy } from './Interfaces/Toy';
export const toysData: Record<number, Toy> = {
  1: {
    id: 1,
    name: 'Toy 1',
    description: 'Description for Toy 1',
    price: '$10.00',
    imageUrl: 'toy1.jpg',
    feedback: [
      {
        id: 1,
        text: 'Great toy!',
        rating: 5,
        author: 'John Doe',
        date: '2023-10-31',
      },
      {
        id: 2,
        text: 'Awesome product!',
        rating: 4,
        author: 'Jane Smith',
        date: '2023-10-30',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Toy 2',
    description: 'Description for Toy 2',
    price: '$15.00',
    imageUrl: 'toy2.jpg',
    feedback: [
      {
        id: 3,
        text: 'Excellent choice!',
        rating: 5,
        author: 'Alice Johnson',
        date: '2023-10-29',
      },
    ],
  },
};
