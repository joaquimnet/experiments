import classes from './Projects.module.scss';
import ProjectItem from './ProjectItem';

function ProjectList({ projects }) {
  return (
    <section className={classes.ProjectList}>
      {projects.map((project, i) => (
        <ProjectItem key={'project-' + i} project={project} />
      ))}
    </section>
  );
}

export default ProjectList;
