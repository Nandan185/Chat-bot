import React from 'react';
import { Handle } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../styles/TextNode.css';

/**
 * function for a text node component accepts a parameter data.
 * placed handles on either side of node, to connect nodes. through edge.
 */

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
      <Handle type="target" position="left" className="handle handle-left" />
      <div className="node-header">
        <div>
          <FontAwesomeIcon icon={faCommentDots} className="icon" /> 
          <div className="header-text">Send Message</div>
        </div>
        <div>
          <FontAwesomeIcon icon={faWhatsapp} />
        </div>
      </div>
      <div className="node-content">
        <div>{data.text}</div>
      </div>
      <Handle type="source" position="right" className="handle handle-right" />
    </div>
  );
};

export default TextNode;
