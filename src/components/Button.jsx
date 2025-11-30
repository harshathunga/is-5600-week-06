import React from 'react'

export default function Button({text, handleClick, disabled}) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    if (handleClick) {
      handleClick(e);
    }
  };

  return (
    <a 
      href="#" 
      className={`f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 ${disabled ? 'o-50 pointer-events-none' : ''}`}
      onClick={handleButtonClick}
    >
      <span className="pl1">{text}</span>
    </a>
  )
}
