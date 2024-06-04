import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from 'react-flow-renderer';
import TextNode from './components/TextNode';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

const nodeTypes = {
  textNode: TextNode,
};

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [bannerMessage, setBannerMessage] = useState('');

  /*addNode is a function creates anew node with intial data of unique id,type,data and position
   and adds a new node to a nodes array state*/
  const addNode = (type, position) => {
    const id = `${type}-${nodes.length + 1}`;
    const newNode = {
      id,
      type,
      data: { text: `Text Message ${nodes.length + 1}` },
      position,
    };
    setNodes((nds) => [...nds, newNode]);
  };
  /*Updates the text data of a node with the given ID.
    by setNodes updates the state with the modified node */
  const handleNodeChange = (id, text) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, text } } : node))
    );
  };
  /* applyNodeChanges & applyEdgeChanges are react-flow componets
     updates state and handle changes */
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
    /*on connect function is to add edge to a edge array
      and also conditioned with one edge originating from a source handle */
  const onConnect = (params) => {
    const { source, sourceHandle } = params;
    const sourceNodeHasEdge = edges.some(
      (edge) => edge.source === source && edge.sourceHandle === sourceHandle
    );

    if (sourceNodeHasEdge) {
      setBannerMessage('Source handle already has an outgoing edge.');
      setTimeout(() => setBannerMessage(''), 5000);
      return;
    }

    setEdges((eds) => addEdge(params, eds));
  };
  /* function to handle save action and if there are more than one Nodes
and more than one Node has empty target handles*/
  const handleSaveClick = () => {
    const targetHandles = edges.map((edge) => edge.target);
    const nodesWithEmptyTargets = nodes.filter((node) => !targetHandles.includes(node.id));

    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      setBannerMessage('Cannot save flow');
    } else {
      setBannerMessage('Flow saved successfully!');
    }

    setTimeout(() => setBannerMessage(''), 5000);
  };
  /*onDrop Handles the drop event to add a new node at the drop position.
    Calculates the drop position relative to the React Flow container.
    Calls addNode to add the new node.
    onDragOver Prevents the default behavior to allow dropping.
    Sets the drop effect to 'move'.*/
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    addNode(type, position);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <ReactFlowProvider>
      <nav>
      {bannerMessage && <div className="banner">{bannerMessage}</div>}
        <button className="buttonStyle" onClick={handleSaveClick}>Save Changes</button>
      </nav>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div ref={reactFlowWrapper} className="react-flow" onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(event, node) => setSelectedNode(node)}
            nodeTypes={nodeTypes}
            style={{ flex: 1 }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div className="panels-container">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onNodeChange={handleNodeChange}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel onAdd={addNode} />
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
