import React from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { v4 as uuidv4 } from 'uuid';


const createData = ( rusText, value ) => {
    return {
        rusText,
        value
    }
}

const timeFormat = time => {
    const timePatternString = [...'Hh Mm Ss']
    let timeFormatString = ''

    timePatternString.forEach( ch => {
        switch (ch) {
            case 'H':
                timeFormatString += Math.trunc( time / 3600 ).toString()
                break;
            case 'M':
                timeFormatString += Math.trunc( time / 60 ).toString()
                break;
            case 'S':
                timeFormatString += Math.ceil( time % 60 ).toString()
                break
            default:
                timeFormatString += ch
                break;
        }
    })
    return timeFormatString
}

const GeneralInfo = ( {generalInfo} ) => {

    const data = [
        createData( 'Количество завершенных игр:',  generalInfo.countOfGames),
        createData( 'Количество передвинутых плашек:',  generalInfo.countOfSteps),
        createData( 'Время в игре:',  timeFormat(generalInfo.spentTime))
    ]

    return (
        <List>
            { data.map( el => (
                <ListItem key={uuidv4()}>
                    <ListItemText primary={el.rusText} secondary={el.value} />
                </ListItem> 
            )) }
        </List>
      );
}


const mapStateToProps = store => ({
    generalInfo: store.user.stat.generalInfo
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo)