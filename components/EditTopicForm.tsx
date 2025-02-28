"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({
  id,
  title,
  description,
  content,
}: {
  id: string;
  title: string;
  description: string;
  content: string;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newContent, setNewContent] = useState(content);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription, newContent }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2 rounded-2xl"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2 rounded-2xl"
        type="text"
        placeholder="Topic Description"
      />

      <input
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="border border-slate-500 px-8 py-2 rounded-2xl"
        type="text"
        placeholder="Topic Content"
      />

      <button className="bg-gray-600 font-bold text-white py-3 px-6 w-fit rounded-xl">
        Update Topic
      </button>
    </form>
  );
}
