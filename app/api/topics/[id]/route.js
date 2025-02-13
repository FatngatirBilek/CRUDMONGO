import connect from "@/lib/databaseconnect";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const {
    newTitle: title,
    newDescription: description,
    newContent: content,
  } = await request.json();
  await connect();
  await Topic.findByIdAndUpdate(id, { title, description, content });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = await params;
  await connect();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
