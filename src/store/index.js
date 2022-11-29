import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.slice";
import isLoading from "./slices/isLoading.slice";
import purchases from "./slices/purchases.slice";
export default configureStore({
  reducer: {
    products,
    isLoading,
    purchases,
  },
});
