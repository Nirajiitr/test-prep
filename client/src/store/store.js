import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./auth-slice";
import testReducer from "./test-slice";
const store = configureStore({
   reducer : {
    auth : authReducer,
    test : testReducer, 
   }
})

export default store