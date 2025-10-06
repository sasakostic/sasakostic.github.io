import * as React from 'react';
import { Link, PageProps } from 'gatsby';
import { Project } from '../types/Project';

interface ProjectsListContext {
  projects: Project[];
}

// koristimo Record<string, never> za props (prvi generic)
const ProjectsList = ({ pageContext }: PageProps<Record<string, never>, ProjectsListContext>) => {
  const { projects } = pageContext;

  return (
    <main className="projects-list">
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ProjectsList;
