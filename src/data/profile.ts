/** Personal data shown in the hero, contact and footer sections. */
export interface Profile {
  name: string;
  greeting: string;
  jobTitle: string;
  /** "\n" starts a new line on desktop; on mobile the text flows as one paragraph. */
  about: string;
  /** Image paths relative to /static. The mobile image has a wider crop. */
  portrait: {
    desktop: string;
    mobile: string;
    alt: string;
  };
  email: string;
  linkedInUrl: string;
  githubUrl: string;
  contact: {
    headline: string;
    tagline: string;
    intro: string;
    bullets: string[];
  };
  moreProjectsText: string;
  legalNoticePath: string;
}

export const profile: Profile = {
  name: 'Felix Wallke',
  greeting: 'Hey there. 👋 I am',
  jobTitle: 'DevSecOps Engineer',
  about: [
    'Write some information about yourself that is IT related.',
    'For example:',
    'Why are you passionate about coding? Do you have a deep interest in games? What is your source of inspiration for improving your programming skills? Are you constantly learning and keeping up to date?',
  ].join('\n'),
  portrait: {
    desktop: '/img/portfolio/hero/portrait.webp',
    mobile: '/img/portfolio/hero/portrait-mobile.webp',
    alt: 'Portrait of Felix Wallke',
  },
  email: 'felix.wallke@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/',
  githubUrl: 'https://github.com/CookieCrack3r?tab=repositories',
  contact: {
    headline: 'Contact me',
    tagline: 'Looking forward to hearing from you!',
    intro: 'Include the Information like:',
    bullets: [
      'Feel free to reach out with job offers or opportunities like...',
      'What role are you looking for?',
      'How you will contribute to the new team.',
      'Are you open for remote work or even relocate?',
    ],
  },
  moreProjectsText:
    'Write some information about your other projects. What other projects have you been working on so far?',
  legalNoticePath: '/legal-notice',
};
