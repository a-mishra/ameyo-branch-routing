import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../utils/utils";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {sendSuccessNotification, sendFailureNotification, constants} from '../utils/utils'


export const Adder = ({ campaigns, refresh }) => {

  const [nodeflows, setNodeflows] = useState([])

  const [campaign, setCampaign] = React.useState('');
  const [branchCode, setBranchCode] = React.useState('');
  const [nodeflow, setNodeflow] = React.useState('');

  const handleChange = (key,event) => {
    switch(key){
      case 'campaign':
        setCampaign(event?.target?.value);
        getNodeflowsForCampaign(event?.target?.value?.campaignId)
      break;

      case 'branchCode':
        setBranchCode(event?.target?.value);
      break;

      case 'nodeflow':
        setNodeflow(event?.target?.value);
      break;
      default: 
      // do nothing
    }
  };

  useEffect(() => {
    setNodeflows([]);
    setBranchCode('');
  }, [campaigns])
  

  const getNodeflowsForCampaign = (campaignId) => {
    let client = window.AmeyoClient.init();

    let requestObject = {
        url: `ameyorestapi/voice/getAllCampaignDefaultFeatureContextForCampaign?campaignId=${campaignId}`,
        headers: {
            "content-type": "application/json"
        },
        method: "GET",
    };

    client.httpRequest.invokeAmeyo(requestObject)
    .then((response)=>{
      try {
        let data = JSON.parse(response?.response);
        let modData = data.map((item)=>{return({name: item.contextName, id: item.contextId})})
        setNodeflows(modData);
      } catch(e) {
        console.log('FAILED TO Parse CAMPAIGN LIST RESULT')
        console.log(response);
        console.log(e)
      }
    })
    .catch((e)=>{
      console.log(`FAILED TO GET NODEFLOW LIST FOR CAMPAIGN ${campaignId}`);
      console.log(e);
    });
  }

  const handleSave = () => {
    let client = window.AmeyoClient.init();

    let filter = {
      "customKey": constants.customKey
    }
    client.appConf.get(filter)
    .then((response)=>{
      let id = response?.records?.[0]?.id >= 0 ? response?.records?.[0]?.id : -1;
      if(id >= 0) {
        // update record
        let data = JSON.parse(response?.records[0]?.data);
        data.push({id: `${campaign?.campaignId}-${branchCode}-${nodeflow?.id}`, campaign, branchCode, nodeflow, dateAdded: new Date().toISOString()});

        let record = {
          "id": id,
          "data": JSON.stringify(data)
          }
          client.appConf.update(record).then(()=>{
            sendSuccessNotification('Record Added')
          }).catch(()=>{
            sendFailureNotification('Failed')
          });
      }
      else {
        // create record
        let data = [];
        data.push({id: `${campaign?.campaignId}-${branchCode}-${nodeflow?.id}`, campaign, branchCode, nodeflow, dateAdded: new Date().toISOString()});

        let record = {
          "customKey": constants.customKey,
          "data": JSON.stringify(data)
          }
          client.appConf.create(record).then(()=>{
            sendSuccessNotification('Record Added')
            refresh();
          }).catch(()=>{
            sendFailureNotification('Failed')
          });

      }

    })
    .catch((e)=>{
      console.log('FAILED TO GET APP CONF DATA, before save')
      console.log(e)
    })

  }

  return (
    <Wrapper>
    <div className="module-name">
      <h6>Branch Routing Module</h6>
    </div>
    <div className="form">
      <div className="form-fields"> 
        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="field-campaign-label">Campaign</InputLabel>
          <Select
            labelId="field-campaign-label"
            id="field-campaign"
            value={campaign}
            onChange={(e)=>handleChange('campaign', e)}
            label="Campaign"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              campaigns.map((item)=>(
                <MenuItem value={item}>{item.campaignName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <TextField id="field-branch-code" label="Branch Code" variant="standard" value={branchCode} onChange={(e)=>handleChange('branchCode', e)} />
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="field-nodeflow-label">Nodeflow</InputLabel>
          <Select
            labelId="field-nodeflow-label"
            id="field-nodeflow"
            value={nodeflow}
            onChange={(e)=>handleChange('nodeflow', e)}
            label="nodeflow"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              nodeflows.map((item)=>(
                <MenuItem value={item}>{item.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <div className="form-action-panel">
        <Button variant="contained"
          onClick={handleSave}
        >Save</Button>
      </div>
    </div>

    </Wrapper>
  );
};



const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.neutral};
    position: relative;

    .module-name {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      padding: 0px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${colors.primary};
      h1,h2,h3,h4,h5,h6 {
        color: #fff;
        margin: 1rem 0rem;
      }
      border-top: 2px solid ${colors.secondary};
      
    }

    .form {
      position: absolute;
      padding-bottom: 100px;
      display: grid;
      align-items: center;
      justify-content: center;

      .form-fields {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 24px;
      }

      .form-action-panel {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        padding: 24px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }



`;