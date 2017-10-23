import moment from 'moment'

import { FETCH_ROOMS, ADD_MESSAGE } from '../actions/types'

const roomsReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ROOMS:
      return payload
    case ADD_MESSAGE:
      const room = state.find(room => room.name === payload.roomName)
      room.messages.push({
        content: payload.content,
        user: payload.user,
        sent: moment(payload.sent).format('DD-MMM-YYYY'),
        type: payload.type,
        path: payload.path,
      })
      const index = state.findIndex(room => room.name === payload.roomName)
      return [...state.slice(0, index), room, ...state.slice(index + 1)]
    default:
      return state
  }
}

export default roomsReducer
