import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../store/counterSlice";
import { change_campaign, change_branchCode, change_nodeflow, save_newData } from '../store/newDataSlice'
import { colors } from "../utils/utils";

export const Adder = ({ state }) => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <Wrapper>
      <h1> Adder: {count}</h1>
      <button onClick={()=>dispatch(increment())} >Increment</button>
    </Wrapper>
  );
};



const Wrapper = styled.div`
    display: grid;
    align-content: start;
    justify-content: center;
    background: ${colors.neutral};
`;