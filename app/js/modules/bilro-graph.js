const { Graph } = require("graphology");
const { nodes } = require('../includes/nodes-list');

const prefixes = {
	node: 'n',
	edges: 'e'
};

var g = new Graph();

nodes.forEach((node, index) => {
	g.addNode(`${prefixes.node}${index}`, node);
});

exports.graph = g;
exports.graph_prefixes = prefixes;