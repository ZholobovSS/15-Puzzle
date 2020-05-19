import React, { useEffect } from 'react'
import Page from './Components/Page/Page'
import { SnackbarProvider } from 'notistack'
import Backdrop from './Components/Backdrop/Backdrop'
import firebase from './base.js'
import { connect } from 'react-redux'
import * as ACTIONS from './redux/actions/'


function App( { CState } ) {


    useEffect( () => {
        let watchUserBestGame
        let watchBestGame
        let watchGeneralInfo

        firebase.auth().onAuthStateChanged( user => {
            if ( user ) {
                CState.setUserData(user.displayName, user.xa, user.uid)

                
                // watch user Best Game
                watchUserBestGame = firebase.database().ref('users/' + user.uid + '/bestGame/');
                watchUserBestGame.on('value', function(snapshot) {
                    CState.setBestGame(snapshot.val())
                });


                // watch leaderboard
                watchBestGame = firebase.database().ref('games').orderByChild('spentTime').limitToFirst(10) 
                watchBestGame.on('value', function(snapshot) {

                    let sortLeaderBoard = []
                    snapshot.forEach( child => {
                        sortLeaderBoard.push(child.val());
                    } )

                    CState.setLeaderboard(sortLeaderBoard);
                    
                });


                // watch user General Info
                watchGeneralInfo = firebase.database().ref( 'users/' + user.uid + '/generalInfo' )
                watchGeneralInfo.on( 'value', function(snapshot) {
                    CState.setGeneralInfo( snapshot.val() )
                })
                
            } else {
                watchUserBestGame && watchUserBestGame.off()
                watchBestGame && watchBestGame.off()
                watchGeneralInfo && watchGeneralInfo.off()
                CState.setUserData('', '', '')
            }
        })
    }, [])

    return (
        <SnackbarProvider maxSnack={3}>
            <Page />
            <Backdrop />
        </SnackbarProvider>
    );
}

const mapStateToProps = store => ({

})

const mapDispatchToProps = dispatch => ({
    CState: {
        setUserData: (name, token, uid) => dispatch( ACTIONS.setUserData(name, token, uid) ),
        setBestGame: bestGame => dispatch( ACTIONS.setBestGame(bestGame) ),
        setLeaderboard: leader => dispatch( ACTIONS.setLeaderboard(leader) ),
        setGeneralInfo: info => dispatch( ACTIONS.setGeneralInfo(info) )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
