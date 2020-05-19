import * as CONSTANTS from '../../../../constants'

const currentGame = ( state = {}, action ) => {
    switch (action.type) {
        case CONSTANTS.SET_START_GAME:
            return {
                ...state,
                ...action.payload
            }
        case CONSTANTS.SET_END_GAME:
            return {
                ...state,
                ...action.payload
            }
        case CONSTANTS.SET_COUNT_OF_STEPS:
            return {
                ...state,
                ...action.payload
            }

        case CONSTANTS.SET_ISWIN:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default currentGame