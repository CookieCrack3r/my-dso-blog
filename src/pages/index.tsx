import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Contact from '@site/src/components/contact';
import Footer from '@site/src/components/footer';
import Header from '@site/src/components/header';
import Hero from '@site/src/components/hero';
import MyProjectHighlights from '@site/src/components/my-project-highlights';
import MySkills from '@site/src/components/my-skills';
import {profile} from '@site/src/data/profile';
import styles from './index.module.css';

/** Portfolio start page. The Docusaurus navbar is hidden here (see src/theme/Navbar), the header replaces it. */
export default function Home(): ReactNode {
  return (
    <Layout
      title="Portfolio"
      description={`Portfolio of ${profile.name}, ${profile.jobTitle}`}
      wrapperClassName={styles.portfolio}
      noFooter>
      <Header />
      <main>
        <Hero />
        <MySkills />
        <MyProjectHighlights />
        <Contact />
      </main>
      <Footer />
    </Layout>
  );
}
