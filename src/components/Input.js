import React, {Component} from 'react';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        };

        this.inputSendHandler = this.inputSendHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage () {
        const {value} = this.state;
        if (value) {
            const {sendMessage} = this.props;

            sendMessage(value);
            this.setState({value: ''});
        }
        
    }

    inputSendHandler (event) {
        if(event.key == 'Enter'){
            this.sendMessage();
        }
    }

    handleChange (event) {
        this.setState({value: event.target.value});
    }

    render () {
        const {
            state, 
            inputSendHandler,
            sendMessage,
            handleChange
        } = this;

        return <div>
            <input type="text" value={state.value} onChange={handleChange} onKeyPress={inputSendHandler}/>
            <button onClick={sendMessage}>Send</button>
        </div>;
    }
}

export default Input;
