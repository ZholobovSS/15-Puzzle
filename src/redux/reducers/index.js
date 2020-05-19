import { combineReducers } from 'redux'

import user from './User/'
import leaderboard from './Leaderboard/'
import notifications from './Notification/'
import loading from './Loading/'
import initialState from '../initialState'
import * as CONSTANTS from '../constants'

const appReducer = combineReducers({
  user,
  leaderboard,
  notifications,
  loading
})

const rootReducer = (state = {...initialState}, action) => {
    if (action.type === CONSTANTS.USER_SIGN_OUT) {
        state = {...initialState}
    }

    return appReducer(state, action)
}

export default rootReducer