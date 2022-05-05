import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../store/counterSlice";

export const Adder = ({ state }) => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <h1> Adder: {count}</h1>
      <button onClick={dispatch(increment())} />
    </>
  );
};
