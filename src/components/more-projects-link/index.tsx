import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './more-projects-link.module.css';

export interface MoreProjectsLinkProps {
  href: string;
  className?: string;
}

/** "↳ see more projects" link below the project list. */
export default function MoreProjectsLink({href, className}: MoreProjectsLinkProps): ReactNode {
  const arrow = useBaseUrl('/img/portfolio/icons/arrow-return.svg');

  return (
    <Link to={href} className={clsx(styles.link, className)}>
      <img src={arrow} alt="" width={20} height={19} className={styles.arrow} />
      <span className={styles.label}>see more projects</span>
    </Link>
  );
}
