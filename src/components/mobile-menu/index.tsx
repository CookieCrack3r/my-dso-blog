import {useEffect, useRef, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {NavigationItem} from '@site/src/data/navigation';
import styles from './mobile-menu.module.css';

export interface MobileMenuProps {
  id: string;
  open: boolean;
  items: NavigationItem[];
  /** Close button, Escape key or click outside the panel. */
  onClose: () => void;
  /** A navigation link was followed. */
  onNavigate: () => void;
}

/** White dropdown panel with the navigation links, opened from the burger button on small screens. */
export default function MobileMenu({id, open, items, onClose, onNavigate}: MobileMenuProps): ReactNode {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeIcon = useBaseUrl('/img/portfolio/icons/close.svg');

  useEffect(() => {
    if (!open) return undefined;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <nav id={id} className={styles.panel} aria-label="Mobile navigation">
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          aria-label="Close menu"
          onClick={onClose}>
          <img src={closeIcon} alt="" width={35} height={32} />
        </button>
        <ul className={styles.links}>
          {items.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className={styles.link} onClick={onNavigate}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
