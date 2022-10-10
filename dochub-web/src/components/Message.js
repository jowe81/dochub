import { useEffect, useState } from "react";

export default function Message({msg}) {

  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 5000);
    }  
  }, [msg]);


  return (
    <div className="message-container">
      { messageVisible && <div className="message" id="message">{msg}</div> }
    </div>
  )

};