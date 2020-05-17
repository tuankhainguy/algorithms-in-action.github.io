import React from 'react';

function GraphRenderer() {
  const nodes = [
    { id: 0, x: -102.4, y: 128 },
    { id: 1, x: -76.8, y: 42.6 },
    { id: 2, x: -51.2, y: 128 },
    { id: 3, x: -51.2, y: -42.6 },
    { id: 4, x: 0, y: 42.6 },
    { id: 5, x: 0, y: -128 },
    { id: 6, x: 51.2, y: 42.6 },
    { id: 7, x: 51.2, y: 128 },
    { id: 8, x: 76.8, y: -42.6 },
    { id: 9, x: 102.4, y: 128 },
    { id: 10, x: 102.4, y: 42.6 },
  ];

  const edges = [
    { source: 1, target: 0 },
    { source: 1, target: 2 },
    { source: 3, target: 1 },
    { source: 3, target: 4 },
    { source: 5, target: 3 },
    { source: 5, target: 8 },
    { source: 6, target: 7 },
    { source: 8, target: 6 },
    { source: 8, target: 10 },
    { source: 10, target: 9 },
  ];

  const viewBox = [-160, -160, 320, 320];

  const findNode = (id) => nodes.find((node) => node.id === id);

  return (
    <>
      <h1>This is to render a Binary Search Tree.</h1>
      <svg viewBox={viewBox}>
        <defs>
          <marker id="markerArrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L0,4 L4,2 L0,0" />
          </marker>
          <marker id="markerArrowSelected" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L0,4 L4,2 L0,0" />
          </marker>
          <marker id="markerArrowVisited" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L0,4 L4,2 L0,0" />
          </marker>
        </defs>
        {
          edges.map((edge) => {
            const { source, target } = edge;
            const sourceNode = findNode(source);
            const targetNode = findNode(target);
            if (!sourceNode || !targetNode) return undefined;
            const { x: sx, y: sy } = sourceNode;
            const { x: ex, y: ey } = targetNode;
            // const mx = (sx + ex) / 2;
            // const my = (sy + ey) / 2;
            // const dx = ex - sx;
            // const dy = ey - sy;
            // const degree = (Math.atan2(dy, dx) / Math.PI) * 180;

            return (
              <g key={`${source}-${target}`} stroke="green" strokewidth="5">
                <path d={`M${sx},${sy} L${ex},${ey}`} />
              </g>
            );
          })
        }
        {
          nodes.map((node) => {
            const { id, x, y } = node;
            return (
              <g
                fill="#505050"
                key={id}
                transform={`translate(${x},${y})`}
              >
                <circle r={12} />
                <text alignmentBaseline="central" textAnchor="middle" fill="#bbbbbb">{id}</text>
              </g>
            );
          })
        }
      </svg>
    </>
  );
}

export default GraphRenderer;
