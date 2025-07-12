import { client } from "./client.js";

async function hashSetfn(params) {
    //creating hashes inside redis
    await client.hset("Family", {
      name: "Subhadeep",
      sirname: "Chakraborty",
      age: "25",
      state: "west bengal" ,
    }).then(() => console.log('Successfully created')).catch((err) => console.log(err))
}

//Now we want to get the model of bike which is deimos
async function getValueHash() {
    const getData = await client.hget('Family', 'sirname')
    console.log(`Family sirname ${getData}`)
}

async function getAllData() {
    const getAllData = await client.hgetall("Family")
    console.log(getAllData)
}


//Hashes setting
// hashSetfn()

//Getting data
// getValueHash()

//Getting all the data
// getAllData()