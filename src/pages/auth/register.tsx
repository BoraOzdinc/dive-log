import { Formik, Field, Form, type FormikHelpers } from "formik";
import { type NextPage } from "next";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import * as Yup from "yup";
import { useCreateUser } from "~/utils/useAuth";
import classNames from "classnames";
import { TypeOf, z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface Values {
  username: string;
  email: string;
  password: string;
}

const userSchema = z.object({
  username: z.string({ required_error: "Lütfen bir kullanıcı adı girin!" }),
  email: z.string().email("Geçerli bir E-Posta adresi girin!"),
  password: z
    .string({ required_error: "Lütfen şirenizi girin!" })
    .min(8)
    .max(150),
});

type userFormInputs = TypeOf<typeof userSchema>;

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
        validationSchema={toFormikValidationSchema(userSchema)}
        onSubmit={(values: Values) => {
          console.log(values);
          createUser.mutate({
            username: values.username,
            email: values.email,
            passwordHash: values.password,
          });
        }}
      >
        {(formikState) => {
          const errors = formikState.errors;
          return (
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
                      errors.email ? "input-error" : "input-success"
                    }`}
                  />
                  {!!errors.email && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.email}
                      </span>
                    </label>
                  )}
                </div>
                <div className="mt-3 flex flex-col ">
                  <label htmlFor="username">Kullanıcı Adı</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Kullanıcı Adı"
                    className={`input rounded p-3 ${
                      errors.username ? "input-error" : "input-success"
                    }`}
                  />
                  {!!errors.username && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.username}
                      </span>
                    </label>
                  )}
                </div>
                <div className="mt-3 flex flex-col">
                  <label htmlFor="password">Şifre</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Şifre"
                    className={`input rounded p-3 ${
                      errors.password ? "input-error" : "input-success"
                    }`}
                  />
                  {!!errors.password && (
                    <label className="label">
                      <span className="label-text text-error">
                        {errors.password}
                      </span>
                    </label>
                  )}
                </div>
                {createUser.isIdle ||
                createUser.isError ||
                createUser.isLoading ? (
                  <button
                    type="submit"
                    className={classNames(
                      ((errors.password || errors.email || errors.username) !==
                      undefined
                        ? "btn-disabled"
                        : "btn-succes") +
                        " btn mt-2 items-center justify-center",
                      createUser.isLoading && "btn-disabled loading"
                    )}
                  >
                    {createUser.isIdle && "Hesap Oluştur"}
                    {createUser.isError && "bu E-Posta kullanılıyor!"}
                    {createUser.isLoading && ""}
                  </button>
                ) : (
                  <Link className="btn-success btn" href={"/auth/login"}>
                    Hesap oluşturuldu. Giriş yapmak için tıklayın!
                  </Link>
                )}
                <p className="flex items-center justify-center ">
                  Zaten hesabın var mı?{"  "}
                  <Link className="text-blue-700" href={"/auth/login"}>
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Register;
