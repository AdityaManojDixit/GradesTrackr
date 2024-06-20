"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Separator } from "../../../components/ui/separator"
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

function displayError(message) {
  // const resultContainer = document.getElementById("result-container");
  // resultContainer.innerHTML = `<p>Error: ${message}</p>`;
}

export function UserInputCard() {
  const [userData, setUserData] = useState(null);
  const [registrationNo, setRegistrationNo] = useState("");
  const [studentName, setstudentName] = useState("");
  const [semester, setSemester] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userData === null) {
      setMessage("");
    } else {
      setMessage("View Score");
    }
  }, [userData]);

  const handleIdChange = (e) => setRegistrationNo(e.target.value);
  const handleNameChange = (e) => setstudentName(e.target.value);
  const handleSemChange = (value) => {
    setSemester(parseInt(value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      registrationNo,
      studentName,
      semester,
    };

    try {
      console.log("Sending request...");
      const response = await fetch("http://localhost:3000/api/users/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const userData = await response.json();
      if (userData.length === 0) {
        console.log("No user data found");
      } else {
        console.log(userData[0].marks);
        setUserData(userData[0]);
      }
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <div>
      {
        <div className="grid w-full max-w-sm items-center gap-2.5">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>DECA Marks</CardTitle>
              
              <CardDescription>
                Enter your details to view your grades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="fetch-user-form" onSubmit={handleSubmit}>
                <Label htmlFor="regid">Registration ID:</Label>
                <Input
                  type="text"
                  id="regid"
                  name="regid"
                  placeholder="Registration ID"
                  value={registrationNo}
                  onChange={handleIdChange}
                />

                <Label htmlFor="stname">Student Name:</Label>
                <Input
                  type="text"
                  id="stname"
                  name="stname"
                  placeholder="Name"
                  value={studentName}
                  onChange={handleNameChange}
                />

                <Label htmlFor="sem">Semester:</Label>
                <Select
                  id="sem"
                  defaultValue={semester}
                  onValueChange={handleSemChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="3">3rd Sem.</SelectItem>
                    <SelectItem value="5">5th Sem.</SelectItem>
                    <SelectItem value="7">7th Sem.</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex justify-between items-centre mt-5">
                  <Button type="submit">Submit</Button>
                  {userData && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="mt-0 bg-green-500 text-white p-4 rounded "
                        >
                          {message}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-54 mt--1 ">
                        {userData && <MarksCard data={userData} />}
                        {!userData && "Please enter your details..."}
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      }
    </div>
  );
}



export function MarksCard({ data }) {
  const name = data.studentName;
  const words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = ' ' + words[i][0].toUpperCase() + words[i].substr(1);
  }
  words.join(" ");

  const keysCount = Object.entries(data.marks).length;
  const marksTotal = keysCount === 5 ? <span>(80)</span> : <span>(60)</span>;
  const subjectTotal = <span>(20)</span>;
  return (
    <div className="grid w-full max-w-sm items-center gap-2.5 ">
      <Card className="w-[350px] border rounded-md border-none shadow-none">
        <CardHeader>
          <CardTitle >{words}'s Scores</CardTitle>
          <Separator className="my-3" />
        </CardHeader>
        <CardContent>
          {Object.entries(data.marks).map(([key, value]) => (
            <p
              key={key}
              className=" flex justify-between items-center text-l m-3 text-slate-800 font-medium rounded-md "
            >
              <span className="text-m text-slate-800  font-semibold rounded-md ">
                {key} {key !== "Total" ? subjectTotal : marksTotal} :
              </span>
              <span className="flex justify-center  items-center text-l text-slate-600 border ml-10 font-medium rounded-md h-full border-solid  w-20 h-8">
                {" "}
                {value}
              </span>
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
