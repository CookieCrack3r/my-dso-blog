import type {ReactNode} from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import SkillCard from '@site/src/components/skill-card';
import SkillCarousel from '@site/src/components/skill-carousel';
import {skills, SKILLS_PER_CAROUSEL_PAGE} from '@site/src/data/skills';
import styles from './my-skills.module.css';

const SECTION_ID = 'my-skills';

/** Skill grid on desktop, swipeable carousel with details on mobile. */
export default function MySkills(): ReactNode {
  useBrokenLinks().collectAnchor(SECTION_ID);

  return (
    <section id={SECTION_ID} className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.headline}>My skills</h2>
        <ul className={styles.grid}>
          {skills.map((skill) => (
            <li key={skill.name}>
              <SkillCard skill={skill} />
            </li>
          ))}
        </ul>
      </div>
      <SkillCarousel skills={skills} skillsPerPage={SKILLS_PER_CAROUSEL_PAGE} className={styles.carousel} />
    </section>
  );
}
