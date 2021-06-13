let cache;

export default async function getProjectList() {
  if (cache) {
    return cache;
  }
  return {
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
}
