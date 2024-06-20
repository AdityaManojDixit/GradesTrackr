import { parseCSV } from "../utils/csvParser.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

// console.log(__filename)
// console.log(__dirname)
// const filepath = path.join(__dirname, '..', '..', 'public', 'temp', 'marks.csv');
// console.log(filepath)
// const marksFileLocalPath = "marks.csv"
// const filep = path.join(__dirname, '..', '..', marksFileLocalPath)
// console.log(filep);

const csvParser = (req, res, next) => {

  const marksFileLocalPath = req.file.path;
  // console.log(req.file)
  // const fileContents = req.file.buffer.toString('utf-8');
  // console.log(fileContents);
  if(!marksFileLocalPath) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, '..', '..', marksFileLocalPath)
  
  parseCSV(filePath)
  .then(records =>{
    req.parsedData = records
    next();
  })
  .catch(error=>{
    console.log('Error while parsing CSV:', error);
    res.status(500).json({error:'Internal Server Error'})
  })
};

export {csvParser}


















