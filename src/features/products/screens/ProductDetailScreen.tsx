import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../../navigation/types"
import React, { useEffect, useState } from "react";
import { ApiResponse, Product } from "../../../shared/types";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../../shared/services/api";
import { GlobalStyles } from "../../../shared/utils/GlobalStyles";

type ProductDetailScreenProps = {
    route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get<ApiResponse<Product>>(`/products/${route.params.productId}`);
                if(response.data.product){
                    console.log('prod detail ', response.data.product);
                    setProduct(response.data.product);
                }
            } catch(error){
                Alert.alert('Error', 'Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [route.params.productId]);

    if (loading || !product){
        return (
            <View style={GlobalStyles.centered}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <ScrollView style={GlobalStyles.container}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover"/>
            <View style={GlobalStyles.content}>
                <Text style={GlobalStyles.title}>{product.title}</Text>
                <Text style={GlobalStyles.price}>${product.price.toFixed(2)}</Text>
                <Text style={GlobalStyles.description}>{product.description}</Text>
                
                <TouchableOpacity style={GlobalStyles.addToCartButton}>
                    <Text style={GlobalStyles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center'
    }
});