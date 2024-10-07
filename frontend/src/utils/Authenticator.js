import Cookies from 'js-cookie';
import jwtDecoder from 'jwt-decode';

const authenticator = ()=>{
    const token = Cookies.get('token');
    if(!token) return false;
    
    const isExpire = jwtDecoder(token);
    if(Date.now() >= isExpire.exp *1000 ){
        Cookies.remove('token');
        return false;
    }

    return true;
}

export default authenticator