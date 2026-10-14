import {useRef, useState, type ReactNode} from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import type {Skill} from '@site/src/data/skills';
import styles from './skill-carousel.module.css';

export interface SkillCarouselProps {
  skills: Skill[];
  skillsPerPage: number;
  className?: string;
}

function toPages(skills: Skill[], size: number): Skill[][] {
  const pages: Skill[][] = [];
  for (let i = 0; i < skills.length; i += size) pages.push(skills.slice(i, i + size));
  return pages;
}

/** Mobile skill carousel: horizontally swipeable cards with scroll snapping and page dots. */
export default function SkillCarousel({skills, skillsPerPage, className}: SkillCarouselProps): ReactNode {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const {withBaseUrl} = useBaseUrlUtils();
  const pages = toPages(skills, skillsPerPage);

  /** Scroll positions at which each page snaps into place. */
  const snapPositions = (track: HTMLDivElement): number[] => {
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft);
    return Array.from(track.children, (page) => (page as HTMLElement).offsetLeft - paddingLeft);
  };

  const handleScroll = (): void => {
    const track = trackRef.current;
    if (!track) return;
    const distances = snapPositions(track).map((position) => Math.abs(position - track.scrollLeft));
    setActivePage(distances.indexOf(Math.min(...distances)));
  };

  const showPage = (index: number): void => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({left: snapPositions(track)[index]});
  };

  return (
    <div className={clsx(styles.carousel, className)}>
      <div ref={trackRef} className={styles.track} onScroll={handleScroll}>
        {pages.map((page, pageIndex) => (
          <ul key={pageIndex} className={styles.page} aria-label={`Skills ${pageIndex + 1} of ${pages.length}`}>
            {page.map((skill) => (
              <li key={skill.name} className={styles.skill}>
                <div className={styles.skillName}>
                  <img
                    src={withBaseUrl(skill.icon)}
                    alt=""
                    width={skill.iconWidth}
                    height={skill.iconHeight}
                    className={styles.icon}
                  />
                  <span className={styles.label}>{skill.shortName}</span>
                </div>
                <ul className={styles.highlights}>
                  {skill.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={styles.dots}>
        {pages.map((_, index) => (
          <button
            key={index}
            type="button"
            className={clsx(styles.dot, index === activePage && styles.activeDot)}
            aria-label={`Show skills ${index + 1} of ${pages.length}`}
            aria-current={index === activePage}
            onClick={() => showPage(index)}
          />
        ))}
      </div>
    </div>
  );
}
