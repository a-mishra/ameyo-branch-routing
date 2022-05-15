import {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import { Global } from '@emotion/react'

import { Adder } from "./components/adder";
import { Editor } from "./components/editor";
import globalStyles from "./global-styles";
import {sendSuccessNotification, sendFailureNotification, constants} from './utils/helper';
import {getRecord} from './utils/logic';


const App = () => {

  const [campaigns, setcampaigns] = useState([])

  const getCampaigns = () => {

    var client = window.AmeyoClient.init();
    client.globalData.get("loggedInUser")
    .then((response)=>{

      let userType = response?.userType;

      var requestObject = {
          url: userType == 'Administrator' ? 'ameyorestapi/cc/campaigns/getAllCampaigns' : 'ameyorestapi/cc/campaigns/getAssigned',
          headers: {
              "content-type": "application/json"
          },
          method: "GET",
      };
      client.httpRequest.invokeAmeyo(requestObject)
      .then((response)=>{
        try {
          let data = JSON.parse(response?.response);
          let filterData = data.filter((item)=>{
            return item.campaignType == 'Interactive Voice Application';
          }); 
          setcampaigns(filterData);
        } catch(e) {
          console.log('FAILED TO Parse CAMPAIGN LIST RESULT')
          console.log(response);
          console.log(e)
        }
      })
      .catch((error)=>{
        console.log('FAILED TO RECEIVE CAMPAIGN LIST')
        console.log(error)
      });
    
    })
    .catch((error)=>{
      console.log('FAILED TO RECEIVE LOGGED IN  USER')
      console.log(error)
    });

  }

  const [tableData, settableData] = useState([])

  const getTableData = () => {
    // let client = window.AmeyoClient.init();

    // let filter = {
    //   "customKey": constants.customKey
    // }
    // client.appConf.get(filter)
    // .then((response)=>{
    //   let id = response?.records?.[0]?.id >= 0 ? response?.records?.[0]?.id : -1;
    //   if(id >= 0) {
    //     let data = JSON.parse(response?.records[0]?.data);
    //     settableData(data);
    //   }
    // })
    // .catch((e)=>{
    //   console.log('FAILED TO GET APP CONF DATA, tableRefersh')
    //   console.log(e)
    // })

  }

  useEffect(() => {
    getCampaigns();
    getTableData();
  }, [])

  const deleteRecord = (recordId) => {
    let client = window.AmeyoClient.init();

    let filter = {
      "customKey": constants.customKey
    }
    client.appConf.get(filter)
    .then((response)=>{
      let id = response?.records?.[0]?.id >= 0 ? response?.records?.[0]?.id : -1;
      if(id >= 0) {
        let data = JSON.parse(response?.records[0]?.data);
        let filterData = data.filter((item)=>{
          return item.id!= recordId;
        });

        let record = {
          "id": id,
          "data": JSON.stringify(filterData)
          }
          client.appConf.update(record).then(()=>{
            sendSuccessNotification('Record Deleted')
            getTableData();
          }).catch(()=>{
            sendFailureNotification('Failed')
          });
      }
    })
    .catch((e)=>{
      console.log('FAILED TO GET APP CONF DATA, deleteRecord')
      console.log(e)
    })
  }

  
  
  return (
    <>
      {/* <FontFaces /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet"/>

      <Global styles={globalStyles()} />
      <Wrapper>
        <Adder  campaigns={campaigns} refresh={()=>{getTableData()}}/>
        <Editor tableData={tableData} refresh={()=>{getTableData(); getCampaigns()}} deleteRecord={deleteRecord}/>
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