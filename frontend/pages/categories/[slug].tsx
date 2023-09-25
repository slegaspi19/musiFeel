import React from "react";
import Layout from '../../components/Layout'
import { Box, Card, CardContent, Grid, Typography, Link } from "@material-ui/core";



const Id = () => {
    return (
        <Layout>
            <Grid container>
                <Grid item xs={12} md={3}>
                    todo filters
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card>
                        <Box>
                            <CardContent>
                                <Grid item xs={6}>
                                    <Typography variant="h5">Business Name</Typography>
                                    <Typography variant="subtitle1">$$$</Typography>
                                    <Link variant="subtitle1" href="https:/localhost:3000">Website</Link>
                                    <Typography variant="subtitle1">Business Phone</Typography>
                                    <Typography variant="subtitle1">Description</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">Todo Reviews</Typography>
                                    <Typography variant="subtitle1">Business Hours</Typography>
                                    <Typography variant="subtitle1">Address</Typography>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            Slug
        </Layout>
    )
}

export default Id;