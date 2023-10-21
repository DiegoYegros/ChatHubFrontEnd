import { useState } from "react";
import {Form, Button, FormControl} from "react-bootstrap";

const SendMessageForm = ({sendMessage}) => {
    const[message, setMessage] = useState('');
    return <>
    <Form onSubmit={e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>
        <div className="d-flex">
            <FormControl 
                className="message-input flex-grow-1" 
                placeholder='message...' 
                onChange={e => setMessage(e.target.value)} 
                value={message}/> 
        
            <Button 
                className="message-send ml-2 col-2" 
                variant='primary' 
                type='submit' 
                disabled={!message}>
                Send
            </Button>
        </div>
    </Form>
    </>
}

export default SendMessageForm;