import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import categoryReducer from './slices/categorySlice'
import wishlistReducer from './slices/wishlistSlice'
import messageReducer from './slices/messageSlice'

export default configureStore({reducer:{user:userReducer, product:productReducer, cart:cartReducer, order:orderReducer, category:categoryReducer, wishlist:wishlistReducer, message:messageReducer}})