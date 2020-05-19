import React from 'react'
import { connect } from 'react-redux'
import useStyles from '../../customHooks/useStyles'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const BackdropComp = ( { backdrop } ) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

const mapStateToProps = store => ({
    backdrop: store.loading.backdrop
})

export default connect(mapStateToProps, null)(BackdropComp)