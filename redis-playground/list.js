import { client } from "./client.js";

async function pushElementsLeft() {
    //lpush -> left side se push to the list
    for(let i =0; i<4; i++){
        await client.lpush('messages', i)
    }
    console.log('Successfully pushed to the list')
}

async function popElementsRight(params) {
    //rpop -> right side se pop in the list
    for (let i = 0; i < 4; i++) {
      await client.rpop("messages", i);
    }
    console.log("Successfully poped elements in the list");
}

async function readElementsRange() {
  //lrange helps us to see the list
  //0, -1 means full range le aao
  const data = await client.lrange("messages", 0, -1);
  const unique = [...new Set(data)];

  //Without this unique set you will get this type of output
  //[
  //   '3', '2', '1', '0', '3',
  //   '2', '1', '0', '3', '2',
  //   '1', '0', '3', '2', '1',
  //   '0', '3', '2', '1', '0',
  //   '3', '2', '1', '0'
  // ]
  //Why having this type of output and ui localhost:8001 i can see this type of data [ '3', '2', '1', '0' ] ?


  console.log(unique); // [ '3', '2', '1', '0' ]
}

async function clearElements() {
    
}

//lpush
// pushElementsLeft();

//Rpop
// popElementsRight()

//ReadElemts lrange
// readElementsRange()

//Clear list