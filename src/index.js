import React from 'react';
import ReactDOM from 'react-dom';
import {config} from './chat_config';

import Chat from './Chat';

ReactDOM.render(
    <Chat/>, document.getElementById(config.ROOT_ELEMENT));
