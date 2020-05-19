import React from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { v4 as uuidv4 } from 'uuid';

const timeFormat = time => {
    const timePatternString = [...'Mm Ss']
    let timeFormatString = ''

    timePatternString.forEach( ch => {
        switch (ch) {
            case 'M':
                timeFormatString += Math.trunc( time / 60 ).toString()
                break;
            case 'S':
                timeFormatString += ( time % 60 ).toFixed(2)
                break
            default:
                timeFormatString += ch
                break;
        }
    })
    return timeFormatString
}

const createData = ( rusText, value ) => {
    return {
        rusText,
        value
    }
}

const BestGame = ( { bestGame } ) => {
    const data = [
        createData( 'Затраченное время:',  timeFormat(bestGame.spentTime)),
        createData( 'Количество передвинутых плашек:',  bestGame.countOfSteps),
        createData( 'Дата:',  bestGame.date)
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
    bestGame: store.user.stat.bestGame
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BestGame)