import React, { useState} from "react";
import Layout from '../../components/Layout';
import AverageReview from '../../components/AverageReview';
import axios from "axios";
import { Box, Card, CardContent, Divider, Grid, Typography, Link, makeStyles, MenuItem, FormControl, InputLabel, Select, Button } from "@material-ui/core";
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
    },
    filterContainer: {
        margin: '0 25px'
    },
    clearFilters: {
        marginTop: '25px'
    }
}))

const Id = ({ category, averageReviews }: any) => {
    const classes = useStyles();

    const router = useRouter();

    const [price, setPrice] = useState("");
    const [numReviews, setNumReviews] = useState("");
    const [avgReview, setAvgReview] = useState("");

    const handleBusiness = (business: any) => {
        router.push(`/business/${business.slug}`)
    }

    const handleClearFilters = () => {
        setPrice("");
        setNumReviews("");
        setAvgReview("");
    }

    return (
        <Layout>
            <Grid container className={classes.root}>
                <Grid item xs={12} md={3}>
                    <Box className={classes.filterContainer}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Filter the Results
                                </Typography>
                                <Divider />
                            </Grid>
                        </Grid>
                        
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='price'>
                                        Price
                                    </InputLabel>
                                    <Select
                                        labelId='price'
                                        id='priceInput'
                                        label='Price'
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={'$'}>Very Cheap</MenuItem>
                                        <MenuItem value={'$$'}>Cheap</MenuItem>
                                        <MenuItem value={'$$$'}>Moderate</MenuItem>
                                        <MenuItem value={'$$$$'}>Expensive</MenuItem>
                                        <MenuItem value={'$$$$$'}>Very Expensive</MenuItem>
                                    </Select>
                                </FormControl>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='numReviews'>
                                        Number of Reviews
                                    </InputLabel>
                                    <Select
                                        labelId='numReviews'
                                        id='numReviewsInpute'
                                        label='Number of Reviews'
                                        value={numReviews}
                                        onChange={(e) => {
                                            setNumReviews(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={5}>5+</MenuItem>
                                        <MenuItem value={10}>10+</MenuItem>
                                        <MenuItem value={15}>15+</MenuItem>
                                    </Select>
                                </FormControl>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='avgReview'>
                                        Average Review
                                    </InputLabel>
                                    <Select
                                        labelId='avgReview'
                                        id='avgReviewInput'
                                        label='avgReview'
                                        value={avgReview}
                                        onChange={(e) => {
                                            setAvgReview(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={3}>3+ Stars</MenuItem>
                                        <MenuItem value={4}>4+ Stars</MenuItem>
                                        <MenuItem value={5}>5+ Stars</MenuItem>
                                    </Select>
                                </FormControl>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="secondary" onClick={() => handleClearFilters()} className={classes.clearFilters}>
                                    Clear Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    {category.business.map((business: any) => (
                        (!price || price === business.price_range) && (!numReviews || numReviews <= business.reviews.length) && (!avgReview || averageReviews[business.url] >= avgReview) && (
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
                                            <AverageReview value={averageReviews[business.url]}/>
                                            <Typography variant="subtitle1">{business.hours}</Typography>
                                            <Typography variant="subtitle1">{business.region}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                        </Card>
                        )
                    ))}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Id;

export async function getServerSideProps({ query: {slug} }: any) {
    const { data } = await axios.get(`http://localhost:8000/categories?slug=${slug}`)
  
    let avgReviews = {}
  
    if (data && data.results && data.results[0].business) {
      for (let i = 0; i < data.results[0].business.length; i++) {
        let totalReviewsStars = 0;
        for (let j = 0; j < data.results[0].business[i].reviews.length; j++) {
          totalReviewsStars = totalReviewsStars + Number(data.results[0].business[i].reviews[j].stars)
        }
  
        const inverse = 1 / 2
  
        avgReviews[data.results[0].business[i].url] = Math.round((totalReviewsStars / data.results[0].business[i].reviews.length) / inverse) * inverse
      }
    }
  
    console.log(avgReviews)
  
    return {
      props: {
        category: data.results[0] || null,
        averageReviews: avgReviews
      }
    }
  }