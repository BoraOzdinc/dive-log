import type { NextPage } from "next";
import { Formik, Field, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Layout } from "~/components/Layout";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface Values {
  username: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Kullanıcı Adı Çok Kısa!")
    .max(50, "Kullanıcı Adı Çok Uzun!")
    .required("Kullanıcı Adı Alanı Boş!"),
  password: Yup.string()
    .min(3, "Şifre En Az 8 Karakter Olmalı!")
    .max(60, "Şifre Çok Uzun!")
    .required("Şifre Alanı Boş!"),
});

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
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values: Values) => {
          await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col  justify-center">
              <div className="mt-2 flex flex-col">
                <label htmlFor="username">Kullanıcı Adı</label>
                <Field
                  className={`input rounded p-3 ${
                    errors.username && touched.username
                      ? "input-error"
                      : "input-success"
                  }`}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Kullanıcı Adı"
                />
              </div>
              <div className="mt-2 flex flex-col">
                <label htmlFor="password">Şifre</label>
                <Field
                  className={`input rounded p-3 ${
                    errors.password && touched.password
                      ? "input-error"
                      : "input-success"
                  }`}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Şifre"
                />
              </div>

              <button className="btn mt-2" type="submit">
                Giriş Yap
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <button
        type="submit"
        onClick={() => {
          void signIn("google", { callbackUrl: "https://localhost:3000" });
        }}
        className="btn-info btn  mt-2"
      >
        Google ile giriş yap
      </button>
      <p className="mt-2 text-center">
        Hesabın yok mu?{" "}
        <Link className="text-blue-700" href={"/auth/register"}>
          Hemen oluştur
        </Link>
      </p>
    </>
  );
};

export default Login;
