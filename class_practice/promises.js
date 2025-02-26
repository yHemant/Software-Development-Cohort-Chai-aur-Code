console.log("Start of the program");


const { rejects } = require('assert');
/* -----------------this is call back hell-----------*/
// const fs = require('fs');

// fs.readFile('./PromiseHelperFile.txt', 'utf-8', function(err, data){
    //     if(err){
        //         console.log(`error occured during while reading`);
        //     } else{
            //         console.log(`File has been read successfully and the contents are ${data}`)
            //         fs.writeFile('./callbackfnCreatedFile.txt', data, function(err){
                //             if(err){
                    //                 console.log(`Error in writng the file`);
                    //             } else {
                        //                 console.log(`New file has been created and the data has been written in the new file.`)
                        //                 fs.unlink('./PromiseHelperFile.txt', function(e){
                            //                     if(e){
                                //                         console.log('Error in deleting the helper file');
                                //                     }
                                //                     else{
                                    //                         console.log(`Helper File deleted successfully`);
                                    //                     }
                                    //                 })
                                    //             }
                                    //         })
                                    //     }
                                    // })
                                    

/* -----------------this is promises-----------*/
  
// const fsv2 = require('fs/promises');

// fsv2.readFile('./PromiseHelperFile.txt', 'utf-8')
// .then((data)=>{fsv2.writeFile('./callback.txt', data)})
// .then(()=>{fsv2.unlink('./PromiseHelperFile.txt')})
// .catch((e)=>{console.log(`Something Went wrong`)})
// .finally(console.log("Task Completed"))

// ------Below is the promisified verison of read, write, unlink-------------
// -------- we can say that below is the polyfill of require('fs/promises')------

const fss = require('fs');

function readFileWithPromise(filepath, encoding){
    return new Promise((resolve, reject)=>{
        fss.readFile(filepath, encoding, (err, data)=>{
            if(err){
                reject(err);
            } else{
                resolve(data);
            }
        })
    })
}

function writeFileWithPromise(filepath, content){
    return new Promise((resolve, reject)=>{
        fss.writeFile(filepath, content, (err)=>{
            if(err){
                reject(err)
            } else {
                resolve();
            }
        })
    })
}

function unlinkFileWithPromise(filepath){
    return new Promise((resolve, reject)=>{
        fss.unlink(filepath, (err)=>{
            if(err){
                reject(err);
            } else {
                resolve()
            }
        })
    })
}

// readFileWithPromise('./PromiseHelperFile.txt', 'utf-8')
// .then((cnt)=>{
//     console.log(`file has been read and the data is ${cnt}`)
//     writeFileWithPromise('./backup.txt', cnt)
//     console.log(`file has been written`);
// })
// .then(()=>{
//     unlinkFileWithPromise('./PromiseHelperFile.txt')
//     console.log(`file has been deleted`);
// })
// .catch((err)=>{
//     console.log(`Something went wrong`);
// })

// //------Below is Async Await ---------------//

async function readWrite(){
    const filecontent = await readFileWithPromise('./PromiseHelperFile.txt', 'utf-8');
    await writeFileWithPromise('./backup.txt', filecontent);
    await unlinkFileWithPromise('./PromiseHelperFile.txt');
}

readWrite().then(()=> console.log(`All done with async await`));

console.log("End of the program");