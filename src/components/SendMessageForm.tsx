import { useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import uploadIcon from "../assets/uploadIcon.png";

interface Props {
  sendMessage: (message: string, imageData: string) => void;
}

const SendMessageForm: React.FC<Props> = ({sendMessage}) => {
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setUploadError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageData(base64);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setUploadError("Failed to upload image. Please try again.");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (message.trim() || imageData) {
      sendMessage(message.trim(), imageData);
      setMessage("");
      setImageData("");
      setUploadError(null);
    }
  };

  const customPlaceholderStyle = `
    .custom-input::placeholder {
      color: #a0a0a0 !important;
      opacity: 1 !important;
    }
    .custom-input:-ms-input-placeholder {
      color: #a0a0a0 !important;
    }
    .custom-input::-ms-input-placeholder {
      color: #a0a0a0 !important;
    }
  `;

  return (
    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <style>{customPlaceholderStyle}</style>
      <Row className="align-items-center">   
        <Col xs={10} sm={10} md={11} className="pe-0">
          <InputGroup>
            <div className="position-relative w-100">
              <FormControl
                as="textarea"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKeyDown}
                className="custom-input"
                style={{ 
                  paddingRight: imageData ? '5em' : '2.5em', 
                  resize: 'none',
                  backgroundColor: '#333',
                  color: '#e1dfdf',
                  border: '1px solid #555',
                  height: '38px',
                  overflowY: 'auto',
                }}
              />
              {imageData && !isLoading && (
                <div className="position-absolute top-0 bottom-0 d-flex align-items-center justify-content-center" 
                     style={{ 
                       width: '3em', 
                       height: '100%', 
                       right: '2.5em',
                       padding: '0.25em',
                     }}>
                  <img 
                    src={imageData} 
                    alt="Uploaded" 
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
              )}
              <Button 
                variant="outline-secondary"
                onClick={handleImageUploadClick} 
                className="position-absolute top-0 bottom-0 end-0"
                style={{ width: '2.5em' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <img src={uploadIcon} alt="Upload Icon" style={{ width: '20px', height: '20px' }} />
                )}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </InputGroup>
        </Col>
        <Col xs={2} sm={2} md={1} className="ps-0">
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled={(!message.trim() && !imageData) || isLoading}
          >
            Send
          </Button>
        </Col>
      </Row>
      {uploadError && (
        <Row>
          <Col>
            <Alert variant="danger" className="mt-2 mb-2">
              {uploadError}
            </Alert>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default SendMessageForm;
