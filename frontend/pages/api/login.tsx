import axios from "axios"
var cookie = require('cookie')

export default async (req: any, res: any) => {
    let accessToken = null;
    //change sec to true in prod

    if (req.method === 'POST') {
        const { username, password } = req.body;

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const body = {
            username,
            password,
        }

        try {
            const { data: accessResponse } = await axios.post('http://localhost:8000/api/token/', body, config);
            accessToken = accessResponse.access;
        res.setHeader('Set-Cookie', cookie.serialize('refresh', accessResponse.refresh, {httpOnly: true, secure: false, sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/'}))
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
        if (accessToken) {
            const userConfig = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }

            const { data: userData } = await axios.get('http://localhost:8000/api/user/', userConfig);
            res.status(200).json({user: userData, access: accessToken})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method${req.method} is not allowed`});
    }
}