export type Product = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  isVisible: boolean;
  imagePath: string;
  amount: number;
  amountUnit: string;
  productItems?: [
    {
      id: string;
      description: string;
      number: number;
      numberSuffix: string;
    },
  ];
};
