export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  onSale: boolean;
}

export interface ApiResponse<T>{
  status: string,
  message: string,
  products?: T[],
  product?: T,
}

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
}

export interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}
