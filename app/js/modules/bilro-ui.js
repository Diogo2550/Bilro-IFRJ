const { graph, graph_prefixes } = require('./bilro-graph');
const cytoscape = require('cytoscape');
const $ = require('jquery');
const edgehandles = require('cytoscape-edgehandles');

/**
 * Ativando o plugin de draw mode
 * @see https://github.com/cytoscape/cytoscape.js-edgehandles
 */
cytoscape.use(edgehandles);

// Opções do cytoscape
const cy_options = {
	container: $('#graph'),
	zoomingEnabled: false,
	panningEnabled: false,
};

// Opções da extensão de draw
const defaults = {
	canConnect: function( sourceNode, targetNode ){
	  // whether an edge can be created between source and target
	  return !sourceNode.same(targetNode); // e.g. disallow loops
	},
	edgeParams: function( sourceNode, targetNode ){
	  // for edges between the specified source and target
	  // return element object to be passed to cy.add() for edge
	  return {};
	},
	hoverDelay: 150, // time spent hovering over a target node before it is considered selected
	snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
	snapThreshold: 10, // the target node must be less than or equal to this many pixels away from the cursor/finger
	snapFrequency: 20, // the number of times per second (Hz) that snap checks done (lower is less expensive)
	noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
	disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
};

const cy = {
	instance: cytoscape({
		container: $('#graph'),
		zoomingEnabled: false,
		panningEnabled: false,
		style: [{
				selector: 'node',
				style: {
					'background-color': '#F7A',
					'active-bg-color': 'red',
					'overlay-color': 'blue',
					'width': 20,
					'height': 20,
					'label': 'data(id)',
					'color': '#FFF'
				}
			}, {
				selector: 'node:selected',
				style: {
					'background-color': '#FAC'
				}
			}, {
				selector: 'edge',
				style: {
					'width': 3,
					'line-color': '#ccc',
					'curve-style': 'bezier'
				}
			}, {
				selector: '.eh-handle',
				style: {
				  'border-width': 12, // makes the handle easier to hit
				}
			}, {
				selector: '.eh-hover',
				style: {
				  	'background-color': 'red'
				}
			}, {
				selector: '.eh-source',
				style: {
					'border-width': 2,
					'border-color': 'red'
				}
			}, {
				selector: '.eh-target',
				style: {
					'border-width': 2,
					'border-color': 'red'
				}
			}, {
				selector: '.eh-preview, .eh-ghost-edge',
				style: {
					'background-color': 'red',
					'line-color': 'red',
					'target-arrow-color': 'red',
					'source-arrow-color': 'red'
				}
			}, {
				selector: '.eh-ghost-edge.eh-preview-active',
				style: {
					'opacity': 0
				}
			}
		]
	}),
	pressed: null,
	pressing: null,
	created_edges: 0,
	linkNodes: (n1, n2) => {
		cy.instance.add({
			group: 'edges',
			data: {
				id: `${graph_prefixes.edges}${cy.created_edges + 1}`,
				source: n1,
				target: n2
			},
			classes: ['blue-line']
		});
		
		cy.created_edges++;
	},
	resetPressed: () => {
		cy.pressed = null;
		
		setTimeout(() => {
			cy.instance.nodes().unselect();
		}, 100);
	}
};

let eh = cy.instance.edgehandles(defaults);
eh.enableDrawMode();

// Adiciona os nodes ao cytoscape
graph.forEachNode((node, attr) => {
	cy.instance.add({
		locked: true,
		grabbable: false,
		position: attr.position,
		data: {
			id: node,
		}
	});
});

/* cy.instance.on('vmousedown', (e) => {
	if(e.target.group && e.target.group() === 'nodes') {
		nodeClickHandler(e.target);
	} else {
		cy.pressed = e.target;		
	}	
}); */


/* function nodeClickHandler(node) {
	if(cy.pressed?.group && cy.pressed.group() === 'nodes') {
		cy.linkNodes(cy.pressed.id(), node.id());
		
		cy.resetPressed();
	} else {
		cy.pressed = node;
	}
} */

exports.cy = cy.instance;
exports.resetPressed = cy.resetPressed;