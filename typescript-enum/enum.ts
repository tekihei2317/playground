// export enum Block {
//   empty,
//   objective,
//   box,
//   boxOnObjective,
//   player,
//   playerOnObjective,
//   wall,
// }

// console.log(Block.empty);
// console.log(Block.playerOnObjective - Block.player);
// console.log(Block.empty === 0);

// const num1: number = 0;
// const num2: number = 1;
// console.log(Block.empty === num1); // true
// console.log(Block.empty === num2); // false

type EmptyBlock = { type: "empty" };
type BoxBlock = { type: "block"; onObject: boolean };
type PlayerBlock = { type: "player"; onObject: boolean };
type WallBlock = { type: "wall" };
type ObjectiveBlock = { type: "objective" };

type Block = EmptyBlock | BoxBlock | PlayerBlock | WallBlock | ObjectiveBlock;

type Blocks = [Block, Block, Block];

function move(
  currentBlock: PlayerBlock,
  nextBlock: Block,
  oneAfterNextBlock: Block
): Blocks {
  // 次のブロックが、移動可能なブロックの場合
  if (nextBlock.type === "empty" || nextBlock.type === "objective") {
    return [
      { type: currentBlock.onObject ? "objective" : "empty" },
      { type: "player", onObject: nextBlock.type === "objective" },
      oneAfterNextBlock,
    ];
  }
  // 次のブロックが箱で、その次が移動可能なブロックの場合
  if (
    nextBlock.type === "block" &&
    (oneAfterNextBlock.type === "empty" ||
      oneAfterNextBlock.type === "objective")
  ) {
    return [
      { type: currentBlock.onObject ? "objective" : "empty" },
      { type: "player", onObject: nextBlock.onObject },
      { type: "block", onObject: oneAfterNextBlock.type === "objective" },
    ];
  }

  return [currentBlock, nextBlock, oneAfterNextBlock];
}
