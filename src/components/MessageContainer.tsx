import { SetStateAction, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

interface Props {

  messages: Message[];
  currentConnectionId: string | null;

}


const MessageContainer : React.FC<Props> = ({ messages, currentConnectionId }) => {
  const messageRef = useRef<any>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");

  const handleImageClick = (src: SetStateAction<string>) => {
    setSelectedImageSrc(src);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImageSrc("");
  };

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

  const getMessageClassName = (connectionId: string | null, currentConnectionId: string | null) => {
    return connectionId === currentConnectionId
      ? `user-message`
      : `other-message`;
  };

  const checkIfAlmighty = (user: string) => {
    return user.substring(0, user.length - 6) === "Almighty"
      ? "bg-secondary"
      : "bg-primary";
  };

  return (
    <Row>
      <Col>
        <div ref={messageRef} className="message-container">
          {messages.map((m, index) => (
            <div
              key={index}
              className={getMessageClassName(
                m.connectionId,
                currentConnectionId
              )}
            >
              <div className={`message ${checkIfAlmighty(m.user)}`}>
                {m.imageData !== "" && m.imageData ? (
                  <div className="message-image-container">
                    <img
                      src={m.imageData}
                      alt=""
                      className="message-image"
                      onClick={() => handleImageClick(m.imageData)}
                    />
                  </div>
                ) : null}
                {m.message}
              </div>
              <div className="from-user ms-string[]2">{m.user}</div>
            </div>
          ))}
          {modalOpen && (
            <div className="modal-background" onClick={closeModal}>
              <img
                src={selectedImageSrc}
                alt="Enlarged"
                className="enlarged-image"
              />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default MessageContainer;
