import { Product } from "@/types/api";

type Props = {
  product: Product;
};

const ProductComponent = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={product.imagePath}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">
        {product.amount} {product.amountUnit}
      </p>
      <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
      <div className="flex flex-wrap gap-2">
        {product.categories.map((category) => (
          <span
            key={category.id}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
          >
            {category.name}
          </span>
        ))}
      </div>
      <ul className="list-disc pl-5 mt-2">
        {product.items.map((item) => (
          <li key={item.id}>
            {item.description} ({item.number} {item.numberSuffix})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;
