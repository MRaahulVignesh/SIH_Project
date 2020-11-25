import React,{ useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import fire,{db} from '../../../Config/fire.js';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { EditorFormatListBulleted } from 'material-ui/svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://fsb.zobj.net/crop.php?r=6e9_Zksm864wzPx8o-5WWharJ-QpneUHp2O5iffdu7WZkxvTk5iLJkeZRWHtKO2H6o7ta0ARzwrHlIFPFNrnKsowX6s-NXLte5ivIlqiUv1s5hGQjKIilB_yDSMmBRHc4X1r2jg0h6Zv7WNz)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    govt:false,
    notgovt:false,
  });

  const {email,password,loading,govt,notgovt,error} = values;
  const handleChange = name => event => {
    setValues({ ...values,[name]: event.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    setValues({ ...values,loading:true,error:false});
    fire.auth().signInWithEmailAndPassword(email, password).then((u)=>{console.log(u.user.uid)
                                                                      db.collection("buyer").doc(u.user.uid).get().then(doc => {
                                                                        const data = doc.data();
                                                                        console.log(data.fname+" "+data.lname);
                                                                        setName(data.fname+" "+data.lname)
                                                                        console.log(name)
                                                                        if(data.govt === true)
                                                                          setValues({ ...values,govt:true})
                                                                        else
                                                                          setValues({ ...values,notgovt:true})
                                                                      })
                                                                      setValues({ ...values,loading:false,error:false});
    }).catch((error) => {
        console.log(error);
        setValues({ ...values,loading:false,error:true});
      });
  }
  return (
    <div>
      {error?
        <Alert severity="error">Invalid Credentials! Please try again</Alert>
        :
        <div></div>
      }
      {govt?<Redirect to={{pathname:"/govtdashboard", state:{ welcome: true, name:name }}}/>:<div></div>}
      {notgovt?<Redirect to={{pathname:"/companydashboard", state:{ welcome:true, name:name }}}/>:<div></div>}
      {loading?<CircularProgress style={{position:"absolute",top:"40vh",left:"48vw"}}/>:<div></div>}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                type="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange("email")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => login(e)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}