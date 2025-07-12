import { client } from "./client.js";

//As we already run redis in our docker container -> also interact with redis-cli
//Created a no. of users through this command in cli -> mset user:1 Subhadeep user:2 Chakraborty.. etc

//Getting data inside redis
async function getRedisData() {
    const result = await client.get('user:4')
    console.log("Result -> ", result)
}

//Now lets set data
async function setRedisData(params) {
    //nx will look inside redis [redis -> which is nothing but a superfast memory]
    //if it will find then it return ni in cli
    await client.setnx("user:4", "Elu").then(() => console.log('Data have been inserted inside redis')).catch((err) => console.log(err))
}

//Now we can also delete a certain key or expire it 
//With the help of command 
async function setExpiryRedisKey() {
    //expire will make that key delete in 10sec
    await client.expire("user:4", 10)
}



//callset fn
// setRedisData()

//expiry fn
// setExpiryRedisKey()

//Call get fn
getRedisData();