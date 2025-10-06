import * as React from 'react';
import { Link, PageProps } from 'gatsby';
import { Project } from '../types/Project';

interface ProjectsListContext {
    projects: Project[];
}

const ProjectsList: React.FC<PageProps<{}, ProjectsListContext>> = ({ pageContext }) => {
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
