import React, {useEffect, useRef} from 'react'
import useStyles from '../../customHooks/useStyles'
import { 
    Grid,
    Card,
    Box,
    CardContent,
    Fade
    } from '@material-ui/core'
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import * as ACTIONS from '../../redux/actions'
import clsx from 'clsx'
import GameControl from '../GamePanel/GameControl/GameControl'
import usePuzzle from '../../customHooks/usePuzzle'



const GameTable = ({currentGame, loadingInterface, CState}) => {

    const classes = useStyles();
    const [ puzzles, setPuzzlesSize, setSort, setStep ] = usePuzzle()
    const gameTable = useRef(null);
    
    // Init puzzle size and set sort
    useEffect( () => {

        gameTable && setPuzzlesSize(gameTable.current.offsetWidth/4 - 17)

    }, [gameTable])

    // Actions if user win
    useEffect( () => {

        if ( currentGame.isWin ) {
            CState.setEndGame(Date.now())
            CState.enqueueSnackbar({
                message: 'Поздравляем! Вы выиграли!',
                options: {
                    key: uuidv4(),
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                },
            });
        }
    }, [currentGame.isWin] )

    // Puzzle motion's handler
    const handleDrag = (e, ui, el, id) => {


        if ( (Math.abs(ui.x) > (el.margin + el.size) / 2) || 
             (Math.abs(ui.y) > (el.margin + el.size) / 2)  
        ){
            CState.setCountOfSteps(currentGame.countOfSteps + 1)
            setStep(id)
        }
    };


    return (
       
        <Card className={classes.gameTableWr} > 
             <Fade in={!loadingInterface} >
            <CardContent className={classes.cardContent} >
                


                <Grid ref={gameTable} className={classes.gameTable} container > 
                    
                    { 
                        puzzles.map( (el, id) => ( 
                            <Draggable
                            disabled={ !currentGame.startTime || ( currentGame.startTime && currentGame.endTime ) }
                            key={el.key}
                            bounds={{
                                ...el.bounds
                            }}
                            position={{
                                x: el.x, 
                                y: el.y
                            }}
                            
                            onStop={(e, ui) => { handleDrag(e, ui, el, id) }}
                            ><Box 
                                className={clsx({
                                    [classes.puzzles]: true,
                                    'red': el.id === undefined,
                                    'green': el.id === id
                                    })}
                                width={el.size}
                                height={el.size}
                                
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                m={`${el.margin}px`}
                            >
                            { `${(el.id + 1).toString()}`}
                            </Box></Draggable>
                        ))
                    }
                   
                        

                        
                </Grid>
                <Box width={1} display="flex" justifyContent="center" py={3}>
                    <GameControl setSort={setSort} />
                </Box>
            </CardContent>
            
             </Fade>
        </Card>
        
    )
}

const mapStateToProps = (store) => ({
    currentGame: store.user.stat.currentGame,
    loadingInterface: store.loading.skeleton
})

const mapDispatchToProps = (dispatch) => ({
    CState: {
        enqueueSnackbar: (...args) => dispatch(ACTIONS.enqueueSnackbar(...args)),
        setEndGame: time => dispatch(ACTIONS.setEndGame(time)),
        setCountOfSteps: steps => dispatch( ACTIONS.setCountOfSteps(steps) ),
        setIsWin: isWin => dispatch( ACTIONS.setIsWin(isWin) )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameTable)