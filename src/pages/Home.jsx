// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
// component from lucide-react
import { Pencil, Bookmark, Share2, MoveRight } from "lucide-react";
// Page Components
import Navbar from "../components/PageComponent/Navbar";
import Footer from "../components/PageComponent/Footer";
// import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
// React Hooks
import { useEffect, useState } from "react";
import useSound from "use-sound";
// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../fireBaseConfig";
import Beep from "../../public/sound/beep.mp3";
// Other Component
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/authContext";

// from driver js
// import { driver } from "driver.js";
// import "driver.js/dist/driver.css";

// import { Helmet } from "react-helmet";

function Home() {
  const [assignmentData, setAssignmentData] = useState("");
  const [studentName, setStudentName] = useState("");
  const [textToDisplay, setTextToDisplay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState("Generate Assignments");
  const [fullyGenerated, setFullyGenerated] = useState(false);
  const [showAssignmentResponse, setShowAssignmentResponse] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isSaveText, setIsSaveText] = useState("Save");
  const [viewAssLink, setViewAssLink] = useState("");
  const [isShareBtnDisabled, setShareBtnDisabled] = useState(true);
  const [isSaveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [play] = useSound(Beep, { volume: 0.7 });
  const { user, signInWithGoogle } = useAuth();

  // const driverObj = driver();

  // const startTour = () => {
  //   driverObj.highlight({
  //     showProgress: true,
  //     element: ".assignment-head-text",
  //     popover: {
  //       title: "Welcome to AssignFlow! 🚀",
  //       description:
  //         "Your AI-powered web development assignment generator. Let's take a quick tour!",
  //       position: "bottom",
  //     },
  //   });
  // };

  // let assignmentArr = [""];
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI,
  });
  // I will later make the card to be transferrable , when they click on the card it will copy the makdown or send it as a link
  const prompt = `You are a web development instructor.
Generate 1 assignment ideas on`;

  const getResFromGeminiAI = async () => {
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
                text: `${prompt} ${assignmentData} for Beginners. Make it short and concise, don't help them to solve it. Add instructions at the end that they must submit it to their teacher.`,
              },
            ],
          },
        ],
      });

      if (!response || !response.candidates || !response.candidates[0]) {
        throw new Error("Invalid response from the AI service");
      }

      const text = response.candidates[0].content.parts[0].text;
      // Will later add the text to local storage to keep track of the previous response
      if (text) {
        setTextToDisplay(text);
        // localStorage.setItem("AssignmentArr", text);
      } else {
        setErrMessage("No text was generated. Try again with a clearer topic.");
      }
    } catch (error) {
      if (error.status === 503 || error.message.includes("503")) {
        setErrMessage(
          "The AI service is temporarily unavailable (503). Please wait a few seconds and try again."
        );
      } else if (
        error.name === "TypeError" &&
        error.message.includes("fetch")
      ) {
        setErrMessage(
          "Network error. Check your internet connection and try again."
        );
      } else {
        setErrMessage(`Something went wrong: ${error.message}`);
      }
      toast(error);
    } finally {
      setIsLoading(false);
      setShowAssignmentResponse(true);
      setIsGenerated("Generated!🎉");
      play();
      setFullyGenerated(true);
    }
  };

  // const openUserLoggedInAlertBox = () => {
  //   setOpenUserLoggedInBox(true);
  // };

  const saveAssignmment = async () => {
    try {
      setSaveLoading(true);
      // generate random unique ID
      const id = crypto.randomUUID();
      // Save Data in Firebase Firestore
      await setDoc(doc(db, "assignments", id), {
        id,
        topic: assignmentData,
        content: textToDisplay,
        student_name: localStorage.getItem("student_name"),
        createdAt: new Date().toISOString(),
      });

      setViewAssLink(`${window.location.origin}/saved-assignment/${id}`);
      setIsSaveText("Saved!");
      setShareBtnDisabled(false);
    } catch (error) {
      return console.error(error);
    } finally {
      setSaveLoading(false);
      play();
      isSaveBtnDisabled(true);
    }
  };

  // useEffect(() => {
  //   getResFromGeminiAI();
  // }, []);

  return (
    <>
      {/* <Helmet>
        <title>AssignFlow 🔥 | AI Web Development Assignment Generator</title>
        <meta
          name="description"
          content="AssignFlow helps instructors and students generate smart, ready-to-use web development assignments using AI — powered by Gemini AI. Save time, inspire creativity, and level up your learning experience."
        />
        <meta
          name="keywords"
          content="AI assignment generator, web development assignments, HTML CSS JS assignments, React tasks, coding practice ideas, web dev challenges, AssignFlow"
        />
        <meta name="author" content="Ariyibi Baseet" />
        <meta
          property="og:title"
          content="AssignFlow 🔥 | AI Assignment Generator for Web Developers"
        />
        <meta
          property="og:description"
          content="Generate personalized web development assignments with AI. Ideal for instructors and learners. Built with Gemini AI."
        />
        <meta
          property="og:image"
          content="../../public/assignflow_og_image.jpg"
        />
        <meta
          property="og:url"
          content="https://assign-flow-seven.vercel.app/"
        />
        <link rel="canonical" href="https://assign-flow-seven.vercel.app/" />
      </Helmet> */}
      <Navbar />
      <div id="home-page" className="mx-auto p-5 bg-[#f9fafb]">
        <h1 className="text-2xl sm:text-3xl text-center font-bold mt-22 assignment-head-text text-[#605ff0]">
          Generate Web Development Assignment with AI
        </h1>
        <p className="text-lg sm:text-xl text-center mx-auto mt-3 max-w-[540px] assignment-paragraph text-[#3c3c3c]">
          Enter a topic below and let AI suggest practical exercises tailored
          for web development students
        </p>

        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto shadow-lg p-8 mt-20 bg-white topic-block">
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
                className="bg-linear-to-br from-[#605ff0] to-[#8d37ea] hover:bg-[#6868f0] w-full sm:w-auto md:w-auto lg:w-full generate-assignment-btn"
                onClick={getResFromGeminiAI}
                disabled={fullyGenerated === true}
                style={{
                  backgroundImage:
                    isGenerated === "Generated!🎉"
                      ? "linear-gradient(to bottom right, #605ff0, #605ff0)"
                      : "linear-gradient(to bottom right, #605ff0, #8d37ea)",
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

        {/* ******************************************************* */}
        {/* ************* DISPLAY ASSIGNMENT CARD *******************/}
        {/* ******************************************************* */}
        {showAssignmentResponse && !errMessage && textToDisplay && (
          <div className="mt-20 w-4/5 mx-auto mb-20 assignment-response-card">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <h2 className="uppercase assignment-title">{`${assignmentData} Assignment ✍`}</h2>
                  <Badge className="bg-green-200 text-green-800">
                    Beginner
                  </Badge>
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <ReactMarkdown>{textToDisplay}</ReactMarkdown>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <Button
                    className="bg-[#605ff0] hover:bg-[#6868f0] save-assignment-btn"
                    onClick={!user ? signInWithGoogle : saveAssignmment}
                    disabled={isSaveBtnDisabled}
                  >
                    <Bookmark />
                    <span className="ms-1">
                      {user ? isSaveText : "Login with Google to Save"}
                    </span>
                    {isSaveLoading && <Spinner />}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-[#605ff0] hover:bg-[#6868f0] share-assignment-btn"
                        disabled={isShareBtnDisabled}
                      >
                        Share <Share2 />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                          Anyone who has this link will be able to view this.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="link"
                            defaultValue={viewAssLink}
                            readOnly
                          />
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={saveAssignmment}
                          >
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        {/* ****************************************************** */}

        {/* *****************************************************  */}

        <Footer />
      </div>
    </>
  );
}

export default Home;
