import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import Message from "./Message";

interface Props {

  messages: Message[];
  currentConnectionId: string | null;

}


const MessageContainer : React.FC<Props> = ({ messages, currentConnectionId }) => {
  const messageRef = useRef<any>();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
  <Row>
    <Col>
      <div ref={messageRef} className="message-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} currentConnectionId={currentConnectionId} />
        ))}
      </div>
    </Col>
  </Row>
);
};

export default MessageContainer;
