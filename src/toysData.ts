import { Toy } from './Interfaces/Toy';
export const toysData: Record<number, Toy> = {
  1: {
    id: 1,
    name: 'Toy 1',
    description: 'Description for Toy 1',
    price: '10.00',
    imageUrl: 'toy1.jpg',
    feedback: [
      {
        text: 'Great toy!',
        author: 'John Doe',
        date: '2023-10-31',
      },
      {
        text: 'Awesome product!',
        author: 'Jane Smith',
        date: '2023-10-30',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Toy 2',
    description: 'Description for Toy 2',
    price: '15.00',
    imageUrl: 'toy2.jpg',
    feedback: [
      {
        text: 'Excellent choice!',
        author: 'Alice Johnson',
        date: '2023-10-29',
      },
    ],
  },
};
