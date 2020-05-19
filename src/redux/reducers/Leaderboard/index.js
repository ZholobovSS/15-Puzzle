import * as CONSTANTS from '../../constants'

const GameReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SET_LEADER_BOARD:

            return action.payload
            
        default:
            return state
    }
}

export default GameReducer