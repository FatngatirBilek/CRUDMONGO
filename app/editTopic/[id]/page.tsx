import EditTopicForm from "@/components/EditTopicForm";

interface Params {
  id: string;
}

const getTopicById = async (id: string) => {
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

export default async function EditTopic({ params }: { params: Params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);

  if (!topic) {
    return <div>Topic not found.</div>;
  }

  const { title, description, content } = topic;

  return (
    <EditTopicForm
      id={id}
      title={title}
      description={description}
      content={content}
    />
  );
}
