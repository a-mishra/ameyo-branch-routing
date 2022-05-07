import {useEffect} from 'react';
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { Global } from '@emotion/react'

import { Adder } from "./components/adder";
import { Editor } from "./components/editor";
import { get_campaign_nodeflow_map } from "./store/uiDataSlice";
import globalStyles from "./global-styles";


export default function App() {
  useEffect(() => {
    setInterval(() => {
      useDispatch(get_campaign_nodeflow_map())
    }, 30000);
  }, [])
  
  return (
    <>
      {/* <FontFaces /> */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet"/>

      <Global styles={globalStyles()} />
      <Wrapper>
        <Adder />
        <Editor />
      </Wrapper>
    </>

  );
}

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