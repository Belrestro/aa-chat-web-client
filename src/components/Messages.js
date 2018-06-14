import React, { Component } from 'react';
import _ from 'lodash'; 

import Message from './Message';

class Messages extends Component {
    render() {
        const {messages = []} = this.props;
        return <div className="message-list">
            {
                _.map(messages, ({text = '', username = ''}, key) => {
                    const props = {text, username, key};
                    return <Message {...props}/>
                })
            }
        </div>
    }
}

export default Messages