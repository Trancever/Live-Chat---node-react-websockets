import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)
