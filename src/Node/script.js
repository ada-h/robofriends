const script2 = require('./script2')

const a = script2.largeNumber;
const b=10;

setTimeout(() => {
    console.log(a + b);
}, 3000)

