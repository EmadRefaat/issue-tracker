import authOption from "@/app/auth/authOption";
import { ValidationSchema } from "@/app/ValidationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) {
    return NextResponse.json({}, { status: 404 });
  }

  const body = await request.json();
  const validation = ValidationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error, status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found", status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOption);
  if (!session) {
    return NextResponse.json({}, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found", status: 404 });
  }

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(
    { message: "Issue deleted successfully" },
    { status: 200 }
  );
}
