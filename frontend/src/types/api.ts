export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  isFeatured?: boolean;
  amount?: number;
  amountUnit?: string;
  description?: string;
  categories: Category[];
  category: Category;
  items: ProductItem[];
  fakePath?: string; // Used for previewing products without an image
};

export type CategoryPost = {
  name: string;
  description?: string;
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
};

export type OrderProduct = {
  quantity: number;
  product: Product;
};

export enum PaymentMethod {
  Cash = 0,
  Cash2 = 1,
}

export enum OrderStatus {
  Pending = 0,
  Preparing = 1,
  Completed = 2,
  Cancelled = 3,
}

export function paymentMethodToString(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.Cash:
      return "Gotówka";
    case PaymentMethod.Cash2:
      return "Gotówka 2";
    default:
      return "Nieznana metoda płatności";
  }
}

export function orderStatusToString(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "Oczekujące";
    case OrderStatus.Preparing:
      return "W przygotowaniu";
    case OrderStatus.Completed:
      return "Zakończone";
    case OrderStatus.Cancelled:
      return "Anulowane";
    default:
      return "Nieznany status";
  }
}

export type Order = {
  id: string;
  address: Address;
  peopleCount: number;
  notes: string;
  createdAt: Date;
  orderProducts: OrderProduct[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  user: User;
};

export type PostOrder = {
  peopleCount: number;
  notes: string;
  paymentMethod: number;
  addressId: string;
  userId: string;
  orderProducts: { productId: string; quantity: number }[];
};

export type PostOrderWithAddress = {
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
  floor?: number | null;
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
  createdAt: Date;
  type: "Admin" | "Regular" | "Guest";
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
