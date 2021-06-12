import Link from 'next/link';

import classes from './Sidebar.module.scss';

import NavItem from './NavItem';

function Sidebar({ categories }) {
  return (
    <>
      <aside className={classes.Sidebar}>
        <div className={classes.Header}>Experiments</div>
        <div className={classes.Divider} />
        <nav>
          <ul className={classes.Nav}>
            {categories.map((category) => (
              <NavItem
                key={category.title + '-' + category.uri}
                href={'/category/' + category.uri}
                text={category.title}
                isActive={category.title === 'CSS'}
              />
            ))}
          </ul>
        </nav>
      </aside>
      <div className={classes.SidebarShadow} />
    </>
  );
}

export default Sidebar;
