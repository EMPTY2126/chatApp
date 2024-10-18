import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const authenticator = () => {
    const token = Cookies.get('token');
    if (!token) return false;

    const user = jwtDecode(token);  // Decode token
    if (Date.now() >= user.exp * 1000) {
        Cookies.remove('token');  // Remove expired token
        return false;
    }
    
    return {
        flag: true,
        userId: user.user.userId
    };
}

export default authenticator;
