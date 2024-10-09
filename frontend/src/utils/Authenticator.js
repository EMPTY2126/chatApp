import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const authenticator = () => {
    const token = Cookies.get('token');
    if (!token) return false;

    const isExpire = jwtDecode(token);  // Decode token
    if (Date.now() >= isExpire.exp * 1000) {
        Cookies.remove('token');  // Remove expired token
        return false;
    }

    return true;  // Token is valid
}

export default authenticator;
