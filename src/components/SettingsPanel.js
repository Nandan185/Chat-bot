import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/SettingsPanel.css';

/* Setting panel function is called when node is selected*/

const SettingsPanel = ({ node, onNodeChange, onBack }) => {
  const [text, setText] = useState(node.data.text);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const textareaRef = useRef(null);

  /* useeffect runs when node prop changes*/ 
  useEffect(() => {
    setText(node.data.text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [node]);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setShowPlaceholder(newText === ''); 
    onNodeChange(node.id, newText);
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <button className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h3 >Panel Settings</h3>
      </div>
      <label className='setting-body'>Text:</label>
      <div className='setting-body'>
      <textarea maxlength='100'
        value={text}
        onChange={handleChange}
        placeholder={showPlaceholder ? `Text Message ${node.id.split('-')[1]}` : ''}
        ref={textareaRef}
      />
      </div>
    </div>
  );
};

export default SettingsPanel;
