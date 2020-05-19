import React from 'react'
import { 
    Card,
    Box,
    CardContent,
    } from '@material-ui/core'

import useStyles from '../../customHooks/useStyles'
import User from './User/User'
import { connect  } from 'react-redux'
import GmaeInfo from './GameInfo/GameInfo'


const GamePanel = ({ user }) => {

    const classes = useStyles();
    return (
        <Card className={classes.height100} > 
            <CardContent className={classes.cardContentUser} >
                <Box py={3}>
                    { (user.token) ? <GmaeInfo />
                        : <User />
                    }
                </Box>

            </CardContent>
        </Card>
    )
}


const mapStateToProps = store => ({
    user: store.user.data
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel)
