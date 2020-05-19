import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    Grid,
    Button
} from '@material-ui/core/';
import useStyles from '../../../customHooks/useStyles'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import {connect} from 'react-redux'
import GeneralInfo from './GeneralInfo/GeneralInfo'
import BestGame from './BestGame/BestGame'
import Leaderboard from './Leaderboard/Leaderboard'
import * as ACTIONS from '../../../redux/actions/'


function TabPanel(props) {
    
    const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const GameInfo = ( {user, CState} ) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const userSignOut = () => {
        CState.userSignOut()
    }

    return (
        <div>
            <Grid className={classes.authorization} alignItems="center" container direction="column">
                <AccountCircleOutlinedIcon fontSize="large" />
                <Box width={1} my={2}>
                    <Typography align="center" >{user.name}</Typography>
                    <Box width={1} display="flex" justifyContent="center" > <Button onClick={userSignOut} color="secondary">Выход</Button> </Box>
                </Box>
            </Grid>

            
            <AppBar className={classes.userTabs} position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Общая статистика" {...a11yProps(0)} />
                    <Tab label="Лучший результат" {...a11yProps(1)} />
                    <Tab label="Таблица лидеров" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <GeneralInfo />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <BestGame />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Leaderboard />
                </TabPanel>
          </SwipeableViews>
        </div>
    );
}

const mapStateToProps = store => ({
    user: store.user.data
})

const mapDispatchToProps = dispatch => ({
    CState: {
        userSignOut: () => dispatch( ACTIONS.userSignOut() )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo)