import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';

dotenv.config();


// Auth0 configuration for Google Auth
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL,
  };



// Logout function for manual authentication (JWT-based)
const logout = (req, res) => {
    // Clear the JWT token from cookies
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({ isSuccess: true, msg: 'User logged out successfully' });
};


// Google Auth Route (Auth0)
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in with Google' : 'Logged out');
});


export default {
    config,
    logout
}