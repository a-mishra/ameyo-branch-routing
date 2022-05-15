import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {sendSuccessNotification, sendFailureNotification, layout, } from '../utils/helper'
import {constants, colors} from '../utils/constants'
import {getNodeflowsForCampaign, addRecord} from '../utils/logic'

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
        .then((data)=>{setNodeflows(data)})
        .catch((e)=>{ sendFailureNotification('Error occured while getting Nodeflows for selected campaign!!!') });
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
  }, [campaigns])
  
  const handleSave = () => {
    let newData = {id: `${branchCode}`, campaign, branchCode, nodeflow, dateAdded: new Date().toISOString()};
    addRecord(newData).then(()=>{
      sendSuccessNotification('Record Added');
      refresh();
    })
    .catch((e)=>{
      sendFailureNotification('Error occured while adding record');
    })
  }

  return (
    <Wrapper>
    <div className="module-name">
      <h6>Branch Routing Module</h6>
    </div>
    <div className="form">
      <div className="form-fields"> 
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <TextField id="field-branch-code" label="Branch Code" variant="standard" value={branchCode} onChange={(e)=>handleChange('branchCode', e)} />
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
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

        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
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
       @media only screen and (max-width: 1200px) {
         padding-top: 64px;
         padding-bottom: 64px;
        }
      display: grid;
      align-items: center;
      justify-content: center;

      .form-fields {
        display: grid;
        grid-template-columns: 1fr;

         @media only screen and (max-width: 1200px) {
            grid-template-columns: repeat(3, 250px);
          }
        
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