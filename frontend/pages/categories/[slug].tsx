import React from "react";
import Layout from '../../components/Layout'
import axios from "axios";
import { Box, Card, CardContent, Grid, Typography, Link, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '25px',
        maxWdith: '95vw',
    },
    subtitle: {
        color: 'grey',
    },
    card: {
        cursor: 'pointer',
    }
}))

const Id = ({ category }: any) => {
    const classes = useStyles();

    const router = useRouter();

    const handleBusiness = business => {
        router.push(`/business/${business.slug}`)
    }
    return (
        <Layout>
            <Grid container className={classes.root}>
                <Grid item xs={12} md={3}>
                    todo filters
                </Grid>
                <Grid item xs={12} md={9}>
                    {category.business.map((business: any) => (
                        <Card className={classes.card} onClick={() => handleBusiness(business)}>
                            <Box>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5">{business.name}</Typography>
                                            <Typography variant="subtitle1">{business.price_range}</Typography>
                                            <Link variant="subtitle1" href={business.website}>{business.website}</Link>
                                            <Typography variant="subtitle1">{business.phone}</Typography>
                                            <Typography variant="subtitle1" className={classes.subtitle}>{business.desc}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h5">Todo Reviews</Typography>
                                            <Typography variant="subtitle1">{business.hours}</Typography>
                                            <Typography variant="subtitle1">{business.region}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Id;

export async function getServerSideProps({query: {slug}}: any) {
    const { data } = await axios.get(`http://127.0.0.1:8000/categories/?slug=${slug}`);
    return {
        props: {
            category: data.results[0] || null,
        }
    }
    
}