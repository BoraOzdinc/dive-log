import { GetServerSideProps, type NextPage } from "next";
import { Layout } from "~/components/Layout";

import Link from "next/link";
import { signIn, signOut, useSession, getSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Layout>{!!session ? <User /> : <Guest />}</Layout>
    </>
  );
};

const Guest: React.FC = () => {
  return (
    <>
      <main className="container mx-auto py-20 text-center">
        <h3>Guest Page</h3>
        <Link className="btn" href={"/auth/login"}>
          Giriş Yap
        </Link>
      </main>
    </>
  );
};

const User: React.FC = () => {
  const { data: session } = useSession();
  return (
    <>
      <main className="container mx-auto py-20 text-center">
        <h3>authorized user</h3>
        <h4>Hi {session?.user.name}</h4>
        <Link className="btn" href={"/user/profile"}>
          Profil
        </Link>
        <button
          className="btn-error btn"
          onClick={() => {
            void signOut();
          }}
        >
          Çıkış Yap
        </button>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: "auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
