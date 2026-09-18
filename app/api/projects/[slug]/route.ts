import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { readProjects, writeProjects, uniqueSlug, validateProjectInput } from "@/lib/projects-store";

type Params = { params: Promise<{ slug: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await params;

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
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const nextSlug = value.name === projects[index].name ? slug : uniqueSlug(value.name, projects, slug);
  const updated = { slug: nextSlug, ...value };
  projects[index] = updated;

  await writeProjects(projects);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { slug } = await params;

  const projects = await readProjects();
  const next = projects.filter((p) => p.slug !== slug);
  if (next.length === projects.length) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  await writeProjects(next);
  return NextResponse.json({ ok: true });
}
