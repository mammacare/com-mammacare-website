import { getProjects } from "../sanity/sanity-utils";

export default function IndexPage({ projects }) {
  return (
    <>
      <header>
        <h1>MammaCare Corporation</h1>
      </header>
      <main>
        <h2>projects</h2>
        {projects.length > 0 && (
          <ul>
            {projects.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!projects.length > 0 && <p>No projects to show</p>}
        {projects.length > 0 && (
          <div>
            <pre>{JSON.stringify(projects, null, 2)}</pre>
          </div>
        )}
        {!projects.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

// export async function getStaticPaths() {}

export async function getStaticProps() {
  const projects = await getProjects();
  //const projects = [];
  return {
    props: {
      projects,
    },
  };
}
