import React from 'react'
import { 
    Button,
    } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { connect } from 'react-redux'
import * as ACTIONS from '../../../redux/actions/'

const GameControl = ( {loadingInterface, currentGame, CState, setSort} ) => {    

    const startNewGame = () => {
        CState.setStartGame(Date.now())
        setSort()
    }

    return (
        <>
            {
                loadingInterface ?
                    <Skeleton animation="wave" variant="rect" width="100%" height={35} />
                :
                <Button disabled={ !!currentGame.startTime && !currentGame.endTime } size="large" onClick={startNewGame} variant="contained" color="primary">
                    Новая игра
                </Button>
            }
            
        </>
    )
}



const mapStateToProps = (store, ownProps) => ({
    loadingInterface: store.loading.skeleton,
    currentGame: store.user.stat.currentGame,
    setSort: ownProps.setSort
})

const mapDispatchToProps = dispatch => ({
    CState: {
        setStartGame: time => dispatch(ACTIONS.setStartGame(time)),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameControl)

