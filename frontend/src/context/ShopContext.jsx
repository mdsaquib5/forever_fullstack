import { createContext, useState, useEffect } from "react";
// import {products} from "../assets/asset/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {backendUrl} from "../config/const";

export const ShopContext = createContext();

// This component is use to provide context to the app
const ShopContextProvider = (props) => {
    // This state is use to store currency
    const currency = "₹";
    // This state is use to store delivery fee
    const deliveryFee = 10;
    // This state is use to store products
    const [products, setProducts] = useState([]);
    // This state is use to store search
    const [search, setSearch] = useState('');
    // This state is use to store show search
    const [showSearch, setShowSearch] = useState(false);
    // This state is use to store cart items
    const [cartItems, setCartItems] = useState({});
    // This state vaiable is for hold the tokens for user authentication !
    const [token, setToken] = useState('');
    // This is use to navigate
    const navigate = useNavigate();

    // This function is use to add item to cart
    const addToCart = async (itemId, size) => {
        // Checking if size is not empty
        if (!size) {
            toast.error("Please select a size");
            // Return if size is not selected
            return;
        }

        // Copying cart items
        let cartData = structuredClone(cartItems);
        // Checking if item is already in cart
        if (cartData[itemId]) {
            // Checking if size is already in cart
            if (cartData[itemId][size]) {
                // Increasing size count
                cartData[itemId][size] += 1;
            }else{
                // Setting size count
                cartData[itemId][size] = 1;
            }
            // Setting cart items
        }else{
            // Setting cart items
            cartData[itemId] = {};
            // Setting size count
            cartData[itemId][size] = 1;
        }
        // Setting cart items
        setCartItems(cartData);
        // Checking if token is available
        if (token) {
            try {
                // Sending request to add item to cart
                await axios.post(`${backendUrl}/api/cart/add`, {itemId, size}, {headers: {token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        toast.success("Item added to cart");
    }

    // This function is use to get cart count
    
    const getCartCount = () => {
        // Setting total count
        let totalCount = 0;
        // Looping through cart items
        for (const items in cartItems) {
            // Looping through size
            for (const item in cartItems[items]) {
                // Increasing total count
                try {
                    // Checking if item is in cart
                    if (cartItems[items][item] > 0) {
                        // Increasing total count
                        // totalCount += cartItems[items][item];
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
                
            }
        }
        return totalCount;
    }

    // This useEffect is use to log cart items
    // useEffect(() => {
    //   console.log(cartItems);
    // }, [cartItems])
    

    // This function is use to update quantity
    const updateQuantity = async (itemId, size, quantity) => {
        // Copying cart items
        let cartData = structuredClone(cartItems);
        // Updating quantity
        cartData[itemId][size] = quantity;
        // Setting cart items
        setCartItems(cartData);

        if (token) {
            try {
                // Sending request to update item to cart
                await axios.post(`${backendUrl}/api/cart/update`, {itemId, size, quantity}, {headers: {token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        // Setting total amount
        let totalAmount = 0;
        // Looping through cart items
        for (const items in cartItems) {
            // Looping through size
            let itemInfo = products.find((item) => item._id === items);
            // Looping through quantity
            for (const item in cartItems[items]) {
                try {
                    // Checking if item is in cart
                    if (cartItems[items][item] > 0) {
                        // Increasing total amount
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            console.log("backendUrl is" ,backendUrl);
            // console.log(response.data);
            // setProducts(response.data);

            if (response.data.success) {
                setProducts(response.data.products);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // This function is use to get user cart
    const getUserCart = async (userToken) => {
        try {
            // Sending request to get user cart
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {headers: {token: userToken}});
            console.log(response.data);
            // Setting cart items
            if (response.data.success) {
                // Setting cart items
                setCartItems(response.data.cartData);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [token]);
    
    

    // Value is use to store context value
    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken
    }
    
    return (
        // This is use to provide context to the app
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;