import {
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CarouselProps } from "../../navigation/types";
import { COLORS, GlobalStyles, SIZES } from "../utils/GlobalStyles";
import { useEffect, useRef, useState } from "react";
import { Product } from "../types";

export const Carousel: React.FC<CarouselProps> = ({
  data = [],
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const width = SIZES.width;

  if(!data || data.length === 0){
    return null;
  }

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        if (activeIndex === data.length - 1) {
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        } else {
          flatListRef.current?.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }
  }, [activeIndex, autoPlay, autoPlayInterval, data.length]);

  const handleScroll = Animated.event(
    [{nativeEvent: { contentOffset: { x: scrollX } }}],{
      useNativeDriver: false,
      listener:   (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const viewSize = event.nativeEvent.layoutMeasurement;
        const newIndex = Math.floor(contentOffset.x / viewSize.width);
        setActiveIndex(newIndex);
      }
    }
  );

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: item.image }} resizeMode="cover" />
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={[GlobalStyles.title, styles.itemTitle]}>
              {item.model}
            </Text>
            <Text style={[styles.bodyText, styles.itemPrice]}>
              ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + item.brand}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    width: SIZES.width,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gray4,
    justifyContent: "flex-end",
  },
  textContainer: {
    padding: SIZES.padding,
  },
  itemTitle: {
    color: COLORS.white,
    marginBottom: SIZES.base,
  },
  itemPrice: {
    color: COLORS.white,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: SIZES.padding,
    left: 0,
    right: 0,
  },
  dot: {
    height: SIZES.base,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
  },
  bodyText: {
    fontSize: SIZES.body1,
    fontWeight: "400",
    marginBottom: SIZES.base,
    color: COLORS.gray5,
  },
});
