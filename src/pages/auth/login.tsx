import type { GetServerSideProps, NextPage } from "next";
import { Formik, Field, Form, type FormikHelpers } from "formik";

import { Layout } from "~/components/Layout";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { TypeOf, z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";

interface Values {
  email: string;
  password: string;
}

const userSchema = z.object({
  email: z
    .string({ required_error: "Lütfen E-Posta giriniz!" })
    .email("Geçerli bir E-Posta adresi girin!"),
  password: z
    .string({ required_error: "Lütfen şifrenizi girin!" })
    .min(8, "Şifre en az 8 karekter olmalı!")
    .max(150, "Şifre çok uzun"),
});

type userFormInputs = TypeOf<typeof userSchema>;

const Login: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex h-screen flex-col items-center justify-center">
          <LoginComponent />
        </div>
      </Layout>
    </>
  );
};

const LoginComponent: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [err, setErr] = useState("");
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={toFormikValidationSchema(userSchema)}
        onSubmit={async (values: Values) => {
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/auth/login",
          }).then(({ ok, error }) => {
            if (ok) {
              router.reload();
            } else {
              console.log(error);
              setErr("E-Posta veya Şifre yanlış!");
            }
          });
        }}
      >
        {(formikState) => {
          const errors = formikState.errors;
          return (
            <Form>
              <div className="flex flex-col  justify-center">
                <div className="mt-2 flex flex-col">
                  <span>{err}</span>
                  <label htmlFor="email">E-Posta</label>
                  <Field
                    className={`input rounded p-3 ${
                      errors.email ? "input-error" : "input-success"
                    }`}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="E-Posta"
                  />
                  {!!errors.email && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.email}
                      </span>
                    </label>
                  )}
                </div>
                <div className="mt-2 flex flex-col">
                  <label htmlFor="password">Şifre</label>
                  <Field
                    className={`input rounded p-3 ${
                      errors.password ? "input-error" : "input-success"
                    }`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Şifre"
                    autoComplete="true"
                  />
                  {!!errors.password && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.password}
                      </span>
                    </label>
                  )}
                </div>

                <button
                  className={classNames(
                    "btn mt-2",
                    errors.password && "btn-disabled",
                    errors.email && "btn-disabled"
                  )}
                  type="submit"
                >
                  Giriş Yap
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <p className="mt-2 text-center">
        Hesabın yok mu?{" "}
        <Link className="text-blue-700" href={"/auth/register"}>
          Hemen oluştur
        </Link>
      </p>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default Login;
