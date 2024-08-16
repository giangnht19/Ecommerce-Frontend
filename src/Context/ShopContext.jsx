import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () => {

    const server = 'https://ecommerce-backend-l8jr.onrender.com';

    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = ({ children }) => {

    const [all_product, setAllProduct] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${server}/allproducts`)
            .then((res) => res.json())
            .then((data) => setAllProduct(data));
    }, []);
    // console.log(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        console.log(cartItems);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                total += cartItems[item] * itemInfo.new_price;
            }
        }
        return total;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
