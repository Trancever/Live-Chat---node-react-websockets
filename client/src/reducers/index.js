import { combineReducers } from 'redux'
import authReducer from './authReducer'
import roomsReducer from './roomsReducer'
import singleRoomReducer from './singleRoomReducer'

const reducers = combineReducers({
  auth: authReducer,
  rooms: roomsReducer,
  currentRoomIndex: singleRoomReducer,
})

export default reducers
