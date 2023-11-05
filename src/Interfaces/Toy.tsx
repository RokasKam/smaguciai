export type Toy = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  feedback: Feedback[];
};

export type Feedback = {
  id: number
  text: string;
  rating: number
  author: string;
  date: string;
};
