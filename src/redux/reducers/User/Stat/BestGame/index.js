import * as CONSTANTS from '../../../../constants'

const bestGame = ( state = {}, action ) => {
    switch (action.type) {
        case CONSTANTS.SET_BEST_GAME:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default bestGame