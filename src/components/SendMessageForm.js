import { useState } from "react";
import { Form, Button, FormControl, Row, Col} from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey){
        return
    }
    if (e.key === 'Enter'){
        e.preventDefault();
        handleSubmit();
    }
    
}
const handleSubmit = () => {
    sendMessage(message)
    setMessage('');
}
    return (
        <Form 
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <Row className="d-flex justify-content-end">
                <Col xs={10}>
                    <FormControl
                        as="textarea"
                        className="message-input dark-input"
                        placeholder='Message...' 
                        onChange={e => setMessage(e.target.value)} 
                        value={message}
                        onKeyDown={handleKeyDown}
                    />
                </Col>
                <Col xs={2}>
                    <Button 
                        className="message-send"
                        variant='primary' 
                        type='submit' 
                        disabled={!message}
                    >
                        <img width="30" height="30" src="https://img.icons8.com/windows/32/sent.png" alt="sent"/>
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SendMessageForm;
