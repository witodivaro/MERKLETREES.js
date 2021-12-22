const { createMerkleTree, getRequiredNodesAndVerify } = require("./lib/merkletree");
const { searchTree } = require("./lib/util");

const merkleTree = createMerkleTree("ABCD");

const left = 2;
const top = 2;

const yourNode = searchTree(merkleTree, top, left);

const isValid = getRequiredNodesAndVerify(merkleTree, yourNode, top, left);

console.log(isValid);
