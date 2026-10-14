import type {ReactNode} from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = WrapperProps<typeof NavbarType>;

const withoutTrailingSlash = (path: string): string => path.replace(/\/$/, '');

/**
 * Wraps the Docusaurus navbar and hides it on the portfolio start page,
 * which renders its own header (src/components/header). All other pages keep the navbar.
 */
export default function NavbarWrapper(props: Props): ReactNode {
  const {pathname} = useLocation();
  const startPage = useBaseUrl('/');

  if (withoutTrailingSlash(pathname) === withoutTrailingSlash(startPage)) return null;
  return <Navbar {...props} />;
}
