export default (req:any, res:any) => {
    // Clear the token by setting an expired cookie
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
    return res.status(200).json({ success: true });
};