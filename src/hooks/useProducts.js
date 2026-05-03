import { useEffect, useState } from "react";

import api from "../services/api";

const useProducts = (page = 1, search = "") => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/api/products?page=${page}&search=${search}`
        );

        setProducts(res.data.products);

        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, search]);

  return {
    products,
    loading,
    totalPages,
  };
};

export default useProducts;