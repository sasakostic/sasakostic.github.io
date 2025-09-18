import { Projects } from '../types/Project';

export const projects: Projects = {
  'test-project-one': {
    id: 'test-project-one',
    name: '💬 Test Project • One',
    srcURL: { url: 'https://github.com/sasakostic/product-reviews-system' },
    demoURL: { url: 'https://github.com/sasakostic/product-reviews-system' },
    cover: { srcPath: 'projects/homemade-gpt-js/cover.jpg' },
    startDate: '2025-09-18',
    summary: [
      'Test project description',
    ],
    tags: [
      { name: 'TEST' },
      { name: 'Coding' },
    ],
    gitHubRepo: {
      owner: 'sasakostic',
      repo: 'product-reviews-system',
    },
    achievements: [],
  },
};
