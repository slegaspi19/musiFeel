import axios from 'axios';
var cookie = require('cookie')

export default async (req: any, res: any) => {
    if (req.method === 'POST') {
        if (!req.headers.cookie) {
            return res.status(403).json({message: 'Not Authorized'})
        }

        try {
            const { refresh } = cookie.parse(req.headers.cookie);
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            const body = {
                refresh,
            }
            const { data } = await axios.post('http://localhost:8000/api/token/refresh/', body, config);
            if (data && data.access) {
                const userConfig = {
                    headers: {
                        'Authorization': 'Bearer ' + data.access
                    }
                }
                const { data: userData } = await axios.get('http://localhost:8000/api/user/', userConfig);
                res.status(200).json({ user: userData, access: data.access })
            } else {
                res.status(500).json({ message: 'Something went wrong' })
            }
        } catch(error: any)  {
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
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method ${req.method} is not allowed`});
    }
}