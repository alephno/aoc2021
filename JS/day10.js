const fs = require('fs')

const testData = [
'[({(<(())[]>[[{[]{<()<>>',
'[(()[<>])]({[<{<<[]>>(',
'{([(<{}[<>[]}>{[]{[(<()>',
'(((({<>}<{<{<>}{[]{[]{}',
'[[<[([]))<([[{}[[()]]]',
'[{[{({}]{}}([{[{{{}}([]',
'{<[[]]>}<{[{[{[]{()[[[]',
'[<(<(<(<{}))><([]([]()',
'<{([([[(<>()){}]>(<<{{',
'<{([{{}}[<[[[<>{}]]]>[]]'
]

const realData = fs.readFileSync('./day10.txt').toString().split('\n')

const openChars = '[{<('
const pairMap = new Map([
  ['(',')'], 
  ['<','>'],
  ['{','}'],
  ['[',']']
])
const scores = new Map([
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137]
])

const parseChar = (acc, ch) => {
  if (acc.score > 0) return acc

  if (openChars.includes(ch)) {
    acc.stack.push(pairMap.get(ch))
    return acc;
  }
  if (ch !== acc.stack.pop()) {
    acc.score = scores.get(ch)
  }
  return acc;
}

const parseLine = (line) => {
  return line.split('').reduce(parseChar, { score: 0, stack: [] })
}

console.log(realData.map(parseLine).reduce((acc, line) => acc + line.score, 0))


const scoreCompletion = ({ stack }) => {
  const completionScores = new Map([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4]
  ])
 
  return stack.reverse().reduce((acc, ch) => completionScores.get(ch) + 5 * acc, 0)
}

const scoresP2 = realData
  .map(parseLine)
  .filter((result)  => result.score === 0)
  .map(scoreCompletion)
  .sort((a, b) => a - b)

console.log(scoresP2[Math.floor(scoresP2.length / 2)])