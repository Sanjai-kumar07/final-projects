import axios from "axios";
import { createContext,  useEffect,  useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:8000"
    const [token, setToken] = useState("");
    const [food_list,setFoodList] = useState([]);
    const [promoCode, setPromoCode] = useState("");
    const [promoDiscount, setPromoDiscount] = useState(0);

    const addToCart = async (itemId) => {
        setCartItems((prev)=>({
            ...prev,[itemId]: (prev[itemId] || 0)+1}));
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>{
            if(!prev[itemId]) return prev;
            const updatedCart = {...prev, [itemId]: prev[itemId] -1};

            if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
            return updatedCart;
        })
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
     const getTotalCartAmount = () => {
        let totalAmount = 0;
        
        for (const item in cartItems) {    
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {  // Prevents errors if the item is not found
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        console.log("Subtotal:", totalAmount);
        return totalAmount || 0; 
    };
    const subtotal = getTotalCartAmount();
    const handlePromoSubmit = (e) => {
        e.preventDefault();
        
        // Example: Apply a fixed discount for a promo code
        if (promoCode === "DISCOUNT10","TESTO20") {
          setPromoDiscount(subtotal * 0.1);  // 10% discount
        } else {
          setPromoDiscount(0); // No discount
        }
      };

     const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
     }

     const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
        
     }
     useEffect(()=>{
       
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
     },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        promoCode,
        setPromoCode,
        promoDiscount,
        setPromoDiscount,
        handlePromoSubmit
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;