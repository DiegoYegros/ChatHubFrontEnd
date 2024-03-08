// src/components/Message.tsx
import React from 'react';

interface MessageProps {
  message: Message;
  currentConnectionId: string | null;
}

const Message: React.FC<MessageProps> = ({ message, currentConnectionId }) => {
  const { connectionId, user, imageData, message: content } = message;

  const getMessageClassName = () => {
    return connectionId === currentConnectionId ? 'user-message' : 'other-message';
  };

  const checkIfAlmighty = () => {
    return user.substring(0, user.length - 6) === 'Almighty' ? 'bg-secondary' : 'bg-primary';
  };

  return (
    <div className={getMessageClassName()}>
      <div className={`message ${checkIfAlmighty()}`}>
        {imageData && (
          <div className="message-image-container">
            <img src={imageData} alt="" className="message-image" />
          </div>
        )}
        {content}
      </div>
      <div className="from-user ms-2">{user}</div>
    </div>
  );
};

export default Message;