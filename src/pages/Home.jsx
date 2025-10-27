// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// component from lucide-react
import { Pencil } from "lucide-react";
// Page Components
import Navbar from "../components/ui/PageComponent/Navbar";
// import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
// React Hooks
import { useState } from "react";
// Other Component
import ReactMarkdown from "react-markdown";

function Home() {
  const [assignmentData, setAssignmentData] = useState("");
  const [textToDisplay, setTextToDisplay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState("Generate Assignments");
  const [fullyGenerated, setFullyGenerated] = useState(false);
  const [showAssignmentResponse, setShowAssignmentResponse] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI,
  });
  // I will later make the card to be transferrable , when they click on the card it will copy the makdown or send it as a link
  const prompt = `You are a web development instructor.
Generate 1 assignment ideas on`;

  const getResFromOpenAI = async () => {
    if (!assignmentData.trim()) {
      setErrMessage("Please enter a topic before generating assignments.");
      return;
    }
    try {
      setErrMessage("");
      setIsLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${prompt} ${assignmentData} for Beginners. Make it short and concise so that student can copy and implement it`,
              },
            ],
          },
        ],
      });
      const text = response.candidates[0].content.parts[0].text;
      // Will later add the text to local storage to keep track of the previous response
      if (text) {
        setTextToDisplay(text);
      } else {
        setErrMessage("No text was generated. Try again with a clearer topic.");
      }
    } finally {
      setIsLoading(false);
      setShowAssignmentResponse(true);
      setIsGenerated("Generated!🎉");
      setFullyGenerated(true);
    }
  };

  return (
    <>
      <Navbar />

      <div id="home-page" className="@container mx-auto w-4/5">
        <h1 className="text-3xl text-center font-bold mt-28">
          Generate Web Development Assignment with AI
        </h1>
        <p className="text-xl text-center mx-auto mt-3 max-w-[540px]">
          Enter a topic below and let AI suggest practical exercises tailored
          for web development students
        </p>

        <div className="w-3/5 mx-auto shadow-lg p-8 mt-20">
          <div className="mb-3">
            <Label htmlFor="topic" className="mb-3">
              Topic
            </Label>
            <Input
              type="text"
              value={assignmentData}
              placeholder="E.g Javascript Loops, CSS Flexbox, HTML Tables"
              onChange={(e) => setAssignmentData(e.target.value)}
            />
            <div className="mb-4 mt-3">
              <Label htmlFor="text" className="mb-3">
                Difficulty Level <Badge variant="secondary">Coming Soon</Badge>
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty Level</SelectLabel>
                    <SelectLabel>Beginner</SelectLabel>
                    <SelectLabel>Intermediate</SelectLabel>
                    <SelectLabel>Advanced</SelectLabel>
                    {/* <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-3">
              <Button
                onClick={getResFromOpenAI}
                disabled={fullyGenerated === true}
                style={{
                  backgroundColor:
                    isGenerated === "Generated!🎉" ? "green" : "black",
                }}
              >
                <Pencil /> {isGenerated} {isLoading && <Spinner />}
              </Button>
              <p className="text-destructive mt-2 font-bold text-[12px]">
                {errMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Display Assignment Card */}
        {showAssignmentResponse && (
          <div className="mt-20 w-4/5 mx-auto mb-20">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <h2 className="uppercase">{`${assignmentData} Assignment ✍`}</h2>
                  <Badge>Beginner</Badge>
                </CardTitle>
                <Separator />
                {/* <CardDescription className="mt-3">
                  <ReactMarkdown>{textToDisplay}</ReactMarkdown>
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <ReactMarkdown>{textToDisplay}</ReactMarkdown>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
