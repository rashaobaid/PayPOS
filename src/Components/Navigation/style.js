import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    nav: {
        backgroundColor: '#fff'
    },
    logo: {
        maxWidth: 200,
    },
    container: {
        display: 'flex',
        marginLeft: '4%',
        "& > *": {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            color: '#585858',
            textDecoration: 'none',
            fontSize: '13px',
            marginLeft: '2%',
        }
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        "& > *": {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            color: '#585858',
            textDecoration: 'none',
            fontSize: '12px',
            textTransform: 'none'
        }
    },
    avater:{
     padding:'5px'
    }
}));