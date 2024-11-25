import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { GlobalStyles, SIZES } from "../../../shared/utils/GlobalStyles";
import { ApiResponse, Product } from "../../../shared/types";
import { api } from "../../../shared/services/api";
import { ProductCard } from "../components/ProductCard";
import { Carousel } from "../../../shared/components/Carousel";

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  navigation,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const numColumns = 2;

  const fetchProducts = async () => {
    try {
      const [productsResponse, featuredProductsResponse] = await Promise.all([
        api.get<ApiResponse<Product>>("/products/"),
        api.get<ApiResponse<Product>>("/products/category?type=mobile"),
      ]);
      if (productsResponse.data.products) {
        setProducts(productsResponse.data.products);
      }
      if (featuredProductsResponse.data.products) {
        setFeaturedProducts(featuredProductsResponse.data.products);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={GlobalStyles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[GlobalStyles.container]}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                productId: String(item.id),
              })
            }
          />
        )}
        keyExtractor={(item) => item.id + item.model}
        ListHeaderComponent={() => <Carousel data={featuredProducts} />}
        numColumns={numColumns}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />
        }
      />
    </View>
  );
};
