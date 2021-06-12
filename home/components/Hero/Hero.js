import classes from './Hero.module.scss';

function Hero() {
  return (
    <div className={classes.Hero}>
      <img src='/hero-tech.png' alt='The logos of HTML5 CSS3 and Javascript.' draggable="false" />
    </div>
  );
}

export default Hero;
