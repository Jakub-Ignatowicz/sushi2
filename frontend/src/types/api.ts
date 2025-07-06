export type Product = {
  id: string;
  name: string;
  price: number;
  imageName?: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
  amount?: number;
  amountUnit?: string;
  description?: string;
  categories: Category[];
  category: Category;
  items: ProductItem[];
  fakePath?: string;
};

export type ProductPost = {
  name: string;
  price: number;
  imageName?: string;
  amount?: number;
  amountUnit?: string;
  description?: string;
  categoryId: string;
  items: ProductItem[];
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
  quantity: number;
};

export type OrderProduct = {
  quantity: number;
  product: Product;
};

export enum PaymentMethod {
  Cash = 0,
}

export enum OrderStatus {
  Pending = 0,
  Preparing = 1,
  Completed = 2,
  Cancelled = 3,
}

export function paymentMethodToString(method?: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.Cash:
      return "Gotówka";
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

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type Order = {
  id: string;
  email: string;
  phoneNumber: string;
  address: Address;
  peopleCount: number;
  notes: string;
  createdAt: Date;
  orderProducts: OrderProduct[];
  totalCost: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
};

export type OrderPost = {
  peopleCount: number;
  email: string;
  phoneNumber: string;
  notes: string;
  paymentMethod: number;
  address: AddressPost;
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

export type AddressPost = {
  city: string;
  district: string;
  street: string;
  homeNumber: string;
  apartmentNumber: string | null;
  floor: number | null;
};

export type ErrorResponse = {
  status: number;
  errors: string[];
};

export type ImageUploadResponse = {
  fileName: string;
  url: string;
};
