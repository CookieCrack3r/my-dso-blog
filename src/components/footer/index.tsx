import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {profile} from '@site/src/data/profile';
import styles from './footer.module.css';

/** Scroll-to-top button, copyright and legal notice link. */
export default function Footer(): ReactNode {
  const arrowDesktop = useBaseUrl('/img/portfolio/icons/scroll-arrow.svg');
  const arrowMobile = useBaseUrl('/img/portfolio/icons/scroll-arrow-mobile.svg');

  const scrollToTop = (): void => {
    window.scrollTo({top: 0});
  };

  return (
    <footer className={styles.footer}>
      <button type="button" className={styles.scrollTop} aria-label="Scroll to top" onClick={scrollToTop}>
        <picture className={styles.arrow}>
          <source media="(max-width: 1023px)" srcSet={arrowMobile} />
          <img src={arrowDesktop} alt="" width={51} height={11.547} />
        </picture>
      </button>
      <div className={styles.legal}>
        <p className={styles.copyright}>
          © {profile.name} {new Date().getFullYear()}
        </p>
        <Link to={profile.legalNoticePath} className={styles.legalNotice}>
          Legal notice
        </Link>
      </div>
    </footer>
  );
}
