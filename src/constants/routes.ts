type Slug = 'home' | 'projects' | 'blog' | 'project';

export type Route = {
  path: string;
  name: string;
};

type Routes = Record<Slug, Route>;

export const routes: Routes = {
  home: {
    path: '/',
    name: 'About',
  },
  projects: {
    path: '/projects',
    name: 'Projects',
  },
  blog: {
    path: '/blog',
    name: 'Blog',
  },
  project: {
    path: '/project',
    name: 'Project',
  },
};

export const TOP_NAV: Route[] = [
  routes.projects,
  routes.blog,
  // routes.description,
];

export const FOOTER_NAV: Route[] = [];
