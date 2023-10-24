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
                        className="message-input" 
                        placeholder='Message...' 
                        onChange={e => setMessage(e.target.value)} 
                        value={message}
                    />
                <Button 
                        className="message-send w-100" 
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
