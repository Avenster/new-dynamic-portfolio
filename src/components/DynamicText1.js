import React, { useState, useRef, useEffect } from 'react';

const DynamicTextareaBox = () => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaSize();
  }, [inputValue]);

  const adjustTextareaSize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '4vh';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.width = '20vw';
      textareaRef.current.style.width = `${textareaRef.current.scrollWidth}px`;
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="inner-b">
        <textarea className='inner-box'
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type here..."
          rows={1}
        />
       
    </div>

//     <div className="inner-b">
//     <form  className="inner-box" action="">
//         <input type="text" placeholder='Enter Your Response...' />
        
        

//     </form>
//     <button className='sb-btn'>Generate</button>

// </div>
  );
};

export default DynamicTextareaBox;