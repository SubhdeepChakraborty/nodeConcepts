import redis from "ioredis"

//Making a client that will run by default 6379
//Now we will use this client to interact with our redis server
const client = new redis() 

export {client}