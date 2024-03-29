import { useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import uploadIcon from "../assets/uploadIcon.png";

interface Props {
  sendMessage: (message: string, imageData: string) => void;
}

const SendMessageForm: React.FC<Props> = ({sendMessage}) => {
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState<any>({imageData: ""});
  const fileInputRef = useRef<any>(null);

  const handleImageUploadClick = () => {
        if (fileInputRef.current != null){
          fileInputRef.current.click();
        }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImageData(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    sendMessage(message, imageData);
    setMessage("");
    setImageData("");
  };
  return (
    <Form>
      <Row className="d-flex">
        <Col sm={9} xs={10} md={11}>
          <InputGroup className="mb-3 message-input-wrapper">
            <FormControl
              as="textarea"
              className="message-input dark-input"
              placeholder="Message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyDown={handleKeyDown}
            />
            <Button variant="send-image" onClick={handleImageUploadClick}>
              <img src={uploadIcon} alt="Upload Icon" className="uploadIcon" />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </InputGroup>
        </Col>
        <Col sm={3} xs={2} md={1} className="position-relative">
          <Button
            className="message-send position-absolute end-0"
            variant="primary"
            type="submit"
            disabled={!message && !imageData}
            onClick={handleSubmit}
          >
            <img
              title="Send"
              width="30"
              height="30"
              src="https://img.icons8.com/windows/32/sent.png"
              alt="sent"
            />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SendMessageForm;
