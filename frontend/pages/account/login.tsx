import Layout from '@/components/Layout';
import React, { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';



const useStyles = makeStyles((theme) => ({
    root: {
        margin: '75px auto',
        maxWidth: '95vw',
    },
    form: {
        marginTop: '35px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '0 10px'
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
        margin: '15px 0',
    },
    link: {
        color: '#0645AD',
        transition: '0.3s',
        '&:hover': {
            color: '#3366BB',
            transition: '0.3s',
        },
    },
}));

const LoginPage = () => {
    const classes = useStyles();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Layout>
            <div className={classes.root}>
                <div className={classes.form}>
                    <Typography variant='h3' className={classes.title}>Login</Typography>
                    <Card>
                        <CardContent>
                            <form>
                                <div className={classes.input}>
                                    <TextField label='Username' fullWidth value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className={classes.input}>
                                    <TextField label='Password' inputProps={{'type': 'password'}} fullWidth value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className={classes.input}>
                                    <Button variant='contained' color='primary'>Login</Button>
                                </div>
                                <div className={classes.linkContainer}> 
                                    <Link legacyBehavior href='account/register' >
                                        <a className={classes.link}>Don't have an account? Sign up!</a>
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

export default LoginPage;