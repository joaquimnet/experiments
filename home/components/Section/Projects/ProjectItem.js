import Image from 'next/image';
import classNames from 'classnames';

import classes from './Projects.module.scss';
import Button from '../../Button/Button';

function ProjectItem({ project }) {
  return (
    <article
      className={classNames(classes.ProjectItem, { [classes.Featured]: project.isFeatured })}
    >
      <div className={classes.ThumbnailContainer}>
        <Image
          src='/squares.png'
          alt={`A screenshot of the ${project.title} project page.`}
          className={classes.ProjectThumbnail}
          draggable='false'
          width={260}
          height={260}
        />
      </div>
      <div className={classes.ProjectDetails}>
        <div className={classes.ProjectText}>
          <h3 className={classes.ProjectTitle}>{project.title}</h3>
          <p className={classes.ProjectDescription}>{project.description}</p>
        </div>
        <div className={classes.ProjectButtons}>
          <Button
            size='medium'
            color='dark'
            mode='link'
            href={project.repositoryURL}
            target='_blank'
            rel='noreferrer noopener'
          >
            CODE
          </Button>
          <Button
            size='medium'
            color='dark'
            mode='link'
            href={project.demoURL}
            target='_blank'
            rel='noreferrer noopener'
          >
            SEE DEMO
          </Button>
          <span>📆{project.completedAt}</span>
        </div>
      </div>
    </article>
  );
}

export default ProjectItem;
