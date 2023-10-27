import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

const MessageContainer = ({ messages, currentConnectionId }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0,
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const getMessageClassName = (connectionId, currentConnectionId) => {
        
        return connectionId === currentConnectionId ? `user-message` : `other-message`;
    }

    const checkIfAlmighty = (user) => {
        return user.substring(0, user.length - 6) === "Almighty" ? "bg-secondary" : "bg-primary";
    }

    return (<Row>
    <Col>
         <div ref={messageRef} className="message-container">
            {messages.map((m, index) => (
                <div key={index} className={getMessageClassName(m.connectionId, currentConnectionId)}>
                        <div className={`message ${checkIfAlmighty(m.user)}`}>{m.message}</div>
                        <div className="from-user ms-2">{m.user}</div>
                </div>
            ))}
        </div>
        </Col>
        </Row>
    );
}

export default MessageContainer;
