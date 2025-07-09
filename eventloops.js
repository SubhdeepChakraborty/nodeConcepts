//Learning about eventloops + what is the difference btw microtask and macrostack?

//Eventloops is mothing but a building mechanism inside nodejs that will allow to perform
//I/O operations and it goes from following phases actually the main work of event loops
//Is to check the callstack if empty then take callback from queue and run it on callstack
//Actually its a traffic police which handles the syn and asyn thing smoothly

//It has four phases

// timers -> pending callbacks -> Idle, Prepare -> poll -> check -> close callbacks

//Lets see an example will understand correctly

import fs from "fs"
import crypto from "crypto"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

console.log('1, Script Start');

//timer phase
setTimeout(() => {
    console.log('2, setTimeout 0s callback (macrotask)')
}, 0)

//check phase
setImmediate(() => {
  console.log("3, setTimeout 0s callback (check phase)");
}, 0);

//Microtask phase
Promise.resolve().then(() =>{
    console.log('4, Promise resolved (microtask)')
})

process.nextTick(() => {
    console.log('6, Process.nexttick callback is (microtask)')
})

fs.readFile(__filename, () => {
    console.log('7, file read operation (I/0 callback)')
})


//Cpu intensive operation
crypto.pbkdf2('secret', 'salt', 10000, 64, 'sha512', (err) => {
    if(err) throw err
    console.log('8, pbkdf2 which is (cpu intensive operation)')
})

console.log('9 script ends')
