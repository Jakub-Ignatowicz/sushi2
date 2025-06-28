import {
  Order,
  OrderStatus as OrderStatusEnum,
  orderStatusToString,
} from "@/types/api";

type Props = {
  order: Order;
};

export default function OrderStatus({ order }: Props) {
  const status = order.status;
  const statusName = orderStatusToString(status);
  let color;

  const statusColors = {
    [OrderStatusEnum.Pending]: {
      light: "bg-yellow-500",
      dark: "dark:bg-yellow-400",
    },
    [OrderStatusEnum.Preparing]: {
      light: "bg-blue-500",
      dark: "dark:bg-blue-400",
    },
    [OrderStatusEnum.Completed]: {
      light: "bg-green-500",
      dark: "dark:bg-green-400",
    },
    [OrderStatusEnum.Cancelled]: {
      light: "bg-red-500",
      dark: "dark:bg-red-400",
    },
  };

  const { light, dark } = statusColors[order.status] || {
    light: "bg-gray-500",
    dark: "dark:bg-gray-400",
  };

  return (
    <div
      className={`${light} ${dark} text-primary-foreground px-3 py-1 rounded-md font-medium w-fit`}
    >
      {statusName}
    </div>
  );
}
