"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

const Transition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export default function AddTopicPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !content) {
      setShowAlert(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, content }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Transition}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          All fields are required
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border-2 border-slate-500 px-8 py-2 rounded-2xl"
          type="text"
          placeholder="Topic Title"
        ></input>

        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border-2 border-slate-500 px-8 py-2 rounded-2xl"
          type="text"
          placeholder="Topic Description"
        ></input>

        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="border-2 border-slate-500 px-8 py-2 rounded-2xl"
          type="text"
          placeholder="Topic Content"
        ></input>

        <button
          type="submit"
          className="bg-gray-600 font-bold text-white py-3 px-6 w-fit rounded-xl"
        >
          Add Topic
        </button>
      </form>
    </div>
  );
}
