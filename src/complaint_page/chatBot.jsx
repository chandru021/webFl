import React, { Component } from 'react';
import axios from 'axios';
import './chat.css'; // Assuming you have CSS styles defined for the chat

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      isSending: false,
    };
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSendMessage = () => {
    const { message, messages } = this.state;
    if (message.trim() === '') return;
  
    this.setState({ isSending: true });
    axios.post('http://localhost:8000/chat', { "message":message , "id" : this.props.id })
      .then((response) => {
        const newMessages = [
          ...messages,
          { text: message, isUser: true },
          { text: response.data.message, isUser: false }
        ];
        this.setState({
          messages: newMessages,
          message: '',
          isSending: false
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ isSending: false });
      });
  };

  render() {
    const { message, messages, isSending } = this.state;

    return (
      <div class="bot">
        <div className="top-div">
          {messages.map((msg, index) => (
            <div key={index} className={msg.isUser ? 'user-message-container' : 'bot-message-container'}>
              <div className={msg.isUser ? 'user-message' : 'bot-message'}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-div">
          <input
            type="text"
            className="query"
            placeholder="Type your message here..."
            value={message}
            onChange={this.handleMessageChange}
            disabled={isSending}
          />
          <button onClick={this.handleSendMessage} disabled={isSending}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Chatbot;
