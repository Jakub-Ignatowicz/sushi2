export type Product = {
  id: string;
  name: string;
  imagePath: string;
  amountUnit: string;
  price: number;
  amount: number;
  categories: Category[];
  items: ProductItem[];
};

export type Category = {
  id: string;
  name: string;
};

export type ProductItem = {
  id: string;
  description: string;
  number: number;
  numberSuffix: string;
};

export type OrderProduct = {
  quantity: number;
  product: Product;
};

export type Order = {
  id: string;
  email: string;
  phoneNumber: string;
  address: Address;
  peopleCount: number;
  isDone: boolean;
  isNew: boolean;
  notes: string;
  createdAt: string;
  orderProducts: OrderProduct[];
};

export type Address = {
  id: string;
  city: string;
  district: string;
  street: string;
  homeNumber: string;
  apartmentNumber: string;
  floor: number | null;
};
