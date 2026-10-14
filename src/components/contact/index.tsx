import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {profile} from '@site/src/data/profile';
import styles from './contact.module.css';

const SECTION_ID = 'contact';

/** Contact section with e-mail address and LinkedIn profile. */
export default function Contact(): ReactNode {
  useBrokenLinks().collectAnchor(SECTION_ID);
  const mailIcon = useBaseUrl('/img/portfolio/icons/mail.svg');
  const linkedInIcon = useBaseUrl('/img/portfolio/icons/linkedin.svg');
  const {contact} = profile;

  return (
    <section id={SECTION_ID} className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.headline}>{contact.headline}</h2>
        <p className={styles.tagline}>{contact.tagline}</p>
        <div className={styles.text}>
          <p>{contact.intro}</p>
          <ul>
            {contact.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <ul className={styles.channels}>
          <li>
            <a href={`mailto:${profile.email}`} className={styles.channel}>
              <img src={mailIcon} alt="" width={32} height={32} />
              <span className={styles.email}>{profile.email}</span>
            </a>
          </li>
          <li>
            <a href={profile.linkedInUrl} className={styles.channel} target="_blank" rel="noopener noreferrer">
              <img src={linkedInIcon} alt="" width={32} height={32} />
              <span className={styles.profileLink}>
                Profile Page<span className={styles.visuallyHidden}> on LinkedIn</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
