const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    approvalURL:null,
    isLoading:false,
    order:null
}

const shoppingOrderSlice = createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{}
})

export default shoppingOrderSlice.reducer