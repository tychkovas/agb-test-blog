import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";

import { useMutation, ApolloError } from '@apollo/client';
import { M_SIGN_IN, Q_ME } from "../apollo/Operations";
interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Login: React.FC<Props> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [signIn, { loading: LoadingSignIn, error }] = useMutation(M_SIGN_IN, {
    onCompleted: (data) => {
      console.log(`signIn: onComplet, ${JSON.stringify(data)}`);
      setLoading(false);
      const { token } = data?.signIn
      console.log('signIn: token: ', token);
      if (token) {
         login(token).then(
          () => {
            history.push("/profile");
            window.location.reload();
          },
          (error) => {
            console.log(`signIn:login Error, ${JSON.stringify(error)}` );

            const resMessage =(error && error.message) 
              || error.message || error.toString();
            console.log('resMessage: ', resMessage);
    
            setLoading(false);
            setMessage(resMessage);
          }
         );
        //  localStorage.setItem('token', token);
      }
    },
    onError: (error: ApolloError) => {
      console.log(`signIn: onError, ${JSON.stringify(error)}` );

        const resMessage =(error &&
          error.message) ||
          error.message ||
          error.toString();
          console.log('resMessage: ', resMessage);

          setLoading(false);
          setMessage(resMessage);
    },
  });

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    signIn({
      variables: { nickname: username, password }
    });

    setMessage("");
    setLoading(LoadingSignIn);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container" style={{width: '18rem'}} >
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
