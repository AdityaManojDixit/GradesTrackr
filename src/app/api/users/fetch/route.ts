import connectDB from "../../../../db/conn";
import { CS_3, CS_5, CS_7 } from "../../../../models/studentDetails.models";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json() //Parses json string in JSON object
        console.log(reqBody)
        const {registrationNo, studentName, semester} = reqBody
        let userData: any[] = [];
       
        switch (semester) {
            case 3:
                userData = await CS_3.find({ semester: 3, registrationNo : registrationNo }).exec();
                break;
            case 5:
                userData = await CS_5.find({ semester: 5, registrationNo : registrationNo }).exec();
                break;
            case 7:
                userData = await CS_7.find({ semester: 7, registrationNo : registrationNo }).exec();
                break;
            default:
                return NextResponse.json({error: "Cannot find user"}, {status:400});
        }
        
        if (userData) {
            return Response.json(userData)
        } else {
            return NextResponse.json({error: "Cannot find user"}, {status:404});
        }
    

    }catch(error : any){
        return NextResponse.json({error:error.message}, {status:500})
    }
}