import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled'

export const Editor = () => {
  const rows = [
    { id: 1, campaign: 'Campaign1', brachCode: '121', nodeflow:'nodeflow12' },
    { id: 2, campaign: 'Campaign1', brachCode: '232', nodeflow:'nodeflow13' },
    { id: 3, campaign: 'Campaign1', brachCode: '234', nodeflow:'nodeflow43' },
    { id: 4, campaign: 'Campaign2', brachCode: '453', nodeflow:'nodeflow23' },
    { id: 5, campaign: 'Campaign3', brachCode: '123', nodeflow:'nodeflow13' },
    { id: 6, campaign: 'Campaign3', brachCode: '124', nodeflow:'nodeflow15' },
  ];

  const columns = [
    { field: 'campaign', headerName: 'Campaign', width: '250', align:'center', headerAlign: 'center', headerClassName: 'table-column-header' },
    { field: 'brachCode', headerName: 'Branch Code', width: '250', align:'center', headerAlign: 'center', headerClassName: 'table-column-header', editable: true },
    { field: 'nodeflow', headerName: 'Nodeflow', width: '250', align:'center', headerAlign: 'center', headerClassName: 'table-column-header',  editable: true },
  ];

  return (
    <Wrapper>
      <div className='table-container'>
        <DataGrid 
          checkboxSelection={true} 
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
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;

  .table-container {
    height: 600px;
    width: 800px;
    margin-left: auto;
    margin-right: auto;

    .even {
      background: #eee;
    }
  
    .odd {
      background: #fff;
    }

  }


`;