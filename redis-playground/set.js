import { client } from "./client.js";

//Talking about sets
async function setAddFn(params) {
   //Adding that element in the set
   //We all know about set behaviour
   for(let i = 0; i<4; i++){
    await client.sadd('ip', i)
   }
}

//Now lets remove a element
// [0, 1, 2, 3] 
//Now 3 will be removed
async function removeElementfn(params) {
    //srem thing used to remove element inside set
    await client.srem('ip', 3).then(() => console.log(`removed successfuly`)).catch((err) => console.log(err))
}

//Now you need to know if something exist or not
async function setElementExistFn(params) {
    const numberOne = await client.sismember('ip', 0);
    const numberTwo = await client.sismember("ip", 1);
    const numberThree = await client.sismember("ip", 3);
    console.log(numberOne, numberTwo, "exist means 1");
    console.log(numberThree, 'No means 0')
}

//Adding element in the set
// setAddFn()

//Removing an element in the set
// removeElementfn()

//Element exist or not
// setElementExistFn()