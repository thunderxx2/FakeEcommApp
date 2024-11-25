import { Product } from "../shared/types";

export type RootStackParamList = {
    Login: undefined;
    MainApp: undefined;
    ProductDetail: { productId: string };
}

export type BottomTabParamList = {
    Home: undefined;
    Favorites: undefined;
    Profile: undefined
}

export interface CarouselProps {
    data: Product[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}