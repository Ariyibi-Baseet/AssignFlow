import Navbar from "../components/PageComponent/Navbar";
import { useParams } from "react-router-dom";
import { db } from "../fireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function SavedAssignment() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);

  const fetchAssignment = async () => {
    const docSnap = await getDoc(doc(db, "assignments", id));
    if (docSnap.exists()) setAssignment(docSnap.data());
  };

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  if (!assignment) return <p className="text-center mt-10">Loading...</p>;
  return (
    <>
      <Navbar />
      <div className="mx-auto p-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <h2 className="uppercase font-bold">{`${assignment.topic} Assignment ✍`}</h2>
              <Badge className="bg-green-200 text-green-800">Beginner</Badge>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <ReactMarkdown>{assignment.content}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SavedAssignment;
