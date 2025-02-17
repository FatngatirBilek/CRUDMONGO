import Link from "next/link";
import Image from "next/image";
const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return { topic: null }; // Return null if there's an error
  }
};

export default async function DetailTopic({ params }) {
  const { id } = await params;
  const { topic } = await getTopicById(id);

  if (!topic) {
    return <div>Topic not found.</div>;
  }

  const { title, description, content } = topic;

  return (
    <>
      <div className="grid md:gap-3 justify-center">
        <div className="md:col-span-2">
          <Image
            src="/images/nixos.png"
            alt="nixos"
            width={640}
            height={640}
            sizes="100px"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
        </div>
      </div>
      <div className="divider">
        <h1 className="text-xl">{title}</h1>
      </div>
      <div className="divider-info grid">
        <p>{description}</p>
        <p>{content}</p>
      </div>
    </>
  );
}
