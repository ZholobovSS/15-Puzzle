import { useState, useEffect } from 'react'

import { connect } from 'react-redux';
import * as ACTIONS from '../../redux/actions'

import { useSnackbar } from 'notistack';



const Notifications = ( {notifications, CState }  ) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [displayedNotification, setDisplayedNotification] = useState([])


    useEffect(() => {
        
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayedNotification.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, mykey) => {
                    if (options.onclose) {
                        options.onclose(event, reason, mykey);
                    }
                },
                onExited: (event, mykey) => {
                    // removen this snackbar from redux store
                    CState.removeSnackbar(mykey);
                    setDisplayedNotification(oldValue => [...oldValue.filter(key => key !== mykey)]);
                },
            });

            // keep track of snackbars that we've displayed
            setDisplayedNotification(oldValue => [...oldValue, key]);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar]);


    return null
}

const mapStateToProps = (store) => ({
    notifications: store.notifications
})

const mapDispatchToProps = (dispatch) => ({
    CState: {
        removeSnackbar: (mykey) => dispatch(ACTIONS.removeSnackbar(mykey))
    }
})

export default connect( mapStateToProps, mapDispatchToProps )(Notifications)