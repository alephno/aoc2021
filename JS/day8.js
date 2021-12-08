const fs = require('fs');

const entries = fs
  .readFileSync('./day8_real.txt')
  .toString()
  .split('\n')
  .map(line => line.split('|'))
  .map(([l, r]) => [l.trim().split(' '), r.trim().split(' ')])

  // Part 1 //
const uniqueDigitCount = (output) => {
  const l = output.filter(d => d.length == 2 || d.length == 4 || d.length == 7 || d.length == 3).length
  return l;
}
const uniqueCount = entries.reduce((acc, [_, output]) => acc + uniqueDigitCount(output), 0);
console.log(uniqueCount);
// End Part 1 //

// Part 2
const intersection = (setA, setB) => new Set([...setA].filter(v => setB.has(v)))

const extractSignalSetForLength = (signals, length) => {
  const signalString = signals.filter(signal => signal.length === length)[0]
  const signalSet = new Set(signalString.split(''))
  return signalSet
}

const decodeEntry = ([signals, outputs]) => {
  const oneSignals = extractSignalSetForLength(signals, 2)
  const fourSignals = extractSignalSetForLength(signals, 4)

  return outputs.map(output => {
    const signalSet = new Set(output.split(''))
    switch (signalSet.size) {
      case 2: return 1;
      case 3: return 7;
      case 4: return 4;
      case 7: return 8;
      case 5: {
        if (intersection(signalSet, oneSignals).size === 2) {
          return 3;
        } else {
          return intersection(signalSet, fourSignals).size === 2 ? 2 : 5;
        }
      }
      case 6: {
        if (intersection(signalSet, fourSignals).size === 4) {
          return 9;
        } else {
          return intersection(signalSet, oneSignals).size === 2 ? 0 : 6;
        }
      }
      default: throw `Couldn't decode ${output} from ${JSON.stringify(signals)}.`
    }
  })
}

console.log(
  entries
    .flatMap(entry => parseInt(decodeEntry(entry).join(''), 10))
    .reduce((acc, v) => acc + v, 0)
)