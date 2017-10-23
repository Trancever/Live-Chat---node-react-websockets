import axios from 'axios'
import { FETCH_USER, LOGOUT_USER, FETCH_ROOMS, ROOM_CHANGE, ADD_MESSAGE } from './types'
import { CURRENT_USER, LOGIN, LOGOUT, REGISTER, ROOMS, SINGLE_ROOM } from '../endpoints'

export const fetchUser = () => async dispatch => {
  const res = await axios.get(CURRENT_USER)

  dispatch({ type: FETCH_USER, payload: res.data })
}

export const logoutUser = () => async dispatch => {
  await axios.get(LOGOUT)

  dispatch({ type: LOGOUT_USER, payload: {} })
}

export const registerUser = ({ username, password }) => async dispatch => {
  await axios.post(REGISTER, { username, password })
  const res = await axios.post(LOGIN, { username, password })

  dispatch({ type: FETCH_USER, payload: res.data })
}

export const loginUser = ({ username, password }) => async dispatch => {
  const res = await axios.post(LOGIN, { username, password })

  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchRooms = () => async dispatch => {
  const res = await axios.get(ROOMS)

  dispatch({ type: FETCH_ROOMS, payload: res.data })
}

export const createRoom = ({ roomName }) => async dispatch => {
  const res = await axios.post(SINGLE_ROOM, { roomName })

  dispatch({ type: FETCH_ROOMS, payload: res.data })
}

export const changeRoom = index => ({
  type: ROOM_CHANGE,
  payload: index,
})

export const addMessage = data => ({
  type: ADD_MESSAGE,
  payload: data,
})
