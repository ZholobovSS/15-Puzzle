import { combineReducers } from 'redux'

import bestGame from './BestGame/'
import currentGame from './CurrentGame/'
import generalInfo from './GeneralInfo/'


export default combineReducers( {
    bestGame,
    currentGame,
    generalInfo
} )