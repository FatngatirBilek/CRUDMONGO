import EditTopicForm from "@/components/EditTopicForm";

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

export default async function EditTopic({ params }) {
  const { id } = await params;
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
