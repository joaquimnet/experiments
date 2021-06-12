import slug from 'slugify';

import Sidebar from '../components/Sidebar/Sidebar';
import Hero from '../components/Hero/Hero';
import SectionDetails from '../components/Section/Details/SectionDetails';
import ProjectList from '../components/Section/Projects/ProjectList';

const Home = ({ projects, categories }) => (
  <>
    <Hero />
    <Sidebar categories={categories} />
    <main>
      <SectionDetails
        category={categories[0].title}
        description={categories[0].description}
        tags={categories[0].tags}
      />
      <ProjectList projects={projects} />
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

export function getStaticProps() {
  const experiments = {
    projects: [
      {
        title: 'Example',
        description:
          "This is the example project, it has examples of projects I've completed so far.",
        isFeatured: true,
        completedAt: new Date().toLocaleDateString(),
        startedAt: new Date().toLocaleDateString(),
        repositoryURL: 'https://github.com/joaquimnet/experiments',
        demoURL: 'https://joaquimneto.dev/#/',
        category: 'CSS',
        tags: ['layout', 'projects'],
      },
      {
        title: 'Framework Example',
        description:
          "This is the example project, it has examples of projects I've completed so far. This is the example project, it has examples of projects I've completed so far.",
        isFeatured: false,
        completedAt: new Date().toLocaleDateString(),
        startedAt: new Date().toLocaleDateString(),
        repositoryURL: 'https://github.com/joaquimnet/experiments',
        demoURL: 'https://joaquimneto.dev/#/',
        category: 'Frameworks',
        tags: ['react', 'vue'],
      },
      {
        title: 'Backend Example',
        description:
          "This is the example project, it has examples of projects I've completed so far.",
        isFeatured: false,
        completedAt: new Date().toLocaleDateString(),
        startedAt: new Date().toLocaleDateString(),
        repositoryURL: 'https://github.com/joaquimnet/experiments',
        demoURL: 'https://joaquimneto.dev/#/',
        category: 'Backend',
        tags: ['node', 'express'],
      },
    ],
    categories: {
      CSS: `Projects in this category are pages, snippets or sites I made to dive deep into the different aspects of CSS.\nThese might include layouts, animations, transitions and frontend components.`,
      Frameworks: `Projects in this category are pages, snippets or sites I made to dive deep into the different aspects of CSS.\nThese might include layouts, animations, transitions and frontend components.`,
      Backend: `Projects in this category are pages, snippets or sites I made to dive deep into the different aspects of CSS.\nThese might include layouts, animations, transitions and frontend components.`,
    },
  };

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
    revalidate: 1,
    props: {
      categories,
      projects: experiments.projects,
    },
  };
}

export default Home;
