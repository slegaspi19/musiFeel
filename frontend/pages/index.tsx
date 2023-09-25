import { Grid, Card, CardHeader, Avatar, makeStyles } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '25px auto',
        maxWidth: '95vw',
    }
}))


export default function Home() {
    const classes = useStyles();
    return (
        <Layout>
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label='category'>
                                    C
                                </Avatar>
                            }
                            title='Category1'
                            subheader='See all :#'
                            />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label='category'>
                                    C
                                </Avatar>
                            }
                            title='Category'
                            subheader='See all'
                            />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label='category'>
                                    C
                                </Avatar>
                            }
                            title='Category'
                            subheader='See all'
                            />
                    </Card>
                </Grid>
            </Grid>
            <p>
                What is going on here
            </p>
        </Layout>
    )
}
