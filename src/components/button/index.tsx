import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'light';

export interface ButtonProps {
  href: string;
  children: ReactNode;
  /** primary: blue fill, secondary: white outline, light: white fill with blue text */
  variant?: ButtonVariant;
  /** Uses the smaller 16px label of the mobile design below the desktop breakpoint. */
  compactOnMobile?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  compactOnMobile = false,
  className,
}: ButtonProps): ReactNode {
  return (
    <Link
      to={href}
      className={clsx(styles.button, styles[variant], compactOnMobile && styles.compactOnMobile, className)}>
      {children}
    </Link>
  );
}
