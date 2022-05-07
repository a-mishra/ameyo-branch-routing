import { createSlice } from "@reduxjs/toolkit";

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState: {
    data: {
    },
  },
  reducers: {
    update_tableData:(state, action) => {
      state.data = action.payload;
    },
    save_tableData: (state) => {
      // some logic to save this data to ameyo apps context;
    }
  }
});

export const { update_tableDataw, save_tableData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
