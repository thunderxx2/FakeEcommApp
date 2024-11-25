import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    white: '#FFFFFF',
    black: '#000000',
    red: '#FF3B30',
    gray: '#F2F2F7',
    gray2: '#ccc',
    gray3: '#666666',
    gray4: '#0000004d',
    gray5: '#636366',
    gray6: '#8E8E93',
    light: '#F9F9F9',
    dark: '#1C1C1E',
};

export const SIZES = {
    base: 8,
    font: 14,
    raidus: 8,
    padding: 16,

    largeTitle: 32,
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 16,
    body1: 16,
    body2: 14,
    body3: 12,

    width,
    height,
};

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        marginBottom: SIZES.h2,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.base,
        paddingHorizontal: SIZES.body1,
        marginBottom: SIZES.body1,
        fontSize: SIZES.body1,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray2,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.body1,
        fontWeight: '600',
    },
    image: {
        height: '100%',
        width: 300,
    },
    content: {
        padding: SIZES.padding,
    },
    price: {
        fontSize: SIZES.h3,
        fontWeight: '600',
        color: COLORS.primary,
        marginVertical: SIZES.base,
    },
    description: {
        fontSize: SIZES.h4,
        lineHeight: SIZES.h2,
        color: COLORS.gray3,
        marginVertical: SIZES.base,
    },
    addToCartButton: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        borderRadius: SIZES.base,
        alignItems: 'center',
        marginTop: SIZES.h4,
    },
});