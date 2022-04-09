// const fileSystem=require("fs/promises");//importing packages

// create a file
// fileSystem.writeFile("first.txt","hello my people how are you!!!!!!!!!!!.");

// // delete file 
// // fileSystem.unlink("first.txt");

// // insert contet in files 
// fileSystem.appendFile("first.txt","  i am new member appended here...");

// // create folders
// fileSystem.mkdir("second");
// // remove/delete folder
// fileSystem.rmdir("second");


// use cases 
// 1.CLI applications
// 2.Logging

// operating system 
// const operatingSystem=require("os");
// console.log(operatingSystem.platform()); //mac- darwin,linux- debian,kali, window -win32
// console.log(operatingSystem.arch());// /x

// environment variable ->env 
// console.log(process.env);

// creating basic server 
const http=require("http");
http.createServer((request,response)=>{
    console.log(request.headers);  //exchage imnformation server and client
    response.end("hello client.....!")}).listen(3000);


