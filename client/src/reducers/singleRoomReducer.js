import { ROOM_CHANGE } from '../actions/types'

const singleRoomReducer = (state = null, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOM_CHANGE:
      return payload
    default:
      return state
  }
}

export default singleRoomReducer
