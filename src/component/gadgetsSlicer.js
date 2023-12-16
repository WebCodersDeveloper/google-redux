import { createSlice } from "@reduxjs/toolkit";

const gadgets = createSlice({
    name: "gadgets",
    initialState: [],
    reducers:{
        addgadgets: (state, action) => {
            state.push({
                id: Date.now(),
                title: action.payload.title,
                url:action.payload.url,
                favicon:action.payload.favicon,
                defaultImage:action.payload.defaultImage
            })
        },
        removeGadgets: (state, action) => {
            return state.filter((gadget) => gadget.id !== action.payload);
        },
    }
})


export const { addgadgets,removeGadgets } = gadgets.actions;
export default gadgets.reducer