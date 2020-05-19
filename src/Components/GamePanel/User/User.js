import React, {useState} from 'react'
import useStyles from '../../../customHooks/useStyles'
import useValidation from '../../../customHooks/useValidation'
import { connect } from 'react-redux'
import { 
    Grid,
    Typography,
    Box,
    Button,
    TextField,
    } from '@material-ui/core'
import * as ACTIONS from '../../../redux/actions/'
import { Skeleton } from '@material-ui/lab';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

const createData = ( obj ) => {
    return {...obj}
}

const User = ({user, CState, loadingInterface}) => {
    
    const classes = useStyles();
    const [ userEmail, setuserEmail ] = useState('')
    const [ userName, setUserName ] = useState('')
    const [ userPass, setUserPass ] = useState('')
    const validation = useValidation;

    const dataTextFields = [
        createData(
                {   
                    error: user.validation.email.error,
                    id: "userEmail",
                    label: "E-mail",
                    type: "email",
                    onChange: e => setuserEmail( e.target.value.trim() ),
                    fullWidth: true,
                    helperText: user.validation.email.error ? user.validation.email.text : '' 
                }
                ),
        createData(
                {   
                    error: user.validation.name.error,
                    id: "userName",
                    label: "Имя",
                    onChange: e => setUserName( e.target.value.trim() ),
                    fullWidth: true,
                    helperText: user.validation.name.error ? user.validation.name.text : ''
                }
                ),
        createData(
                {   
                    error: user.validation.password.error,
                    id: "userPass",
                    label: "Пароль",
                    type: "password",
                    onChange: e => setUserPass( e.target.value.trim() ),
                    fullWidth: true,
                    helperText: user.validation.password.error ? user.validation.password.text : ''
                }
                ),
    ]

    const userSignIn = () => {
        let currentError = validation( userEmail, 'userName', userPass )
        if (Object.values(currentError).filter( el => el.error === true ).length === 0) {
            CState.userSignIn( userEmail, userName, userPass )
        }
        CState.userValidate(currentError)
    }

    const userSignUp = () => {
        let currentError = validation( userEmail, userName, userPass )
        if (Object.values(currentError).filter( el => el.error === true ).length === 0) {
            CState.userSignUp( userEmail, userName, userPass )
        } 

        CState.userValidate(currentError)
    }

    return (
        <Grid className={classes.authorization} alignItems="center" container direction="column">
            { loadingInterface ? <Skeleton animation="wave" variant="circle" width={30} height={30} /> : <AccountCircleOutlinedIcon fontSize="large" /> }
            
            <Box width={1} my={3}>
                { 
                    loadingInterface ? <Skeleton animation="wave" height={14} width="50%" style={{ margin: '0 auto' }} /> : <Typography align="center" >Здравствуйте</Typography>
                }
            </Box>

            { dataTextFields.map( el => (
                <Box key={el.id} width={1} my={1}>
                    { loadingInterface ? 
                        <Skeleton variant="rect" animation="wave" height={50} width="100%" />
                    :
                        <TextField
                            {...el}
                        />
                    }
                </Box>
            ))}

            <Box display="flex" flexDirection="column" width={1} my={1} mt={3} >
            {
                loadingInterface ?
                    <Skeleton variant="rect" animation="wave" height={35} width="100%" />
                :
                    <Button onClick={ userSignIn } variant="outlined" color="secondary">
                        Вход
                    </Button>
            }
            </Box>

            <Box display="flex" flexDirection="column" width={1} my={1}>
            {
                loadingInterface ?
                    <Skeleton variant="rect" animation="wave" height={35} width="100%" />
                :
                    <Button onClick={ userSignUp } variant="outlined" color="secondary">
                        Регистрация
                    </Button>
            }
            </Box>

        </Grid>
    )
}

const mapStateToProps = store => ({
    user: store.user,
    loadingInterface: store.loading.skeleton
})

const mapDispatchToProps = dispatch => ({
    CState: {
        userSignUp: (userEmail, userName, userPass) => dispatch( ACTIONS.userSignUp(userEmail, userName, userPass) ),
        userSignIn: (userEmail, userName, userPass) => dispatch( ACTIONS.userSignIn(userEmail, userName, userPass) ),
        userValidate: (errors) => dispatch( ACTIONS.userValidation(errors) )
        
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)