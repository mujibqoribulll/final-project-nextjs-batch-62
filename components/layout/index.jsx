import Head from "next/head";

const Layout = (props) => {
  const { children, metaTitle, metaDescription } = props;
  return (
    <div className="">
      <Head>
        <title>Todos App: {metaTitle || "Notes"}</title>
        <meta
          name="description"
          content={
            metaDescription ||
            "Plan, organize, and conquer your day with ease. Let's get started!"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-4">
      {children}
      </div>
    </div>
  );
};

export default Layout;
