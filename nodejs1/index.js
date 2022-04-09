const fileSystem = require("fs/promises");

// create file
// fileSystem.writeFile("first.txt", "hello B1 People !");

// delete file
// fileSystem.unlink("first.txt");

// append data to file
// fileSystem.appendFile("first.txt", "hello we meet again by appending here !");

// creat folder / directories
// fileSystem.mkdir("second");

// remove the folder /directories
// fileSystem.rmdir("second");
// access files
// Use cases
// CLI application
// logging

// os
// const operatingSystem = require("os");
// console.log(operatingSystem.platform());  //mac-darwin ,window-win32 ,linux-debbie
// console.log(operatingSystem.arch());  // x64  x86  bit system

// environment variable ->env ->runtime
// console.log(process.env);

// create server
const http = require("http");
http
  .createServer((request, Response) => {
    console.log(request.headers);
    Response.end("     hallow Client  !!!!!!!!!")
  })
  .listen(3000);
