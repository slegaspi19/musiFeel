import axios from "axios"

export default async (req: any, res: any) => {
    let playlist = null;
    //change sec to true in prod

    if (req.method === 'POST') {
        const { link } = req.body;

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const body = {
            link,
        }

        try {
            const { data } = await axios.post('http://localhost:8000/test/', body, config);
            playlist = data;
        } catch (error: any) {
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
                return res.status(401).json({message: error.response.data.detail})
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error('Error', error.message);
            }
            console.error(error.config);

            return res.status(500).json({message: 'Something went wrong'})
        }
        if (playlist) {
            res.status(200).json(playlist);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method${req.method} is not allowed`});
    }
}