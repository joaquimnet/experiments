import slug from 'slugify';

import classes from '../components/Section/Details/SectionDetails.module.scss';

import Sidebar from '../components/Sidebar/Sidebar';
import Hero from '../components/Hero/Hero';
import SectionDetails from '../components/Section/Details/SectionDetails';
import ProjectList from '../components/Section/Projects/ProjectList';
import fetchProjectList from '../data/fetchProjectList';
import Button from '../components/Button/Button';

const Home = ({ projects, categories }) => (
  <>
    <Hero />
    <Sidebar categories={categories} />
    <main style={{ justifyContent: 'space-around' }} className={classes.Main}>
      <div style={{ width: '40%' }} className={classes.Details}>
        <h2>Welcome</h2>
        <p>
          This is the page I showcase my coding experiments. Most of it is web development but I
          have some other stuff here as well.
        </p>
      </div>
      <div style={{ width: '40%' }} className={classes.Details}>
        <p style={{marginBottom: '20px'}}>Feel free to reach out at:</p>
        <Button
          mode='link'
          color='alternative'
          target='_blank'
          href='https://github.com/joaquimnet'
          rel='noreferrer noopener'
        >
          Github
        </Button>
        <Button
          mode='link'
          color='alternative'
          target='_blank'
          href='https://twitter.com/joaquimnet_'
          rel='noreferrer noopener'
        >
          Twitter
        </Button>
        <Button
          mode='link'
          color='alternative'
          target='_blank'
          href='mailto:joaquimmy@gmail.com'
          rel='noreferrer noopener'
        >
          Email
        </Button>
        <Button
          mode='link'
          color='alternative'
          target='_blank'
          href='https://joaquimneto.dev/#/'
          rel='noreferrer noopener'
        >
          Blog
        </Button>
      </div>
    </main>
  </>
);

// export const getStaticProps = async () => {
//   const projects = await fetch(
//     'https://raw.githubusercontent.com/joaquimnet/experiments/master/projects.json',
//   )
//     .then((res) => res.json())
//     .catch(() => []);

//   return { props: { projects }, revalidate: 3600 };
// };

export async function getStaticProps() {
  const experiments = await fetchProjectList();

  const categories = Object.keys(experiments.categories).map((c) => ({
    title: c,
    uri: slug(c, { lower: true }),
    description: experiments.categories[c],
    tags: experiments.projects.reduce(
      (acc, cur) => (cur.category === c ? acc.concat(cur.tags) : acc),
      [],
    ),
  }));

  return {
    revalidate: 3600,
    props: {
      categories,
      projects: experiments.projects,
    },
  };
}

export default Home;
