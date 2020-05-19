import React from 'react'
import useStyles from '../../customHooks/useStyles'
import { 
    Container, 
    Grid,
    Typography,
    } from '@material-ui/core'

import GamePanel from '../GamePanel/GamePanel'
import GameTable from '../GameTable/GameTable'
import { connect } from 'react-redux'
import Notifications from '../Notifications/Notifications'


const Page = (  ) => {
    const classes = useStyles()
   
    // console.log(puzzlesFix);
    //console.log(puzzles);

    return (
        <Container fixed className={classes.container} maxWidth="md">
            <Grid container direction="column" justify="center" className={classes.root} spacing={2}>
                
                <Grid item container xs={12} >
                    <Typography variant="h3" component="h1" gutterBottom>
                        Пятнашки
                    </Typography>
                </Grid>

                <Grid item container xs={12} spacing={3} > 
                    <Grid item container xs={7} direction="row" >
                        <GameTable />
                    </Grid>

                    <Grid item container xs={5} direction="column"  >
                        <GamePanel /> 
                    </Grid>
                </Grid>

                <Notifications />

            </Grid>
        </Container>
    )
}

const mapStateToProps = (store) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Page) 