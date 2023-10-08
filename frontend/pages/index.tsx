import { Grid, Card, CardHeader, Avatar, makeStyles, Button } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: '25px auto',
        maxWidth: '95vw',
    },
    playlist: {
        margin: 'auto'
    }
}))



export default function Home() {
    const router = useRouter();
    const classes = useStyles();
    return(
        <Layout>
            <Grid container className={classes.root} spacing={3}>
                <Button variant="outlined" color="primary" className={classes.playlist} onClick={() => {router.push('/playlists')}}>Playlists</Button>
            </Grid>
        </Layout>
    )
}

// export async function getServerSideProps() {
//     const { data } = await axios.get("http://127.0.0.1:8000/categories/");
//     return {
//         props: {
//             categories: data.results,
//         }
//     }
// }