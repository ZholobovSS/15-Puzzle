import React from 'react'
import * as CONSTANTS from '../constants'
import firebase from '../../base.js'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core/'


// NOTIFICATION
export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: CONSTANTS.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = key => ({
    type: CONSTANTS.CLOSE_SNACKBAR,
        dismissAll: !key, // dismiss all if no key has been defined
        key,
});

export const removeSnackbar = key => ({
    type: CONSTANTS.REMOVE_SNACKBAR,
    key,
});


// USER

export const userSignUp = (userEmail = '', userName = '', userPass = '') => async (dispatch, getState) => {
        dispatch(setBackdrop(true))
        await firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
            .then( data => {
                firebase.auth().currentUser.updateProfile({
                    displayName: userName,  
                })

                firebase.database().ref('users/' + data.user.uid).set({
                    generalInfo: {
                        countOfGames: 0,
                        countOfSteps: 0,
                        spentTime: 0,
                    },
                    bestGame: {
                        date: 0,
                        spentTime: 0,
                        countOfSteps: 0,
                    },
                });
            })
            .then( function() { 

                dispatch(enqueueSnackbar({
                    message: `${userName}, Вы успешно зарегистрированы!`,
                    options: {
                        key: uuidv4(),
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    }
                })) 
            })
            .catch( e => {
                dispatch(enqueueSnackbar({
                    message: e.message,
                    options: {
                        key: uuidv4(),
                        persist: true,
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                        action: key => (
                            <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => dispatch(closeSnackbar(key))}>
                               Закрыть 
                            </Button>
                        ),
                    }
                }))
            })
        const { user: { data: { token, uid } } } = getState()
        dispatch( setUserData(userName, token, uid) )
        dispatch(setBackdrop(false))
    }


export const userSignIn = (userEmail = '', userName = '', userPass = '') => async dispatch => {
    dispatch(setBackdrop(true))
    await firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .catch( e => {
        dispatch(enqueueSnackbar({
            message: e.message,
            options: {
                key: uuidv4(),
                persist: true,
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                action: key => (
                    <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => dispatch(closeSnackbar(key))}>
                       Закрыть 
                    </Button>
                ),
            }
        }))
    })
    dispatch(setBackdrop(false))
}

export const userSignOut = () => async (dispatch, getState) => {
    let { user: { data: {name} } } = getState();
    firebase.auth().signOut().then(function() {
        dispatch(enqueueSnackbar({
            message: `${name}, Вы успешно вышли из аккаунта!`,
            options: {
                key: uuidv4(),
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        })) 
        dispatch(clearStore())
    }).catch(function(error) {
        
    });
}

export const clearStore = () => ({
    type: CONSTANTS.USER_SIGN_OUT
})


export const userValidation = (errors) => ({
        type: CONSTANTS.SET_USER_VALIDATION,
        payload: errors
})

export const setUserData = (name, token, uid) => dispatch => {
    dispatch({
        type: CONSTANTS.SET_USER_DATA,
        payload: {
            name, 
            token,
            uid
        }
    })
    dispatch(setBackdrop(false))
    dispatch(setSkeleton(false))
}

export const setStartGame = time => ({
    type: CONSTANTS.SET_START_GAME,
    payload: {
        startTime: time,
        endTime: 0,
        isWin: false,
        countOfSteps: 0,
    }
})

export const setEndGame = time => async ( dispatch, getState) => {
    dispatch( {
        type: CONSTANTS.SET_START_GAME,
        payload: {
            endTime: time
        }
    })

    let {   user: { stat: { currentGame } }, 
            user: { data }, 
            user: { stat: { bestGame } },
            user: { stat: { generalInfo } } } = getState()

    // Get a key for a new Post.
    if ( data.token ) {
        try {
            let newGameKey = firebase.database().ref('users/' + data.uid).child('games').push().key;
            // Write the new post's data simultaneously in the posts list and the user's post list.
            let today = new Date()
            let writeGame = {
                date: `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`,
                countOfSteps: currentGame.countOfSteps,
                spentTime: (currentGame.endTime - currentGame.startTime) / 1000
            }

            generalInfo.countOfSteps += writeGame.countOfSteps
            generalInfo.spentTime += writeGame.spentTime
            generalInfo.countOfGames++



            let updates = {};
            updates['games/' + newGameKey] = { ...writeGame, user: data.name};
            updates['users/' + data.uid + '/games/' + newGameKey] = writeGame;
            updates['users/' + data.uid + '/generalInfo'] = generalInfo;
            if ( !bestGame.spentTime || bestGame.spentTime > writeGame.spentTime ) {
                updates['users/' + data.uid + '/bestGame/'] = writeGame;
            }


            firebase.database().ref().update(updates).catch( e => {
                dispatch(enqueueSnackbar({
                message: 'При попытке записи результата произошла ошибка: ' + e.message,
                options: {
                    key: uuidv4(),
                    persist: true,
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    action: key => (
                        <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => dispatch(closeSnackbar(key))}>
                           Закрыть 
                        </Button>
                    ),
                }
                }))
            });

        } catch(e) {
            // statements
            console.log(e);
        }
    }
}

export const setCountOfSteps = countOfSteps => ({
    type: CONSTANTS.SET_COUNT_OF_STEPS,
    payload: {
        countOfSteps
    }
})

export const setIsWin = isWin => ({
    type: CONSTANTS.SET_ISWIN,
    payload: {
        isWin
    }
})

export const setBestGame = bestGame => ({
    type: CONSTANTS.SET_BEST_GAME,
    payload: {
        ...bestGame
    }
})

export const setGeneralInfo = info => ({
    type: CONSTANTS.SET_GENERAL_INFO,
    payload: info
})


// LOADING

export const setBackdrop = ( type ) => ({
    type: CONSTANTS.SET_BACKDROP,
    payload: type
})

export const setSkeleton = ( type ) => ({
    type: CONSTANTS.SET_SKELETON,
    payload: type
})


// LEADERBOARD 

export const setLeaderboard = leader => ({
    type: CONSTANTS.SET_LEADER_BOARD,
    payload: leader
})

