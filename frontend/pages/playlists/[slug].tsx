import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'
import { makeStyles } from '@material-ui/core';
import Layout from '@/components/Layout';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '75px auto',
      maxWidth: '95vw'
    },
    canvas: {
        maxWidth: '50vw',
        maxHeight: '50vh',
        margin: '0 auto'
    }
}));

const Playlist = ({slug, playlist}: any) => {
    const chartRef = useRef(null) as any;
    const chartInstance = useRef(null) as any;

    const classes = useStyles();

    
    useEffect(() => {
        delete playlist.emotions.neutral;
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: Object.keys(playlist.emotions),
                datasets: [
                    {
                        data: Object.values(playlist.emotions),
                    }
                ]
            }
        });
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        }
    }, []);

    return (
        <Layout>
            <div className={classes.root}>
                <div className={classes.canvas}>
                    <canvas ref={chartRef}/>
                </div>
            </div>
        </Layout>
    );
};

export default Playlist;

export async function getServerSideProps({ query: {slug} }: any) {
    let playlist = null;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const body = {
        "link": slug,
    }

    try {
        const { data } = await axios.post('http://localhost:3000/api/playlist/', body, config);
        // console.log(data);
        playlist = data;

    } catch (error: any) {
        if (error.response && error.response.data) {
            console.log(error.response.data.message);
            return;
        } else if (error.request) {
            console.log("Something went wrong");
            return;
        } else {
            console.log("Something went wrong");
            return;
        }
    }

    return {
        props: {
            slug,
            playlist
        }
    }
}