import {createSlice} from "@reduxjs/toolkit"

const networkSlice=createSlice({
    name:"Network",
    initialState:{
        isOpen:false,
    },
    reducers:{
        showOpen:(state)=>{
            state.isOpen=true;
        },
        hideOpen:(state)=>{
            state.isOpen=false
        }
    }
})

export const {showOpen,hideOpen}=networkSlice.actions
export default networkSlice.reducer