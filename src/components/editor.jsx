import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled'
import { colors } from "../utils/constants";

import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDemoData } from '@mui/x-data-grid-generator';


const Actions = ({deleteCallback}) => {

  return (
    <IconButton 
      color="secondary" 
      aria-label="Delete"
      onClick={deleteCallback}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export const Editor = ({refresh, tableData, deleteRecord}) => {

 
    console.log('TABLE DATA IN EDITOR:', tableData)
    let temp = tableData.map((item)=>{
      return {
        id: item?.id || 0,
        dateAdded: item?.dateAdded,
        campaign: item?.campaign?.campaignName,
        branchCode: item?.branchCode,
        nodeflow: item?.nodeflow?.name
      }
    })
    
    const rows = temp;


  // const rows = [
  //   { id: 1, dateAdded: '2022-05-12T12:45', campaign: 'Campaign1', branchCode: '121', nodeflow:'nodeflow12'},
  //   { id: 2, dateAdded: '2022-05-12T12:45', campaign: 'Campaign1', branchCode: '232', nodeflow:'nodeflow13'},
  //   { id: 3, dateAdded: '2022-05-12T12:45', campaign: 'Campaign1', branchCode: '234', nodeflow:'nodeflow43' },
  //   { id: 4, dateAdded: '2022-05-12T12:45', campaign: 'Campaign2', branchCode: '453', nodeflow:'nodeflow23' },
  //   { id: 5, dateAdded: '2022-05-12T12:45', campaign: 'Campaign3', branchCode: '123', nodeflow:'nodeflow13' },
  //   { id: 6, dateAdded: '2022-05-12T12:45', campaign: 'Campaign3', branchCode: '124', nodeflow:'nodeflow15' },
  // ];

  const columns = [
    { field: 'dateAdded', headerName: 'Date Added', width: '200', align:'center', headerAlign: 'center', headerClassName: 'table-column-header' },
    { field: 'campaign', headerName: 'Campaign', width: '225', align:'center', headerAlign: 'center', headerClassName: 'table-column-header' },
    { field: 'branchCode', headerName: 'Branch Code', width: '150', align:'center', headerAlign: 'center', headerClassName: 'table-column-header', editable: false },
    { field: 'nodeflow', headerName: 'Nodeflow', width: '225', align:'center', headerAlign: 'center', headerClassName: 'table-column-header',  editable: false },
    { field: 'actions', headerName: '', width: '50', align:'center', headerAlign: 'center', headerClassName: 'table-column-header',  editable: false, renderCell:((data)=>(<Actions deleteCallback={()=>{deleteRecord(data?.row?.id)}}/>))  },
  ];

  return (
    <Wrapper>
      <div className='table-container'>
        <DataGrid 
          // checkboxSelection={false} 
          disableSelectionOnClick 
          rows={rows} 
          columns={columns} 

          onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel)
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
      <div className="action-panel">

        <IconButton 
        color="primary" 
        aria-label="Refresh"
        onClick={refresh}
        >
          <RefreshIcon />
        </IconButton>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;

  position: relative;

  .table-container {
    height: 600px;
    width: 850px;
    margin-left: auto;
    margin-right: auto;

    .MuiDataGrid-columnHeaders {
      background: ${colors.primary};
    }
    .table-column-header {
      color: #fff;
      .MuiDataGrid-columnHeaderTitle {
        font-weight: 600;
      }
    }
    .even {
      background: ${colors.secondary};
    }
  
    .odd {
      background: #fff;
    }

  }

  .action-panel {
    position: absolute;
    bottom: 0px;
    right: 24px;
    width: 100%;
    padding: 24px 0px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }


`;