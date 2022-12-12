const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  let entries = data.split('\n');
  //console.log(entries.filter(e=>e.includes('$ cd')).map(e=>e.slice(5)));
  let position = [];
  let fileSystem = {};
  console.log(traverse(fileSystem,['a','b','c']))
  //fillFileSystem(position,fileSystem,entries.filter(e=>e.includes('$ cd')));
  console.log('obj',JSON.stringify(fileSystem));

} catch (err) {
    console.error(err);
}

function fillFileSystem(position, fileSystem, entries){
    let obj = fileSystem;
    let pos = position;
    let dirs = entries.map(e=>e.slice(5));
    for (element of dirs){
        console.log(element);
        if(element==='/'){
            pos=[];
            continue;
        }
        if(element==='..'){
            pos.pop();
            obj=traverse(obj,pos);
        } else {
            pos.push(element);
            obj=traverse(obj,element);
        }
    }
    console.log('hello', obj);
    fileSystem=obj;
}

function traverse(obj,dir){
    let localObj=obj;
    for(element of dir){
        localObj[element]={};
        localObj=localObj[element];
    }
    return obj;
}