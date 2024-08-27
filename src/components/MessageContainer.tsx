import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Message from "../models/Message";

interface Props {
  messages: Message[];
  currentConnectionId: string | null;
}

const MessageContainer: React.FC<Props> = ({ messages, currentConnectionId }) => {
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

  const isAlmighty = (user: string) => {
    return user.substring(0, user.length - 6) === "Almighty";
  };

  const messageContainerStyle = {
    backgroundColor: 'rgb(37,40,42)',
    borderRadius: '5px',
    marginBottom: '2px',
    height: '78vh',
    overflowY: 'auto' as const,
    padding: '1rem',
  };

  const messageStyle = (isCurrentUser: boolean) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
    marginBottom: '1rem',
    width: '100%',
  });

  const messageBubbleStyle = (isAlmightyUser: boolean, isCurrentUser: boolean) => ({
    backgroundColor: isAlmightyUser ? '#3a3a3a' : (isCurrentUser ? '#007bff' : '#6c757d'),
    color: '#fff',
    borderRadius: '1rem',
    padding: '0.75rem',
    maxWidth: '70%',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
    boxShadow: isAlmightyUser ? '0 0 5px rgba(255, 215, 0, 0.3)' : 'none',
    border: isAlmightyUser ? '1px solid rgba(255, 215, 0, 0.3)' : 'none',
  });

  const imageContainerStyle = {
    maxWidth: '250px',  
    maxHeight: '250px', 
    marginBottom: '0.5rem',
    overflow: 'hidden', 
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius: '0.5rem',
    cursor: 'pointer',
  };

  const userNameStyle = (isCurrentUser: boolean, isAlmightyUser: boolean) => ({
    fontSize: '0.8rem',
    marginTop: '0.25rem',
    color: isAlmightyUser ? '#ffd700' : 'rgb(171, 173, 173)',
    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
    fontWeight: isAlmightyUser ? 'bold' : 'normal',
  });

  return (
    <Row>
      <Col>
        <div ref={messageRef} style={messageContainerStyle}>
          {messages.map((m, index) => {
            const isCurrentUser = m.connectionId === currentConnectionId;
            const isAlmightyUser = isAlmighty(m.user);
            return (
              <div key={index} style={messageStyle(isCurrentUser)}>
                <div style={messageBubbleStyle(isAlmightyUser, isCurrentUser)}>
                  {m.imageData && (
                    <div style={imageContainerStyle}>
                      <img
                        src={m.imageData}
                        alt=""
                        style={imageStyle}
                        onClick={() => handleImageClick(m.imageData)}
                      />
                    </div>
                  )}
                  {m.message && m.message.trim() !== "" && <div>{m.message}</div>}
                </div>
                <div style={userNameStyle(isCurrentUser, isAlmightyUser)}>{m.user}</div>
              </div>
            );
          })}
        </div>
        {modalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }} onClick={closeModal}>
            <img
              src={selectedImageSrc}
              alt="Enlarged"
              style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MessageContainer;
