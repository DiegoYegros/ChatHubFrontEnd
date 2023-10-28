import { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

const MessageContainer = ({ messages, currentConnectionId }) => {
  const messageRef = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");

  const handleImageClick = (src) => {
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

  const getMessageClassName = (connectionId, currentConnectionId) => {
    return connectionId === currentConnectionId
      ? `user-message`
      : `other-message`;
  };

  const checkIfAlmighty = (user) => {
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
              <div className="from-user ms-2">{m.user}</div>
            </div>
          ))}
          {isModalOpen && (
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
