// Libraries
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogIn } from '../../services/authService';
import Button from '../Button/index';
import styled from './Login.module.css';

function Login() {
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { email, password } = formData;


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      Swal.fire('', 'Invalid credentials', 'warning');
      return;
    }

    if (email !== '' && !regex.test(email)) {
      Swal.fire('', 'Invalid mail or password', 'warning');
      return;
    }

    LogIn({ email, password });
  };

  return (
    <>
      <h2 className={styled.loginTitle}>Login</h2>
      <section>
        <form className={styled.form} onSubmit={onSubmit}>
          <div className={styled.formInputs}>
            <div>
              <div className={styled.labels}>
                <label className={styled.label}>Email</label>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className={styled.inputs}
              />
            </div>
            <div>
              <div className={styled.labels}>
                <label className={styled.label}>Password</label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                autoComplete="true"
                className={styled.inputs}
              />
            </div>
          </div>

          <div className={styled.loginBtn}>
            <Button text={'LOGIN'} options={{ uppercase: true }} />
          </div>
          <div className={styled.loginFooter}>
            <span>
              New user?{' '}
              <Link className={styled.signupLink} to={'/signup'}>
                {' '}
                <b>Sign up</b>
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
