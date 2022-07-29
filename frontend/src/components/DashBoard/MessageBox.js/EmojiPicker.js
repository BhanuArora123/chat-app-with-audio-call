import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = (props) => {
    const { chosenEmoji ,onEmojiClick} = props;
  return (
    <div onClick={(e) => e.stopPropagation() }>
      <Picker onEmojiClick={onEmojiClick}  />
    </div>
  );
};
export default EmojiPicker;