import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/databaseconnect";
import Topic from "@/models/topic";

interface Params {
  id: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = params;
  const {
    newTitle: title,
    newDescription: description,
    newContent: content,
  } = await request.json();
  await connect();
  await Topic.findByIdAndUpdate(id, { title, description, content });
  return NextResponse.json(
    { message: "Topic updated successfully" },
    { status: 200 },
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = params;
  await connect();
  const topic = await Topic.findOne({ _id: id });
  if (!topic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }
  return NextResponse.json({ topic }, { status: 200 });
}
