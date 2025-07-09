//Buffer?

//Handle us with binary data -> example -> image processing
//Fix length once created and helps us in fast data processing
//We used buffer only when we need to store raw data directly to memory or peocess it

//create buffer
const bufferCreate = Buffer.alloc(10) //allocate buffer of 10 bytes
console.log(bufferCreate) //All will be zeros

//Another with string -> Creating buffer
const bufferString = Buffer.from("Hello")
console.log(bufferString)

//Also we can write
bufferCreate.write("Subhadeep");
console.log("writing", bufferCreate.toString());

