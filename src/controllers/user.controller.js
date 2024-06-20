import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {CS_3, CS_5, CS_7} from "../models/studentDetails.models.js"


async function processStudentData(data, model, extraFields = { session, semester, marks: {} }) {
    let count = 0;
    for (const element of data) {
        const { registrationNo, studentName, ...rest } = element;

        if (!registrationNo) {
            throw new ApiError(400, "Registration ID is required");
        }
        if (!studentName) {
            throw new ApiError(400, "Student Name is required");
        }

        const existingUser = await model.findOne({
            $or: [{ registrationNo }, { studentName }]
        });

        if (existingUser) {
            existingUser.marks = existingUser.marks || {};
            Object.assign(existingUser, extraFields);
            Object.assign(existingUser.marks, rest);
            await existingUser.save();
        } else {
            await model.create({
                registrationNo: registrationNo.toLowerCase(),
                studentName: studentName.toLowerCase(),
                ...extraFields,
                marks: { ...extraFields.marks, ...rest }
            });
        }
        count++;
    }
    return count;
}

//--------------------CREATE Controllers-------------------------//
const createUsersBySemester = asyncHandler(async (req, res) => {
    let count = 0;
    const semester = parseInt(req.body.semester);
    const session = req.body.session;
    const expr = semester;
    switch (expr) {
        case 3:
            count = await processStudentData(req.parsedData, CS_3, { session, semester, marks: {} });
            break;
        case 5:
            count = await processStudentData(req.parsedData, CS_5, { session, semester, marks: {} });
            break;
        case 7:
            count = await processStudentData(req.parsedData, CS_7, { session, semester, marks: {} });
            break;
        default:
            res.send('Valid Semester Input Required');
    }

    return res.status(201).json(
        new ApiResponse(200, `Details of ${count} Students Uploaded Successfully!`)
    );
});

//--------------------READ Controllers-------------------------//
const fetchUserById = asyncHandler(async (req,res)=>{
    const {registrationNo, studentName} = req.body
    //console.log(req.body)

    if(registrationNo === ""){
        throw new ApiError(400, "Registration ID is required")
    }
    if(studentName === ""){
        throw new ApiError(400, "Student Name is required")
    }

    const existingUser = await StudentDetails.findOne({
        $and: [
            { "registrationNo": { $regex: new RegExp(registrationNo, "i") } },
            { "studentName": { $regex: new RegExp(studentName, "i") } }
        ]  
    })

    if(existingUser) {
        const userData = {
            id : existingUser.registrationNo,
            name : existingUser.studentName,
            nsp : existingUser.NSP,
            mooc : existingUser.MOOC,
            i3 : existingUser.I3,
            assign : existingUser.Assignment,
            total : existingUser.Total
        }
        res.status(200).json(
            new ApiResponse(200, "User details fetched succesfully.", userData)
        );
    } else {
            throw new ApiError(404, "User not found.")
    }
})
const fetchUserBySemester = asyncHandler(async (req,res)=>{
    const semester = parseInt(req.body.semester);
    const session = req.body.session
    
    if (!session || isNaN(semester)) {
        return res.status(400).send(`Valid semester and session are required. Recieved session:${session} & semester:${semester}`);
    }
    let userData;
    
    switch (semester) {
        case 3:
            userData = await CS_3.find({ semester: 3, session: session }).exec();
            break;
        case 5:
            userData = await CS_5.find({ semester: 5, session: session }).exec();
            break;
        case 7:
            userData = await CS_7.find({ semester: 7, session: session }).exec();
            break;
        default:
            return res.status(400).send(`Valid semester input required. Received semester: ${semester}`);
    }

    if (userData) {
        res.send(userData)
    } else {
        res.status(404).send(`User with ID: ${registrationNo} not found in semester: ${semester}`);
    }
})

//--------------------Update Controllers-------------------------//
const updateUserById = asyncHandler(async (req, res) => {
    const { session, registrationNo, marks } = req.body;
    const semester = parseInt(req.body.semester);
    const id = registrationNo.toLowerCase();
    
    if (!registrationNo) {
        throw new ApiError(400, "Registration ID is required");
    }
    if (!semester) {
        throw new ApiError(400, "Semester is required");
    }
    let result;
    let existingDocument, existingMarks;
    
    switch (semester) {
        case 3:
            existingDocument = await CS_3.findOne({ semester: 3, session, registrationNo : id });
            existingMarks = existingDocument.marks;
            result = await CS_3.updateOne(
                { semester: 3, session: session, registrationNo: id },
                { $set: { marks: { ...existingMarks, ...marks } } } // Merge existingMarks with marks from req.body
            );
            break;
        case 5:
            existingDocument = await CS_5.findOne({ semester: 5, session, registrationNo : id });
            existingMarks = existingDocument.marks;
            result = await CS_5.updateOne(
                { semester: 5, session: session, registrationNo: id },
                { $set: { marks: { ...existingMarks, ...marks } } } // Merge existingMarks with marks from req.body
            );
            break;
        case 7:
            existingDocument = await CS_7.findOne({ semester: 7, session, registrationNo : id });
            existingMarks = existingDocument.marks;
            result = await CS_7.updateOne(
                { semester: 7, session: session, registrationNo: id },
                { $set: { marks: { ...existingMarks, ...marks } } } // Merge existingMarks with marks from req.body
            );
            break;
        default:
            return res.status(400).send(`Valid semester input required. Received semester: ${semester}`);
    }

    if (result) {
        res.json(result);
    } else {
        res.status(404).send(`User with ID: ${registrationNo} not found in semester: ${semester}`);
    }
    
});

//--------------------DELETE Controllers--------------------------//
const deleteUserBySemester = asyncHandler(async (req,res)=>{
    const semester = parseInt(req.body.semester);
    const session = req.body.session;
    const expr = semester;
    let result;
    if (!session || isNaN(semester)) {
        return res.status(400).send(`Valid semester and session are required. Recieved session:${session} & semester:${semester}`);
    }
    
    switch (expr) {
        case 3:
            result = await CS_3.deleteMany({ $and: [ { semester: 3 }, { session: session } ] })
            break;
        case 5:
            result = await CS_5.deleteMany({ $and: [ { semester: 5 }, { session: session } ] })
            break;
        case 7:
            result = await CS_7.deleteMany({ $and: [ { semester: 7 }, { session: session } ] })
            break;
        default:
            return res.status(400).send(`Valid semester input required. Recieved semester:${semester}`);
    }
    if(result.acknowledged)
        res.send(`Details of ${result.deletedCount} users deleted succesfully.`)
    else
        res.status(500).send(`Failed to delete user details.`)
})
const deleteUserById = asyncHandler(async (req,res)=>{

    const semester = parseInt(req.body.semester);
    const session = req.body.session;
    const id = req.body.registrationNo.toLowerCase()
    let result;
      
    if (!session || isNaN(semester) || !id) {
        return res.status(400).send(`Valid inputs are required. Recieved session:${session}, semester:${semester} and Registration ID: ${id}`);
    }

    const expr = semester;
    switch (expr) {
        case 3:
            result = await CS_3.deleteOne({ $and: [ { semester: 3 }, { session: session }, {registrationNo : id} ]})
            break;
        case 5:
            result = await CS_5.deleteOne({ $and: [ { semester: 5 }, { session: session }, {registrationNo : id} ]})
            break;
        case 7:
            result = await CS_7.deleteOne({ $and: [ { semester: 7 }, { session: session }, {registrationNo : id} ]})
            break;
        default:
            return res.status(400).send(`Valid semester input required. Recieved semester:${semester}`);
    }
    if(result.acknowledged)
        res.send(`User with ID:${id} deleted succesfully.`)
    else
        res.status(500).send(`Failed to delete user details.`)
})

export {createUsersBySemester, fetchUserById, fetchUserBySemester, deleteUserBySemester, deleteUserById, updateUserById}






































































// - Get User details according to user model from frontend (Postman can be used)
// - validation: check for not empty or for correct format
// - check if user already exists (using reg id or name)
// - check for user uploaded files
// - upload them to cloudinary
// - create user object - create entry in db
// - remove password and refresh token field from response
// - check for user creation
// - return response
