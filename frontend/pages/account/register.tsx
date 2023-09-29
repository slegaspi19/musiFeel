import Layout from '@/components/Layout';
import AuthenticationContext from '@/context/AuthenticationContext';
import { Button, Card, CardContent, TextField, Typography, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '75px auto',
      maxWidth: '95vw'
    },
    form: {
      marginTop: '35px',
      [theme.breakpoints.down('sm')]: {
          width: '100%',
          padding: '0 10px',
      },
      [theme.breakpoints.up('md')]: {
          width: '50%',
      },
      margin: '0 auto',
    },
    title: {
        marginBottom: '8px',
    },
    input: {
        margin: '15px 0',
    },
    linkContainer: {
        'margin': '15px 0',
    },
    link: {
        color: '#0645AD',
        transition: '0.3s',
        '&:hover': {
            color: '#3366BB',
            transition: '0.3s'
        }
    }
  }))
  

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const classes = useStyles();

    const { register } = useContext(AuthenticationContext);

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (password !== password2) {
            console.error("Passwords do not match");
            return;
        }
        register({ username, email, password })
    }
  
    return (
    <Layout>
        <div className={classes.root}>
            <div className={classes.form}>
                <Typography variant='h3' className={classes.title}>Register</Typography>
                <Card>
                    <CardContent>
                        <form onSubmit={submitHandler}>
                            <div className={classes.input}>
                                <TextField label='Username' fullWidth onChange={e => setUsername(e.target.value)} value={username} />
                            </div>

                            <div className={classes.input}>
                                <TextField label='Email' fullWidth onChange={e => setEmail(e.target.value)} value={email} />
                            </div>

                            <div className={classes.input}>
                                <TextField label='Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword(e.target.value)} value={password} />
                            </div>

                            <div className={classes.input}>
                                <TextField label='Confirm Password' inputProps={{ 'type': 'password' }} fullWidth onChange={e => setPassword2(e.target.value)} value={password2} />
                            </div>

                            <div className={classes.input}>
                                <Button variant='contained' color='primary' type='submit'>Register</Button>
                            </div>

                            <div className={classes.linkContainer}>
                                <Link legacyBehavior href='/account/login'>
                                    <a className={classes.link}>Already have an account? Sign In</a>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
        </Layout>
    );
};

export default RegisterPage;