import React, { useRef, useEffect } from 'react';

const DynamicTextareaBox = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaSize();
  }, [value]);

  const adjustTextareaSize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '4vh';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.width = '20vw';
      textareaRef.current.style.width = `${textareaRef.current.scrollWidth}px`;
    }
  };

  return (
    <div className="inner-b">
      <textarea 
        className='inner-box'
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder="Type here..."
        rows={1}
      />
    </div>
  );
};

export default DynamicTextareaBox;