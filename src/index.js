import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {store} from "./configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import {MuiPickersUtilsProvider} from "@material-ui/pickers"
// import DateFnsUtils from '@date-io/date-fns'

let persistor = persistStore(store)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
{/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
<App />
{/* </MuiPickersUtilsProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
