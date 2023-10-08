import Layout from '@/components/Layout';
import { Button, Card, CardContent, TextField, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '75px auto',
      maxWidth: '95vw'
    },
    input: {
        margin: '15px 0',
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
}));


const Playlists = () => {
    const classes = useStyles();
    const router = useRouter();
    
    const [link, setLink] = useState('');

    const submitHandler = (e: any) => {
        e.preventDefault();
        router.push(`/playlists/${link}`);
    }
    
    return (
        <Layout>
            <div className={classes.root}>
                <div className={classes.form}>
                    <Typography variant='h3'>Spotify Link</Typography>
                    <Card>
                        <CardContent>
                            <form onSubmit={submitHandler}>
                                    <div className={classes.input}>
                                        <TextField label='Link' fullWidth onChange={e => setLink(e.target.value)} value={link}/>
                                    </div>
                                    <div className={classes.input}>
                                        <Button variant='contained' color='primary' type='submit'>View Playlist</Button>
                                    </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Playlists;