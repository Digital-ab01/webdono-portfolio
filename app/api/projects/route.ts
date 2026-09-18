import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { readProjects, writeProjects, uniqueSlug, validateProjectInput } from "@/lib/projects-store";

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { errors, value } = validateProjectInput(body);
  if (!value) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const projects = await readProjects();
  const slug = uniqueSlug(value.name, projects);
  const project = { slug, ...value };

  projects.unshift(project);
  await writeProjects(projects);

  return NextResponse.json(project, { status: 201 });
}
