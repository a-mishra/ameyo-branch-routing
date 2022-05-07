import { createSlice } from "@reduxjs/toolkit";

export const newDataSlice = createSlice({
  name: "newData",
  initialState: {
    campaign: {
      name:'',
      id: ''
    },
    branchCode: '',
    nodeflow: {
      name: '',
      id: ''
    }
  },
  reducers: {
    change_campaign: (state, action) => {
      state.campaign = action.payload;
    },
    change_branchCode: (state, action) => {
      state.branchCode = action.payload;
    },
    change_nodeflow: (state, action) => {
      state.nodeflow = action.payload;
    },
    
    save_newData: (state) => {
      // some logic to save this data to ameyo apps context;
    }
  }
});

export const { change_campaign, change_branchCode, change_nodeflow, save_newData } = newDataSlice.actions;
export default newDataSlice.reducer;
