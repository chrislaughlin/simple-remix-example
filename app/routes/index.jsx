import { Link, useLoaderData, useTransition, Form } from "@remix-run/react";

export async function loader({ request }) {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve([
        {
          title: "First Project",
          slug: "first-project"
        },
        {
          title: "Second Project",
          slug: "second-project"
        }
      ]);
    }, 2000);
  });
}

export async function action({ request }) {
  const form = await request.formData();
  console.log(`Creating new project:${form.get("title")}`);
  return null;
}

export default function Index() {
  const projects = useLoaderData();
  const { state } = useTransition();
  const busy = state === "submitting";

  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug} key={project.slug}>{project.title}</Link>
      ))}

      <Form method="post">
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>
    </div>
  );
}
