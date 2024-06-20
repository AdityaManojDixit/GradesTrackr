import {promises as fs} from 'fs';
import assert from 'node:assert';
import { parse } from 'csv-parse';
import { ApiError } from './ApiError.js';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// //Assuming the file is located in the utils folder
// const filePath = path.join(__dirname, 'marks.csv');

async function parseCSV(filePath) {
  try {

    const file = await fs.readFile(filePath)

    const records = [];

    const parser = parse(file,{delimiter: ',', columns:true, skip_empty_lines: true}); // Initialize the parser

    parser.on('readable', function() { // Use the readable stream api to consume records
      let record;
      while ((record = parser.read()) !== null) {
      records.push(record);
      }
    });

    parser.on('error', function(err){
      throw new ApiError(500, "An error occurred while parsing the file." , err)
    });

    await new Promise((resolve,reject)=>{
      parser.on('end', function(){
        resolve();
      })
    });

    return records;
  } catch (err) {
      console.error("An error occurred while reading the file asynchronously.", err);
      return []; 
  }
}

// parseCSV(filePath)
// .then(result => {
//   console.log(result)
// })

export {parseCSV}
















