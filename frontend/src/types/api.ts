export type Product = {
  id: string;
  name: string;
  price: number;
  imageName?: string;
  isFeatured?: boolean;
  amount?: number;
  amountUnit?: string;
  description?: string;
  categories: Category[];
  items: ProductItem[];
  fakePath?: string; // Used for previewing products without an image
};

export type Category = {
  id: string;
  name: string;
  orderIndex: number;
  description?: string;
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
  address: Address;
  peopleCount: number;
  isDone: boolean;
  isNew: boolean;
  notes: string;
  createdAt: Date;
  orderProducts: OrderProduct[];
  totalPrice: number;
  paymentMethod: number;
  user: User;
};

export type PostOrder = {
  peopleCount: number;
  notes: string;
  paymentMethod: number;
  address: PostAddress;
  userId: string;
  orderProducts: { productId: string; quantity: number }[];
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

export type PostAddress = {
  city: string;
  district: string;
  street: string;
  homeNumber: string;
  apartmentNumber: string;
  floor: number | null;
};

export type User = {
  id: string;
  email?: string | null;
  phoneNumber?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  createdAt: string;
  // role: UserRole;
};

export type PostUser = {
  normal?: {
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  guest?: {
    phoneNumber: string;
    email: string;
  };
};

export type ErrorResponse = {
  status: number;
  errors: string[];
};
