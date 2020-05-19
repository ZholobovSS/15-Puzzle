import { combineReducers } from 'redux'

import data from './Data/'
import stat from './Stat/'
import validation from './Validation/'


export default combineReducers({
    data,
    stat,
    validation
})