import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Offering {
  id: number;
  userId: number;
  categoryId: number;
  imageUrl: string | null;
  videoUrl: string | null;
  name: string;
  slug: string;
  description: string;
  price: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  contact?: string;
  createdAt: string;
  updatedAt: string;
}

type OfferingState = {
  offerings: Offering[];
  loading: boolean;
  error: string | null;
  fetchOfferingsByCategory: (slug: string) => Promise<void>;
  fetchAllOfferings: () => Promise<void>;
  fetchFavoriteOfferings: (userId: number) => Promise<void>;
  clearOfferings: () => void;
};

export const useOfferingStore = create<OfferingState>()(
  persist(
    (set) => ({
      offerings: [],
      loading: false,
      error: null,

      fetchOfferingsByCategory: async (slug: string) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `https://api-pridecare.com/api-appplus/get_products_services_by_category.php?category=${slug}`
          );
          const json = await res.json();
          if (json.status === "success") {
            set({ offerings: json.data });
          } else {
            set({ error: json.message || "Erro ao buscar ofertas." });
          }
        } catch (err: any) {
          set({ error: err.message || "Erro na requisição." });
        } finally {
          set({ loading: false });
        }
      },

      fetchAllOfferings: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `https://api-pridecare.com/api-appplus/get_products_services.php`
          );
          const json = await res.json();
          if (json.status === "success") {
            set({ offerings: json.data });
          } else {
            set({ error: json.message || "Erro ao buscar ofertas." });
          }
        } catch (err: any) {
          set({ error: err.message || "Erro na requisição." });
        } finally {
          set({ loading: false });
        }
      },

      fetchFavoriteOfferings: async (userId: number) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `https://api-pridecare.com/api-appplus/get_favorite_products_services.php`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            }
          );

          const json = await res.json();
          if (json.status === "success") {
            set({ offerings: json.data });
          } else {
            set({ error: json.message || "Erro ao buscar favoritos." });
          }
        } catch (err: any) {
          set({ error: err.message || "Erro na requisição." });
        } finally {
          set({ loading: false });
        }
      },

      clearOfferings: () => set({ offerings: [], error: null }),
    }),
    {
      name: "offering-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
