import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  observation?: string;
  createdAt: string;
}

type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  clearCategories: () => void;
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      loading: false,
      error: null,

      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            "http://appplustecnologi1.hospedagemdesites.ws/api-routes/get_categories.php"
          );
          const json = await res.json();
          if (json.status === "success") {
            set({ categories: json.data });
          } else {
            set({ error: json.message || "Erro ao carregar categorias." });
          }
        } catch (err: any) {
          set({ error: err.message || "Erro na requisição." });
        } finally {
          set({ loading: false });
        }
      },

      clearCategories: () => set({ categories: [], error: null }),
    }),
    {
      name: "category-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
