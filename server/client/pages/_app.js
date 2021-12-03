import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../src/dashboard/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ASIAN COVID-19 MONITOR</title>
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
