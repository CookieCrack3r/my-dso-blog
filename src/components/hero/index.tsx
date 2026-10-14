import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Button from '@site/src/components/button';
import {profile} from '@site/src/data/profile';
import styles from './hero.module.css';

const SECTION_ID = 'about-me';

/** "About me" section with name, job title, short introduction and portrait. */
export default function Hero(): ReactNode {
  useBrokenLinks().collectAnchor(SECTION_ID);
  const portraitDesktop = useBaseUrl(profile.portrait.desktop);
  const portraitMobile = useBaseUrl(profile.portrait.mobile);

  return (
    <section id={SECTION_ID} className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.greeting}>{profile.greeting}</p>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.jobTitle}>{profile.jobTitle}</p>
        </div>
        <picture className={styles.portrait}>
          <source media="(max-width: 1023px)" srcSet={portraitMobile} />
          <img src={portraitDesktop} alt={profile.portrait.alt} width={442} height={479} />
        </picture>
        <p className={styles.about}>{profile.about}</p>
        <div className={styles.cta}>
          <Button href="/#contact" variant="light" compactOnMobile>
            Contact me
          </Button>
        </div>
      </div>
    </section>
  );
}
