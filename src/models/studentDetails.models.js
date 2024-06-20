import mongoose from "mongoose";
 
const _3CSSchema = new mongoose.Schema({
    registrationNo: { type: String, required: true, unique: true, index: true },
  
    studentName: { type: String, required: true, trim: true, index: true },
  
    session: { type: String, required: true, trim: true, index: true },
  
    semester: { type: Number, required: true, trim: true, index: true },
  
    marks: {
        // nsp: { type: Number, default: null, min: 0, max: 20 },
        // project: { type: Number, default: null, min: 0, max: 20 },
        // assignment: { type: Number, default: null, min: 0, max: 20 },
        // total: { type: Number, default: null, min: 0, max: 60 }
    }
    
}, { timestamps: true });

const _5CSSchema = new mongoose.Schema({
    registrationNo: { type: String, required: true, unique: true, index: true },
  
    studentName: { type: String, required: true, trim: true, index: true },
  
    session: { type: String, required: true, trim: true, index: true },
  
    semester: { type: Number, required: true, trim: true, index: true },
  
    marks: {
        // NSP: { type: Number, default: null, min: 0, max: 20 },
        // MOOC: { type: Number, default: null, min: 0, max: 20 },
        // I3: { type: Number, default: null, min: 0, max: 20 },
        // Assignment: { type: Number, default: null, min: 0, max: 20 },
        // Total: { type: Number, default: null, min: 0, max: 80 }
    }

}, { timestamps: true });

const _7CSSchema = new mongoose.Schema({
    registrationNo: { type: String, required: true, unique: true, index: true },
  
    studentName: { type: String, required: true, trim: true, index: true },
  
    session: { type: String, required: true, trim: true, index: true },
  
    semester: { type: Number, required: true, trim: true, index: true },
  
    marks: {
        // NSP: { type: Number, default: null, min: 0, max: 20 },
        // Project: { type: Number, default: null, min: 0, max: 20 },
        // Assignment: { type: Number, default: null, min: 0, max: 20 },
        // Total: { type: Number, default: null, min: 0, max: 80 }
    }
  
}, { timestamps: true });


export const CS_3 = mongoose.models.CS_3 || mongoose.model("CS_3", _3CSSchema);
export const CS_5 = mongoose.models.CS_5 || mongoose.model("CS_5", _5CSSchema);
export const CS_7 = mongoose.models.CS_7 || mongoose.model("CS_7", _7CSSchema);