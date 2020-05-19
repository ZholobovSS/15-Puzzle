import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useStyles from '../../../../customHooks/useStyles'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';


function Row(props) {
  const { row, position } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

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

  return (
    <React.Fragment>
      <TableRow className={classes.leaderboard}>
        <TableCell style={{padding: 0}}>
          <IconButton  aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`${position}. ${row.user}`}
        </TableCell>
        <TableCell align="right">
            { timeFormat(row.spentTime) }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box m={1} mb={4} >
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Шагов</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {row.date}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.countOfSteps}
                        </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = ({leaderboard}) => {

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Имя</TableCell>
                        <TableCell>Время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderboard.map((row, id) => (
                        <Row key={uuidv4()} position={id + 1} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = store => ({
    leaderboard: store.leaderboard
})

export default connect(mapStateToProps, null)(CollapsibleTable)
