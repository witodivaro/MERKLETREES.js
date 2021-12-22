function createBinaryTree(height) {
  const root = {};

  if (height == -1) {
    return null;
  }

  root.left = createNode();
  root.right = createNode();
  root.value = null;

  return createNode(createBinaryTree(height - 1), createBinaryTree(height - 1));
}

function createNode(left = null, right = null, value) {
  return { left, right, value };
}

function searchTree(tree, top, left) {
  const desiredRowNodesCount = 2 ** top;
  const coef = (left + 1) / desiredRowNodesCount;

  let node = tree;
  let topCursor = 0;
  let leftCursor = 0;

  while (topCursor !== top) {
    let nextRowNodesCount = 2 ** (topCursor + 1);
    let nextRowCoef = nextRowNodesCount * coef;
    let ceiledNextRowCoef = Math.ceil(nextRowCoef);

    let next = "left";

    if (ceiledNextRowCoef === (leftCursor + 1) * 2) {
      next = "right";
    }

    node = node[next];
    leftCursor = ceiledNextRowCoef - 1;
    topCursor++;
  }

  return node;
}

function searchTreeAndGetRequiredNodes(tree, top, left) {
  const desiredRowNodesCount = 2 ** top;
  const coef = (left + 1) / desiredRowNodesCount;
  const requiredNodes = [];

  let node = tree;
  let topCursor = 0;
  let leftCursor = 0;

  while (topCursor !== top) {
    let nextRowNodesCount = 2 ** (topCursor + 1);
    let nextRowCoef = nextRowNodesCount * coef;
    let ceiledNextRowCoef = Math.ceil(nextRowCoef);

    let next = "left";
    let required = "right";

    if (ceiledNextRowCoef === (leftCursor + 1) * 2) {
      next = "right";
      required = "left";
    }

    requiredNodes.push({ ...node[required], isLeft: required === "left" });
    node = node[next];
    leftCursor = ceiledNextRowCoef - 1;
    topCursor++;
  }

  return requiredNodes;
}

module.exports = {
  searchTree,
  createBinaryTree,
  searchTreeAndGetRequiredNodes,
};
