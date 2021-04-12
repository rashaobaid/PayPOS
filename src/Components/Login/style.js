import { makeStyles } from '@material-ui/core/styles';
import login from '../../image/login.jpg'
export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundImage: `url(${login})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '350px',
    width: '100%',
    backgroundColor: '#faf5f5',
    padding: '28px',
    justifyContent: "center",

  },
  error:{
  color:'red',
  maxWidth: '350px',
    width: '100%',
  },
  input: {
    margin: '10px 0',
    color: 'white'
  },
  submit: {
    height: ' 49px',
    borderRadius: '49px',
    color: '#fff',
    textTransform: 'uppercase',
    margin: '10px 0 0px',
    cursor: ' pointer',
    transition: '0.5s',
  },
  alert:{
    width: '100%',
  }

}));












