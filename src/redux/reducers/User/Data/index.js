import * as CONSTANTS from '../../../constants'

const data = ( state = {}, action ) => {
    switch (action.type) {
        case CONSTANTS.SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default data