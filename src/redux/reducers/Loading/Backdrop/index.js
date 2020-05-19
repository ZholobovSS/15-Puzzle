import * as CONSTANTS from '../../../constants'

const BackdropReducer = (state = false, action) => {
    switch (action.type) {
        case CONSTANTS.SET_BACKDROP:
            return action.payload
        default:
            return state
    }
}

export default BackdropReducer