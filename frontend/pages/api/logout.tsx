var cookie = require('cookie')

export default async (req: any, res: any) => {
    res.setHeader('Set-Cookie', cookie.serialize('refresh', "", {httpOnly: true, secure: false, sameSite: 'strict', expires: new Date(0), path: '/'}))
    res.status(200).json({message: "User has been logged out"})
}