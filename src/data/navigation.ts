export interface NavigationItem {
  label: string;
  /** Section anchor on the start page, e.g. "/#my-skills". */
  href: string;
}

export const navigation: NavigationItem[] = [
  {label: 'About me', href: '/#about-me'},
  {label: 'My skills', href: '/#my-skills'},
  {label: 'My projects', href: '/#my-projects'},
  {label: 'Contact', href: '/#contact'},
];
