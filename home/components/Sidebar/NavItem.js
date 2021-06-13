import Link from 'next/link';
import classnames from 'classnames';

import classes from './NavItem.module.scss';

function NavItem({ href, text, isActive }) {
  return (
    <li className={classnames(classes.Link, { [classes.LinkActive]: isActive })}>
      <Link scroll={false} href={href}>
        {text}
      </Link>
    </li>
  );
}

export default NavItem;
