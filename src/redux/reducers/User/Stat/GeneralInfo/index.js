import * as CONSTANTS from '../../../../constants'

const generalInfo = ( state = {}, action ) => {
    switch (action.type) {
        case CONSTANTS.SET_GENERAL_INFO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default generalInfo