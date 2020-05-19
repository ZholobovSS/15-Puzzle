import * as CONSTANTS from '../../../constants'

const SkeletonReducer = (state = false, action) => {
    switch (action.type) {
        case CONSTANTS.SET_SKELETON:
            return action.payload
        default:
            return state
    }
}

export default SkeletonReducer