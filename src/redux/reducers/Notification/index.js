import * as CONTANST from '../../constants'

const notifications = (state = [], action) => {
    switch (action.type) {
        case CONTANST.ENQUEUE_SNACKBAR:
            return [
                ...state,
                {
                    key: action.key,
                    ...action.notification,
                },    
            ]
        case CONTANST.CLOSE_SNACKBAR:
            return state.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                ))
            

        case CONTANST.REMOVE_SNACKBAR:
            return state.filter(
                    notification => notification.key !== action.key,
                )
            
        default:
            return state;
    }
};


export default notifications