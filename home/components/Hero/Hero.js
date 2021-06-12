import Image from 'next/image';

import classes from './Hero.module.scss';

function Hero() {
  return (
    <>
      <div className={classes.Hero}>
        <Image
          className={classes.HeroBackground}
          src='/experiments-hero.jpg'
          draggable='false'
          width={1920}
          height={1080}
        />
      </div>
      <div className={classes.Hero + ' ' + classes.Hero2}>
        <Image
          src='/hero-tech.png'
          alt='The logos of HTML5 CSS3 and Javascript.'
          draggable='false'
          width={626}
          height={329}
        />
      </div>
    </>
  );
}

export default Hero;
