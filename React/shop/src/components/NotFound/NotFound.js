import image404 from '../../assets/images/404fail.svg';
import { useLocation } from 'react-router-dom';

const NotFound = (props) =>
{
    let location = useLocation();

    return (
        <div style={{textAlign: "center"}}>
            <img src={image404} alt="notfound" style={{height: "100px"}}/>
            <h1>404 - Not Found...</h1>
            <h4>{location.pathname}</h4>
        </div>
    );
}

export default NotFound;