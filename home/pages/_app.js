import Head from 'next/head';

import '../styles/styles.scss';

const ExperimentsApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Experiments</title>
        <meta name="description" content="Browse through a list of my completed projects. This is where I showcase my coding experiments. Most of it is web development but I have some other stuff here as well."/>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default ExperimentsApp;
