import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { message } from "antd";
import api from "~/api/api";
import { Category } from "~/types";

interface CategoryContextProps {
  categories: Category[];
  loading: boolean;
  reloadCategories: () => void;
}

const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  loading: false,
  reloadCategories: () => {},
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Category[]>("/categories/");
      setCategories(data);
    } catch {
      message.error("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, loading, reloadCategories: fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
