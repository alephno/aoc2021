import fs from 'fs'

enum Direction {
  Forward = "forward",
  Down = "down",
  Up = "up"
}
type Magnitude = number;
type Instruction=`${Direction} ${Magnitude}`
interface TaggedInstruction {
  tag: Direction,
  magnitude: Magnitude
}

type SubmarineOrientation = {
  aim: number,
  depth: number,
  horizontal: number
}

const tagInstruction = (instruction: Instruction): TaggedInstruction => {
  const [d, m] = instruction.split(' ');
  return {
    tag: d as Direction,
    magnitude: Number(m)
  }
}

const executeUp = (magnitude: Magnitude, orientation: SubmarineOrientation) => {
  const { aim, depth, horizontal} = orientation
  return { aim: aim - magnitude, depth, horizontal }
}

const executeDown = (magnitude: Magnitude, orientation: SubmarineOrientation) => {
  const { aim, depth, horizontal} = orientation
  return { aim: aim + magnitude, depth, horizontal }
}

const executeForward = (magnitude: Magnitude, orientation: SubmarineOrientation) => {
  const { aim, depth, horizontal} = orientation
  return { 
    aim, 
    depth: depth + (aim * magnitude), 
    horizontal: horizontal + magnitude 
  }
}

const executeInstruction = (taggedInstruction: TaggedInstruction, orientation: SubmarineOrientation) => {
  switch (taggedInstruction.tag) {
    case Direction.Up: return executeUp(taggedInstruction.magnitude, orientation); break;
    case Direction.Down: return executeDown(taggedInstruction.magnitude, orientation); break;
    case Direction.Forward: return executeForward(taggedInstruction.magnitude, orientation); break;
  }
}

//const instructions: Array<Instruction> = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
const data = fs.readFileSync('./day2.txt').toString().split("\n");

const instructions = data as Instruction[]
const startingOrientation: SubmarineOrientation = { aim: 0,  depth: 0, horizontal: 0}

const finalOrientation = instructions.reduce((orientation: SubmarineOrientation, instruction: Instruction) => {
  const taggedInstruction = tagInstruction(instruction);
  return executeInstruction(taggedInstruction, orientation);
}, startingOrientation);

const solution = (orientation: SubmarineOrientation) => orientation.horizontal * orientation.depth;

console.log(solution(finalOrientation));