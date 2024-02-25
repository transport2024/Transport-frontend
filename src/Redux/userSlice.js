import {createSlice} from "@reduxjs/toolkit"


const userSlice=createSlice({
    name:"userSlice",
    initialState: { user: localStorage.getItem("token")},
    reducers:{
        changeUservalues:(state,action)=>{
            state.user=action.payload
        }
    }
})


export const {changeUservalues}=userSlice.actions
export default userSlice.reducer