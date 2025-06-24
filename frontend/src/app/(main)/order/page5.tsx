"use client";
import { GET } from "@/lib/api";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { motion } from "framer-motion";
import Sort from "./Sort";
import { Product } from "@/types";

export default function page() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [positionSort, setPositionSort] = useState<string>("alphaAsc");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GET("/api/products");
      setAllProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );

    filtered = filtered.sort((a, b) => {
      switch (positionSort) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDsc":
          return b.price - a.price;
        case "alphaAsc":
          return a.name.localeCompare(b.name);
        case "alphaDsc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [allProducts, search, positionSort]);

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col max-w-box w-full h-full">
        <div className="flex items-center justify-center w-full h-[50px] p-8 gap-4 relative bg-primary rounded-lg">
          <Sort position={positionSort} setPosition={setPositionSort} />

          <motion.input
            type="text"
            placeholder="Szukaj..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-primary bg-black text-white rounded px-3 py-2 outline-none relative z-10"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "50%", opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ minWidth: 0 }}
          />

          <Categories />
        </div>
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
}
