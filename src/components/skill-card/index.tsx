import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {Skill} from '@site/src/data/skills';
import styles from './skill-card.module.css';

export interface SkillCardProps {
  skill: Skill;
}

/** Desktop skill tile: icon with label. */
export default function SkillCard({skill}: SkillCardProps): ReactNode {
  const icon = useBaseUrl(skill.icon);

  return (
    <div className={styles.card}>
      <img src={icon} alt="" width={skill.iconWidth} height={skill.iconHeight} className={styles.icon} />
      <span className={styles.label}>{skill.name}</span>
    </div>
  );
}
