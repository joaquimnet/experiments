import slug from 'slugify';
import { useRouter } from 'next/router';

import Sidebar from '../../components/Sidebar/Sidebar';
import Hero from '../../components/Hero/Hero';
import SectionDetails from '../../components/Section/Details/SectionDetails';
import ProjectList from '../../components/Section/Projects/ProjectList';
import fetchProjectList from '../../data/fetchProjectList';

function ProjectListing({ projects, categories }) {
  const { query } = useRouter();

  const currentCategory = categories.find(
    (c) => c.uri === slug(projects[0].category, { lower: true }),
  );

  return (
    <>
      <Hero />
      <Sidebar categories={categories} activeCategory={slug(query.category, { lower: true })} />
      <main>
        <SectionDetails
          category={currentCategory.title}
          description={currentCategory.description}
          tags={currentCategory.tags}
        />
        <ProjectList projects={projects} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const experiments = await fetchProjectList();
  return {
    fallback: false,
    paths: Object.keys(experiments.categories).map((category) => ({
      params: { category: slug(category, { lower: true }) },
    })),
  };
}

export async function getStaticProps(context) {
  const experiments = await fetchProjectList();

  const category = context.params.category;

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
      projects: experiments.projects.filter(
        (project) => slug(project.category, { lower: true }) === category,
      ),
    },
  };
}

export default ProjectListing;
