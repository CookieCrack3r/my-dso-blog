import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {technologies, type TechnologyId} from '@site/src/data/technologies';
import styles from './tech-tag.module.css';

export interface TechTagProps {
  technology: TechnologyId;
}

/** White pill with icon and name of a technology used in a project. */
export default function TechTag({technology}: TechTagProps): ReactNode {
  const {label, icon, iconWidth} = technologies[technology];
  const iconUrl = useBaseUrl(icon);

  return (
    <span className={styles.tag}>
      <img src={iconUrl} alt="" width={iconWidth} height={32} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
