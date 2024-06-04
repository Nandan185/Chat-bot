import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import '../styles/NodesPanel.css';
/**
 node panel houses all nodes, right now added only textnode.
 */
const NodesPanel = ({ onAdd }) => {
  
  /* function to handle drag and drop of setting nodetype*/
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className='nodePanel-header'>
      <h3 className='nodepanel-text'>Node Panel</h3>
      </div>
      <div className='nodePanel-body'>
      <div
        className="node-box"
        onDragStart={(event) => handleDragStart(event, 'textNode')}
        draggable
      >
          <FontAwesomeIcon icon={faCommentDots} className="icon" />
          <div className="text">Message</div>
      </div>
      </div>
    </aside>
  );
};

export default NodesPanel;
