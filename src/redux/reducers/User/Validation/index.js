import * as CONSTANTS from '../../../constants'

const validation = ( state = {}, action ) => {
    switch (action.type) {
        case CONSTANTS.SET_USER_VALIDATION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default validation