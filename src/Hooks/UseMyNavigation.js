import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const UseMyNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [header, setHeader] = useState('ENGLISH GAME');

  const setNewLocation = (address, state = {}, replace = false) => {
    navigate(address, {replace, state});
  }
  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setHeader('ENGLISH GAME');
        break;
      case '/addText':
        setHeader('ADD NEW TEXT');
        break;
      case '/editText':
        setHeader('EDITING TEXT');
        break;
      case '/play':
        setHeader('PLAYING TEXT');
        break;
      case '/end':
        setHeader('THE END');
        break;
      default:
        setHeader('ERROR');
        break;
    }
  }, [location.pathname]);
  return {location, setNewLocation, header};
}

export default UseMyNavigation;