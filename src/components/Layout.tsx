import Head from "next/head";

type Props = {
  children?: React.ReactNode;
  theme?: string;
  title?: string;
};

export const Layout: React.FC<Props> = ({
  children,
  theme = "dracula",
  title = "Dive Log",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Dive Log Early Alpha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-base-300 min-h-screen" data-theme={theme}>
        {children}
      </main>
    </>
  );
};
