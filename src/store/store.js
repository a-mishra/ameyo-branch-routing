import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import newDataReducer  from "./newDataSlice";
import tableDataReducer  from "./tableDataSlice";
import uiDataReducer  from "./uiDataSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    newData: newDataReducer,
    tableData: tableDataReducer,
    uiData: uiDataReducer,
  }
});
