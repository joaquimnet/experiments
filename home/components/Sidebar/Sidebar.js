import Link from 'next/link';

import classes from './Sidebar.module.scss';

import NavItem from './NavItem';

function Sidebar({ categories, activeCategory }) {
  return (
    <>
      <aside className={classes.Sidebar}>
        <div className={classes.Header}>
          <Link scroll={false} href='/'>Experiments</Link>
        </div>
        <div className={classes.Divider} />
        <nav>
          <ul className={classes.Nav}>
            {categories.map((category) => (
              <NavItem
                key={category.title + '-' + category.uri}
                href={'/category/' + category.uri}
                text={category.title}
                isActive={category.uri === activeCategory}
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
