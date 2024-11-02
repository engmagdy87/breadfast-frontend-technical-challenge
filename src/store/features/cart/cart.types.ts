export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type Cart = {
  data: CartItem[];
};
