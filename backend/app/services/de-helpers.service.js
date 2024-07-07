const helpers = {
    stringify: obj => JSON.stringify(obj),
    parse: obj => JSON.parse(obj),
    arrayfy: (...values) => values.slice(0, -1),
    every: arr => arr.every(Boolean),
    some: arr => arr.some(Boolean),
    compare: (first, second) => first === second,
    eq: (first, second) => first == second,
    notEq: (first, second) => first != second,
    gt: (first, second) => first > second,
    lt: (first, second) => first < second,
    mod: (first, second) => first % second,
    pow: (first, second) => Math.pow(first, second),
    divide: (first, second) => first / second,
    multiply: (first, second) => first * second,
    add: (first, second) => first + second,
    subtract: (first, second) => first - second,
    and: (first, second) => first && second,
    not: value => !value,
    or: (first, second) => first || second,
    countUpto: number => {
        let counter = 1
        let ar = []
        while (counter <= number) {
            ar.push(counter)
            counter++
        }
        return ar
    },
}

module.exports = helpers