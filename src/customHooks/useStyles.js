import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '100vh'
    },
    gameTableWr: {
        width: '100%',
        padding: `${theme.spacing(3)}px !important`,
    },
    gameTable: {
        border: '1px solid #aaa',
        borderRadius: 16,
        overflow: 'hidden',
        padding: theme.spacing(1.5),
        position: 'relative',
        zIndex: 100,
    },
    puzzles: {
        border: '1px solid #aaa',
        overflow: 'hidden',
        borderRadius: 8,
        fontSize: '1.5rem',
        background: 'transparent',
        cursor: 'pointer',
        userSelect: 'none',
         zIndex: 20,
        '&.red': {
            background: 'rgba(255,0,0,.5)',
            zIndex: 10,
            opacity: 0
        },
        '&.green': {
            background: 'rgba(0,255,0,.5)',
        }
    },
    height100: {
        height: '100%'
    },
    cardContentUser: {
        maxWidth: 290,
        margin: '0 auto',
        position: 'relative',
    },
    root: {
        flexGrow: 1,
        minHeight: '100vh',
    },
    control: {
        padding: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1 + '!important',
        color: '#fff',
    },
    userTabs: {
        background: 'unset !important',
        boxShadow: 'none !important'
    }, 
    leaderboard: {
        '& > *': {
            borderBottom: 'unset !important',
        },
    }
}));

export default useStyles