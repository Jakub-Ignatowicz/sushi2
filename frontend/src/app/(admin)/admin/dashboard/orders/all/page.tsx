"use client";

import { getOrders, getOrdersCount } from "@/lib/api/orders";
import { OrdersTable } from "../data-table";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Order } from "@/types/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PageLoader from "@/components/page-loader";
import { useSearchParams, useRouter } from "next/navigation";

export default function AllOrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 10;

  const [orders, setOrders] = useState<Order[] | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlPageSize = Number(searchParams.get("pageSize")) || 10;
    if (urlPage !== page) setPage(urlPage);
    if (urlPageSize !== pageSize) setPageSize(urlPageSize);
  }, [searchParams]);

  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const count = await getOrdersCount();
        const res = await getOrders(page, pageSize);
        setOrders(res);
        setOrdersCount(count);
      } catch (error) {
        toast.error("Błąd pobierania zamówień");
      }
    };

    fetchNewOrders();
  }, [page, pageSize]);

  // Update URL query params without reload (shallow routing)
  const updateUrl = (newPage: number, newPageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("pageSize", newPageSize.toString());
    router.push(`?${params.toString()}`);
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
    updateUrl(newPage, pageSize);
  };

  const changePageSize = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // reset to first page
    updateUrl(1, newSize);
  };

  return (
    <div>
      {/* Example page size selector */}
      <div className="flex justify-between items-center">
        <select
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} / strona
            </option>
          ))}
        </select>

        <Pagination className="w-fit m-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => goToPage(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => goToPage(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {ordersCount && (
          <div className="text-sm">
            Strona <strong>{page}</strong> z{" "}
            <strong>{Math.ceil(ordersCount / pageSize) || 1}</strong>
          </div>
        )}
      </div>
      {orders === null ? (
        <PageLoader />
      ) : (
        <OrdersTable columns={columns} data={orders} />
      )}
    </div>
  );
}
