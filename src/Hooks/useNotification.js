import {useEffect, useState} from "react";

const useNotification = () => {
  const [notification, setNotification] = useState({
    text: "", isVisible: false
  });

  useEffect(() => {
    let timer;
    if (notification.isVisible) {
      timer = setTimeout(() => {
        setNotification(prev =>
          ({text: prev.text, isVisible: false}))
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [notification.isVisible]);

  const showNotification = (content) => {
    setNotification({text: content, isVisible: true});

  }
  return {notification, showNotification}
};

export default useNotification