import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import MobileMenu from '@site/src/components/mobile-menu';
import {navigation} from '@site/src/data/navigation';
import styles from './header.module.css';

const MOBILE_MENU_ID = 'mobile-menu';
/** Ignore tiny scroll movements so the header does not flicker. */
const SCROLL_TOLERANCE = 8;

/** Sticky menu bar that hides while scrolling down and reappears when scrolling up. */
export default function Header(): ReactNode {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuIcon = useBaseUrl('/img/portfolio/icons/menu.svg');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < SCROLL_TOLERANCE) return;
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setScrolledDown(scrollY > lastScrollY && scrollY > headerHeight);
      lastScrollY = scrollY;
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback((): void => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header ref={headerRef} className={clsx(styles.header, scrolledDown && !menuOpen && styles.hidden)}>
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen(true)}>
            <img src={menuIcon} alt="" width={32} height={32} />
          </button>
        </nav>
      </header>
      <MobileMenu
        id={MOBILE_MENU_ID}
        open={menuOpen}
        items={navigation}
        onClose={closeMenu}
        onNavigate={() => setMenuOpen(false)}
      />
    </>
  );
}
