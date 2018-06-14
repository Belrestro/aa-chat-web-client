import React from 'react'

const Message = ({text = '', username = ''}) => {
    return <div className="message">
        {username}: {text}
    </div>
}

export default Message;