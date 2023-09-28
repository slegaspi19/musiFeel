import Layout from '@/components/Layout';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '25px',
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
            margin: '0 auto'
        }
    },
    input: {
        margin: '15px'
    }

}))

const AddReview = ({ business }: any) => {
    const classes = useStyles();

    const [stars, setStars] = useState(3);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    function getCookie(name: string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleSubmit = () => {
        const csrftoken = getCookie('csrftoken');
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        }
        const body = {
            title,
            content: comment,
            stars,
            business: business.url,
        }
        const res = axios.post('http://localhost:8000/reviews/', body, config);
        console.log(res)
    }

    return (
        <Layout>
            <div className={classes.root}>
                <Typography variant='h3'>
                    Creating Review For: {business.name}
                </Typography>
            </div>
            <div className={classes.form}>
                <FormControl className={classes.input} fullWidth>
                    <InputLabel id='stars'>Stars Rating out of 5</InputLabel>
                    <Select
                        labelId='stars'
                        id='starsComponent'
                        label='Stars'
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={1.5}>1.5</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={2.5}>2.5</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={3.5}>3.5</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={4.5}>4.5</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.input} fullWidth>
                    <TextField
                        label='Title'
                        id='titleComponent'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl className={classes.input} fullWidth>
                    <TextField
                        label='Tell us about your experience here'
                        id='commentComponent'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        multiline
                        minRows={4}
                    />
                </FormControl>
                <Button variant='contained' color='primary' onClick={() => handleSubmit()}>Submit Review</Button>
            </div>
        </Layout>
    );
};

export default AddReview;


export async function getServerSideProps({query: slug}: any) {
    const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)

    return {
        props: {
            business: data.results[0] || null,
        }
    }
}