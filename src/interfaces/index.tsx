export type User = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  phone: string;
  pronouns: string;
  role?: "vendor" | "regular" | "admin";
  avatarUrl?: string;
  loginAt: string;
};

export interface Offering {
  id: number;
  userId: number;
  categoryId: number;
  name: string;
  slug?: string;
  contact: string;
  description: string | null;
  price: string | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
  imageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
}
