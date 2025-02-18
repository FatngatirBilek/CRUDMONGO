import connect from "@/lib/databaseconnect";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, content } = await request.json();
  await connect();
  await Topic.create({ title, description, content });
  return NextResponse.json(
    { message: "Topic created successfully" },
    { status: 201 },
  );
}

export async function GET() {
  await connect();
  const topics = await Topic.find();
  return NextResponse.json(topics);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Topic deleted successfully" },
    { status: 200 },
  );
}
