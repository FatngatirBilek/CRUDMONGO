import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] }; // Return an empty array if there's an error
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  if (!topics || topics.length === 0) {
    return <div>No topics available.</div>;
  }

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start rounded-xl"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <Link className="btn btn-primary" href={`/detailTopic/${t._id}`}>
              Detail
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
