import React, { Component } from 'react';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

import { config } from './chat_config';

import Messages from './components/Messages';
import Input from './components/Input';

const NAMES = ['Vasiliy', 'Taras'];

class Chat extends Component {
    constructor() {
        super();
        const { AA_CHAT_BACKEND_IP } = config;

        this.state = {
            username: _.sample(NAMES),
            messages: []
        };
        this.socket = io.connect(AA_CHAT_BACKEND_IP);

        this.socket.on('connect', () => {
            this.socket.on('message', ({text, username}) => {
                this.insertMessage({text, username});
            });
        })

        this.insertMessage = this.insertMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    insertMessage (message) {
        const {messages} = this.state;
        this.setState({
            messages: [...messages, message]
        });
    }

    sendMessage (text) {
        const {username} = this.state;
        const message = {text, username};
        this.socket.emit('message', message);

        return this.insertMessage(message);
    }

    render () {
        const {state, sendMessage} = this;
        const {messages} = state;
        const methods = {sendMessage};
        const props = {messages};
        return <div>
            Messages:
            <Messages {...props}/>
            <Input {...methods}/>
        </div>;
    }
}

export default Chat;