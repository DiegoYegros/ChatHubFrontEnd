import { useEffect, useRef } from "react";
const MessageContainer = ({messages, currentUser}) => {  
    const messageRef = useRef();
    useEffect(() =>{
        if (messageRef && messageRef.current){
            const {scrollHeight, clientHeight} = messageRef.current
            messageRef.current.scrollTo({
                left: 0, 
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            })
        }

    }, [messages])

    const getMessageClassName = (user, currentUser) => {
        return user.substring(0, user.length-6) === currentUser ? `user-message` : `other-message`
    }
    const checkIfAlmighty = (user) => {
        return user.substring(0, user.length-6) === "Almighty" ? "bg-secondary" : "bg-primary"
    }

    return <div ref={messageRef} className="message-container">
        {messages.map((m, index) =>
            <div key={index} className={getMessageClassName(m.user, currentUser)}>
                <div className={`message ${checkIfAlmighty(m.user)}`}>{m.message}</div>
                <div className="from-user">{m.user}</div>
            </div>               
        )}
    </div>
}
export default MessageContainer;