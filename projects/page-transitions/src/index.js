import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    const timeline = new TimelineLite();
    timeline
      // Fade out previous page
      .fromTo(
        from,
        0.4,
        { opacity: 1, transform: 'skewX(0deg)', filter: 'blur(0deg)' },
        { opacity: 0, transform: 'skewX(15deg)', filter: 'blur(5deg)' },
      )
      // Move new page
      .fromTo(to, 0.4, { left: '-100%', top: '80%' }, { left: '0%' })
      // Expand new page
      .fromTo(
        to,
        0.4,
        { height: '2vh' },
        {
          height: '100%',
          top: '0%',
          onComplete: () => {
            from.remove();
            done();
          },
        },
      );
  }

  out({ from, done }) {
    done();
  }
}

const highway = new Highway.Core({
  transitions: {
    default: Fade,
  },
});
