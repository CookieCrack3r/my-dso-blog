import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import Button from '@site/src/components/button';
import TechTag from '@site/src/components/tech-tag';
import type {Project} from '@site/src/data/projects';
import styles from './project-card.module.css';

export interface ProjectCardProps {
  project: Project;
  /** Position in the project list, shown in the compact title ("1.Minecraft"). */
  number: number;
  /** featured: wide desktop card next to the project list, compact: stacked mobile card */
  variant: 'featured' | 'compact';
  id?: string;
}

export default function ProjectCard({project, number, variant, id}: ProjectCardProps): ReactNode {
  const image = useBaseUrl(project.image ?? '');
  const featured = variant === 'featured';

  return (
    <article id={id} className={clsx(styles.card, styles[variant])} aria-live={featured ? 'polite' : undefined}>
      <header className={styles.headline}>
        <h3 className={styles.title}>
          {featured ? `Project ${project.name}` : `${number}.${project.name}`}
          {project.nameSuffix && <span className={styles.titleSuffix}>{project.nameSuffix}</span>}
        </h3>
        <div className={styles.tags}>
          {project.technologies.map((technology) => (
            <TechTag key={technology} technology={technology} />
          ))}
        </div>
      </header>
      <div className={styles.body}>
        {project.image ? (
          <img src={image} alt={`Screenshot of ${project.name}`} className={styles.image} width={355} height={240} />
        ) : (
          <div className={clsx(styles.image, styles.imagePlaceholder)}>{project.name}</div>
        )}
        <div className={styles.details}>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.buttons}>
            <Button href={project.documentationUrl}>Documentation</Button>
            <Button href={project.githubUrl} variant="secondary">
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
