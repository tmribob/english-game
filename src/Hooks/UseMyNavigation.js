import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const UseMyNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [header, setHeader] = useState('ENGLISH GAME');

  const setNewLocation = (address, state = {}, replace = false, newHeader = undefined) => {
    navigate(address, {replace, state});
    newHeader && setHeader(newHeader.toUpperCase());
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
        break;
      case '/end':
        setHeader('RESULTS');
        break;
      default:
        setHeader('ERROR');
        break;
    }
  }, [location.pathname]);

  return {location, setNewLocation, header};
}

export default UseMyNavigation;