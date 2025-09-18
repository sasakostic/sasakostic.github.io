import { Profile } from '../types/Profile';
import { socialLinks } from './socialLinks';

export const profile: Profile = {
  firstName: 'Sasa',
  lastName: 'Kostic',
  position: 'Software Developer',
  summary: [
    'First line of description',
    '2nd line',
  ],
  avatar: {
    // srcPath: 'profile/avatar_500x500.jpg',
    srcPath: 'profile/profile.jpeg',
    caption: 'Sasa Kostic',
  },
  // location: {
  //   name: 'San Francisco Bay Area • (from Ukraine)',
  // },
  tags: [],
  socialLinks,
};
