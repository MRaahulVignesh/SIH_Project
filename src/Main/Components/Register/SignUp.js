import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fire, { db } from  '../../../Config/fire.js';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({  
      fname: "",
      lname: "",
      email: "",
      password: "",
      loading: false,
      govt:false,
      submit: false,
      error: false,
      errorMessage: ""
  });

  const {fname,lname,email,password,loading,govt,submit,error,errorMessage} = values;
  const handleChange = name => event => {
    setValues({ ...values,[name]: event.target.value });
  };
  const register = (e) => {
    e.preventDefault();
    setValues({ ...values,loading:true,error:false});
    var passw =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(fname.length!==0 && lname.length!==0)
      {
        if(email.includes("@") && (email.includes(".com")||email.includes(".co.in")||email.includes(".org")||email.includes(".net")))
          {
            if(password.match(passw))
              {
                fire.auth().createUserWithEmailAndPassword(email, password).then((u)=>{db.collection("buyer").doc(u.user.uid).set({
                fname:fname,lname:lname,email:email,govt:govt}).then(function() {
                  console.log("Document successfully written!");
                  setValues({ ...values,loading:false,submit:true});
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    setValues({ ...values,loading:false,error:true});
                });})
                .catch((error) => {
                    console.log(error);
                })
              }else{
                setValues({ ...values,loading:false,error:true,errorMessage:"Enter a valid password (Password should be 7-15 charcters long and should contain both Upper and Lower case characters along with special characters"});
              }
            }else{
              setValues({ ...values,loading:false,error:true,errorMessage:"Enter a valid email"});
            }
        }else{
          setValues({ ...values,loading:false,error:true,errorMessage:"Please fill in your name"});
      }
  }
  return (
    <div>
      {error?
        <Alert severity="error">{errorMessage}</Alert>
        :
        <div></div>
      }
      {submit?<Redirect to="/login"/>:<div></div>}
      {loading?<CircularProgress style={{position:"absolute",top:"40vh",left:"48vw"}}/>:<div></div>}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange("fname")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange("lname")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                onChange={(e) => {setValues({...values,govt:true})}}
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Govt. of India employee"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => register(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}