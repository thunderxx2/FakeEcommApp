import React from "react";
import {
  COLORS,
  GlobalStyles,
  SIZES,
} from "../../../shared/utils/GlobalStyles";
import { ProductCardProps } from "../../../shared/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { mode } from "native-base/lib/typescript/theme/tools";

const CARD_WIDTH = (SIZES.width - SIZES.padding * 3) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  const { brand, price, image, title, model } = product;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.FavouriteIcon}
            onPress={onFavoritePress}
          >
            <Ionicons
              name="heart-outline"
              size={SIZES.h3}
              color={isFavorite ? COLORS.red : COLORS.gray6}
              selectionColor={isFavorite ? COLORS.red : "none"}
            />
          </TouchableOpacity>
        )}
      </View>
      {
        <View style={styles.detailsContainer}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {model}
          </Text>

          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.raidus,
    marginBottom: SIZES.padding,
    marginLeft: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  imageContainer: {
    width: "100%",
    height: CARD_WIDTH,
    borderTopLeftRadius: SIZES.raidus,
    borderTopRightRadius: SIZES.raidus,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  FavouriteIcon: {
    position: "absolute",
    top: SIZES.base,
    right: SIZES.base,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SIZES.base,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: SIZES.base / 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: SIZES.base / 2,
    elevation: 3,
  },
  detailsContainer: {
    padding: SIZES.base,
  },
  name: {
    fontWeight: "400",
    color: COLORS.gray5,
    fontSize: SIZES.body2,
    marginBottom: SIZES.base / 2,
    height: 40,
  },
  price: {
    fontSize: SIZES.h3,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
