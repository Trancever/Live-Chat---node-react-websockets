import { FETCH_USER, LOGOUT_USER } from '../actions/types'

const authReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_USER:
      return payload
    case LOGOUT_USER:
      return payload
    default:
      return state
  }
}

export default authReducer
