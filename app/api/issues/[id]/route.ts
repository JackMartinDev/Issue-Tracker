import { patchIssueSchema } from "@/app/valiationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

interface Params {
  params: { id: string };
}

export const PATCH = async (request: NextRequest, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const { assignedUserId, title, description } = body;

  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedUserId },
  });

  return NextResponse.json(updatedIssue);
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({});
};
