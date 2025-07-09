//Streams?

//We actually use stream to break the data into smaller parts like chunks
//For example large data(file video etc)

//It gives you memory efficency as well as the fast processing

//Example --> steamInput.text -> text -> steamOutput.txt -> Encryption and Decryption
import fs from "fs";
import crypto from "crypto";

// Encryption setup
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // Must be 32 bytes for aes-256
const iv = crypto.randomBytes(16); // Initialization vector (must be 16 bytes)

// Save the key and IV somewhere securely if you want to decrypt later
console.log("Encryption Key (save this):", key.toString("hex"));
console.log("IV (save this):", iv.toString("hex"));

// Create cipher
const cipher = crypto.createCipheriv(algorithm, key, iv);

// Create streams
const readStream = fs.createReadStream("steamInput.txt");
const writeStreamEncrypt = fs.createWriteStream("outputEncrypt.txt");

//pipe is used to copy the data chunk by chunk
//pipe only go in one way we can't use it for encrypt and then decrypt in a single go
function decrypt(){
  //create Decipher
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const readStream = fs.createReadStream("outputEncrypt.txt");
  const writeStreamDecrypt = fs.createWriteStream("outputDecrypt.txt");

  readStream.pipe(decipher).pipe(writeStreamDecrypt).on("finish",() =>{
    console.log('Finish copied with decryption!')
  })

}

// Pipe through cipher to encrypt while writing
readStream.pipe(cipher).pipe(writeStreamEncrypt).on("finish", () => {
    decrypt()
})

console.log("File copied with encryption!");

