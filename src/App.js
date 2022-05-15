import {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import { Global } from '@emotion/react'

import { Adder } from "./components/adder";
import { Editor } from "./components/editor";
import globalStyles from "./global-styles";
import {sendSuccessNotification, sendFailureNotification} from './utils/helper';
import { getTableData, getCampaigns, deleteRecord} from './utils/logic';
import {constants} from './utils/constants'


const App = () => {

  const [campaigns, setcampaigns] = useState([])
  const [tableData, settableData] = useState([])

  const initialize = () => {
    getCampaigns().then((data)=>{setcampaigns(data)}).catch((e)=>{ sendFailureNotification('Error occured while getting campaigns!!!') });
    getTableData().then((data)=>{settableData(data)}).catch((e)=>{ sendFailureNotification('Error occured while getting TableData!!!') });
  }

  const handleDeleteRecord = (recordId) => {
    deleteRecord(recordId).then(()=>{
      sendSuccessNotification('Record Deleted')
      initialize();
    }).catch((e)=>{
      sendFailureNotification('Error occured while deletion!!!')
    })
  }

  useEffect(() => {
    initialize();
  }, [])
  
  
  return (
    <>
      {/* <FontFaces /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet"/>

      <Global styles={globalStyles()} />
      <Wrapper>
        <Adder  campaigns={campaigns} refresh={()=>{initialize()}}/>
        <Editor tableData={tableData} refresh={()=>{initialize()}} deleteRecord={handleDeleteRecord}/>
      </Wrapper>
    </>

  );
}

export default App;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 25% auto;
  grid-row-gap: 48px;
  grid-column-gap: 12px;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: 200px auto;
  }

  height: 100vh;
`;