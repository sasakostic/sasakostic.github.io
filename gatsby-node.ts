// gatsby-node.ts
import { createFilePath } from 'gatsby-source-filesystem';
import { CreateNodeArgs, CreatePagesArgs, GatsbyNode } from 'gatsby';
import * as path from 'path';
import { routes } from './src/constants/routes';
import { projectMapToArray } from './src/utils/project';
import { projects } from './src/data/projects';
import { Project } from './src/types/Project';

type CreatePostPagesQuery = {
  data?: {
    allMdx?: {
      nodes?: {
        fields?: {
          slug: string;
        };
        internal: {
          contentFilePath: string;
        };
        parent: {
          sourceInstanceName: string;
        };
      }[];
    };
  };
};

// 1️⃣ Dodavanje slug-a za MDX node-ove
export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent as string);
    let basePath = '';

    if (!parent || !('sourceInstanceName' in parent)) return;

    if (parent.sourceInstanceName === 'posts') {
      basePath = routes.blog.path; // "/blog"
    } else if (parent.sourceInstanceName === 'project') {
      basePath = routes.project.path; // "/project"
    }

    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: basePath + slug,
    });
  }
};

// 2️⃣ Kreiranje blog i project stranica
async function createPostPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;

  const result: CreatePostPagesQuery = await graphql(`
    query CreatePostPagesQuery {
      allMdx {
        nodes {
          fields {
            slug
          }
          internal {
            contentFilePath
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  `);

  (result?.data?.allMdx?.nodes || []).forEach((node) => {
    if (!node.fields?.slug) return;

    const slug = node.fields.slug;

    // /blog/:slug ili /project/:slug
    createPage({
      path: slug,
      component: `${path.resolve('./src/templates/Post.tsx')}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug,
        fromProjectRoute: node.parent.sourceInstanceName === 'project',
      },
    });
  });
}

// 3️⃣ Kreiranje projekata
async function createProjectPages({ actions }: CreatePagesArgs) {
  const { createPage } = actions;

  projectMapToArray(projects).forEach((project: Project) => {
    createPage({
      path: `${routes.projects.path}/${project.id}`,
      component: path.resolve('./src/templates/Project.tsx'),
      context: {
        projectID: project.id,
      },
    });
  });

  // napravi /projects/ index stranicu
  createPage({
    path: routes.projects.path, // "/projects"
    component: path.resolve('./src/templates/ProjectsList.tsx'),
    context: {
      projects: projectMapToArray(projects),
    },
  });
}

// 4️⃣ Glavna funkcija createPages
export const createPages: GatsbyNode['createPages'] = async (args: CreatePagesArgs) => {
  await createPostPages(args);
  await createProjectPages(args);
};

// 5️⃣ Schema customization da fields.slug uvek postoji
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Mdx implements Node {
      fields: MdxFields
    }
    type MdxFields {
      slug: String
    }
  `);
};
