import classNames from 'classnames';
import { useState } from 'react';

import classes from './SectionDetails.module.scss';

function SectionDetails({ category, description, tags, setActiveTags } = {}) {
  const [selectedTags, setSelectedTags] = useState([...tags]);

  const toggleTag = (tag) => (e) => {
    if (selectedTags.some((t) => t === tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className={classes.Main}>
      <section className={classes.Details}>
        <h2>{category}</h2>
        <p>{description}</p>
      </section>
      <aside className={classes.Filters}>
        <div>
          <span className={classes.Title}>Filters</span>
        </div>
        <div className={classes.Tags}>
          {tags?.map((tag) => (
            <span
              className={classNames({ [classes.Active]: selectedTags.some((t) => t === tag) })}
              key={tag}
              onClick={toggleTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default SectionDetails;
