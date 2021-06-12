import classNames from 'classnames';

import classes from './Button.module.scss';
import './Button.module.scss';

function Button({ mode = 'button', color = 'dark', size = 'small', children, ...otherProps }) {
  const Component = mode === 'link' ? 'a' : 'button';

  return (
    <Component
      className={classNames(classes.Button, {
        [classes.Dark]: color === 'dark',
        [classes.Light]: color === 'light',
        [classes.Small]: size === 'small',
        [classes.Medium]: size === 'medium',
        [classes.Large]: size === 'large',
      })}
      {...otherProps}
    >
      {children}
    </Component>
  );
}

export default Button;
