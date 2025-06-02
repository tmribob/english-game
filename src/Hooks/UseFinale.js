import {useEffect, useState} from "react";

const UseFinale = (location) => {
  const [mistakes, setMistakes] = useState([]);
  useEffect(() => {
    if (location.pathname === "/end") {
      const newMistakes = location.state.mistakes || [];
      setMistakes(newMistakes);
    }
  }, [location]);


  return ({
    mistakes
  })
}

export default UseFinale