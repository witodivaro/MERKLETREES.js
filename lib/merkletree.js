const { SHA256 } = require("crypto-js");

const { createBinaryTree, searchTree, searchTreeAndGetRequiredNodes } = require("./util");

function createMerkleTree(message) {
  const byteCount = message.length;

  const height = Math.ceil(Math.log2(byteCount));

  const merkleTree = createBinaryTree(height);
  const data = message.split("");

  for (let i = 0; i < Math.pow(2, height); i++) {
    const node = searchTree(merkleTree, height, i);
    const dataPiece = data[i];

    node.value = SHA256(dataPiece).toString();
  }

  let deep = height - 1;

  while (!merkleTree.value) {
    for (let i = 0; i < Math.pow(2, deep); i++) {
      const node = searchTree(merkleTree, deep, i);
      node.value = SHA256(node.left.value + node.right.value).toString();
    }

    deep -= 1;
  }

  return merkleTree;
}

function verifyNode(node, requiredHashes, merkleRoot) {
  let cursorHash = node.value;

  for (const hash of requiredHashes.reverse()) {
    let concat = hash.isLeft ? hash.value + cursorHash : cursorHash + hash.value;

    cursorHash = SHA256(concat).toString();
  }

  return cursorHash === merkleRoot;
}

function getRequiredNodesAndVerify(tree, node, top, left) {
  const requiredNodes = searchTreeAndGetRequiredNodes(tree, top, left);

  return verifyNode(node, requiredNodes, tree.value);
}

module.exports = {
  createMerkleTree,
  verifyNode,
  getRequiredNodesAndVerify,
};
