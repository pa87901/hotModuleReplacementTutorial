import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => (
  <div className="feed">
    { message }
    <div>Goodbye world</div>
    <div>See you ...</div>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired
};

export default Message;