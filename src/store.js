import { configureStore } from "@reduxjs/toolkit";
import gadgetsSlicer from "./component/gadgetsSlicer";

export default configureStore({
    reducer:{
        gadgets : gadgetsSlicer
    }
})