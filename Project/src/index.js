import React from 'react';   // imported all the necesaary files required to use react.
import ReactDOM from 'react-dom';  //importeed dom model to make changes in the html file without touching it by document model
import App from './App';  // imported the app component
import reportWebVitals from './reportWebVitals';
import "./index.scss"  // imported the scss file
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from "react-router-dom"

//rendering components inside single browser router. that puts the elements directly onto the html file
ReactDOM.render(
  // we wrap whole content inside browser routerr so that we can easily route if thre are any changes in the url accordingly or some file is being uploaded  or something like that
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
