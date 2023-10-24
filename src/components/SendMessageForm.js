import { useState } from "react";
import { Form, Button, FormControl, Row, Col } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return (
        <Form 
            onSubmit={e => {
                e.preventDefault();
                sendMessage(message);
                setMessage('');
            }}
        >
                    <FormControl 
                        className="message-input dark-input" 
                        placeholder='Message...' 
                        onChange={e => setMessage(e.target.value)} 
                        value={message}
                    />
                <Button 
                        className="message-send" 
                        variant='primary' 
                        type='submit' 
                        disabled={!message}
                    >
                        Send
                    </Button>
        </Form>
    );
}

export default SendMessageForm;
