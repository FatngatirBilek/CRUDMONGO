import Link from "next/link";
const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function DetailTopic({ params }) {
  const { id } = await params;
  const { topic } = await getTopicById(id);
  const { title, description, content } = topic;

  return (
    <>
      <div className="divider">
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="divider-info">
        <p>{description}</p>
        <p>{content}</p>
      </div>
    </>
  );
}
