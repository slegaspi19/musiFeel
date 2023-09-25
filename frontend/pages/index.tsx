import { Grid, Card, CardHeader, Avatar, makeStyles } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '25px auto',
        maxWidth: '95vw',
    }
}))


export default function Home({categories}: any) {
    const classes = useStyles();
    return (
        <Layout>
            <Grid container className={classes.root} spacing={3}>
                { categories.map((category: any) => (
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label='category'>
                                        C
                                    </Avatar>
                                }
                                title={`${category.name}`}
                                subheader={`See all ${category.name} businesses`}
                                />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getServerSideProps() {
    const { data } = await axios.get("http://127.0.0.1:8000/categories/");
    return {
        props: {
            categories: data.results,
        }
    }
    
}