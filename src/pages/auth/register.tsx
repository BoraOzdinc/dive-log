import { Formik, Field, Form, type FormikHelpers } from "formik";
import { type NextPage } from "next";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import * as Yup from "yup";
import { useCreateUser } from "~/utils/useAuth";

interface Values {
  username: string;
  email: string;
  password: string;
}
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Kullanıcı Adı Çok Kısa!")
    .max(50, "Kullanıcı Adı Çok Uzun!")
    .required("Kullanıcı Adı Alanı Boş!"),
  password: Yup.string()
    .min(8, "Şifre En Az 8 Karakter Olmalı!")
    .max(60, "Şifre Çok Uzun!")
    .required("Şifre Alanı Boş!"),
  email: Yup.string().email("Geçersiz E-Posta!").required("E-Posta Alanı Boş!"),
});
const Register: NextPage = () => {
  return (
    <>
      <Layout>
        <RegisterComponent />
      </Layout>
    </>
  );
};

const RegisterComponent: React.FC = () => {
  const createUser = useCreateUser();

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values) => {
          console.log(values);
          createUser.mutate({
            username: values.username,
            email: values.email,
            passwordHash: values.password,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex h-screen flex-col items-center justify-center">
              <div className="mt-3 flex flex-col ">
                <label htmlFor="email">E-Posta</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-Posta Adresi"
                  className={`input rounded p-3 ${
                    errors.email && touched.email
                      ? "input-error"
                      : "input-success"
                  }`}
                />
              </div>
              <div className="mt-3 flex flex-col ">
                <label htmlFor="username">Kullanıcı Adı</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Kullanıcı Adı"
                  className={`input rounded p-3 ${
                    errors.username && touched.username
                      ? "input-error"
                      : "input-success"
                  }`}
                />
              </div>
              <div className="mt-3 flex flex-col">
                <label htmlFor="password">Şifre</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Şifre"
                  className={`input rounded p-3 ${
                    errors.password && touched.password
                      ? "input-error"
                      : "input-success"
                  }`}
                />
                {errors.password && touched.password ? (
                  <div className="text-error">
                    <p>{errors.password}</p>
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className={
                  ((errors.password || errors.email || errors.username) !==
                  undefined
                    ? "btn-disabled"
                    : "btn-succes") + " btn mt-2 items-center justify-center"
                }
              >
                Yeni Hesap Oluştur
              </button>
              <p className="flex items-center justify-center ">
                Zaten hesabın var mı?{" "}
                <Link className="text-blue-700" href={"/auth/login"}>
                  Giriş Yap
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
