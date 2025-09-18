// @flow
import { socialLinkTypes } from '../types/SocialLink';
import type { SocialLink } from '../types/SocialLink';

export const socialLinks: SocialLink[] = [
  {
    type: socialLinkTypes.linkedIn,
    url: 'https://www.linkedin.com/in/sashakostic/',
    secondary: false,
    caption: 'Sasa Kostic on LinkedIn',
  },
  {
    type: socialLinkTypes.gitHub,
    url: 'https://github.com/sasakostic',
    secondary: false,
    caption: 'Sasa Kostic on GitHub',
  },
];
