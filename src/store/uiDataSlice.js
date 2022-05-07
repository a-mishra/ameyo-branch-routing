import { createSlice } from "@reduxjs/toolkit";
import {campaign_nodeflow_map_query_result} from '../dummyData'


export const uiDataSlice = createSlice({
  name: "uiData",
  initialState: {
    campaign_nodeflow_map: {
      0: {
        name:'',
        id: '',
        nodeflows: [
          {
          
          }
        ]
      }
    },
  },
  reducers: {
    get_campaign_nodeflow_map: (state) => {
      // do some action to get the action nodeflow relation
    },
  }
});

export const { get_campaign_nodeflow_map } = uiDataSlice.actions;
export default uiDataSlice.reducer;
