import {configureStore} from "@reduxjs/toolkit"
import networkReducer from "./NetworkSlice"

export default configureStore({
    reducer:{
        network:networkReducer
    }
})