import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const Loader = (props) => {
  let { loading } = props;
  return (
    <Spinner size="large"
      visible={loading}
      color={"#1E9BCE"}
      textContent={"Loading . . ."}
      textStyle={{ color: "white", fontWeight: "bold" }}
    />
  )
}

export default Loader;