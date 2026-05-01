import { useEffect, useState } from "react";
import api from "../services/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};

export default useProducts;