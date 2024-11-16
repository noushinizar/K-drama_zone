import { configureStore } from "@reduxjs/toolkit";
import dramaReducer from '../redux/DramaSlice';
export const store = configureStore({
    reducer :{
       dramas:dramaReducer, 
    }
})