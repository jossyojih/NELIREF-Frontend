import styled from 'styled-components'

const Wrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 1rem auto;

  .register-login-container {
    width: 60%;
    height: 580px;
    display: grid;
    justify-content: center;
    background-color: #fff;
    overflow: hidden;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
    border-radius: 5px;
  }
  .register-login-container.new-password {
    width: 75%;
    height: 400px;
  }

  .new-pword-label {
    margin: 1rem auto;
  }

  h5 {
    color: #2a4d93;
    font-weight: 600;
  }

  h2 {
    font-weight: 600;
    font-family: 28px;
    color: #2a4d93;
    border-bottom: 1.2px solid #b7b4b4;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.5rem;
  }

  .logo {
    width: 20%;
  }
  .reg-input {
    margin: 0.5rem 0;
  }
  label {
    font-size: 16px;
    color: #2a4d93;
    font-weight: 500;
  }

  input {
    font-size: 14px;
    padding: 0.5rem;
    display: block;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #b7b4b4;
  }

  select {
    font-size: 14px;
    padding: 0.5rem;
    display: block;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #b7b4b4;
  }

  select:focus {
    outline-color: #2a4d93;
  }

  input:focus {
    outline-color: #2a4d93;
  }

  input:hover {
    border: 1.5px solid #2a4d93;
  }
  form {
    padding-right: 1rem;
    // padding-bottom: 1rem;
  }

  p {
    font-size: 14px;
    color: #2a4d93;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    margin-right: 1rem;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }

  button {
    border: none;
    cursor: pointer;
    display: block;
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 6px;
  }

  .login {
    color: #fff;
    background-color: #2a4d93;
  }

  .google {
    border: 1.5px solid #2a4d93;
    background-color: #fff;
    color: #2a4d93;
  }

  .register-link {
    text-align: center;
    color: #1e1e1e;
    padding: 1rem 0;
    font-size: 12px;
  }

  a {
    color: #2a4d93;
    text-decoration: none;
  }

  .password-field {
    display: flex;
    align-items: center;
    border: 1.2px solid #b7b4b4;
    border-radius: 5px;
    margin: 0;
    padding-right: 0.5rem;
  }
  .input-field {
    border: 1.2px solid #b7b4b4;
    border-radius: 5px;
  }

  .password-field:hover {
    border: 1.5px solid #2a4d93;
  }

  .password-field:focus {
    outline: 1px solid #2a4d93;
  }

  .password-field input {
    border: none;
  }
  .password-field input:focus {
    outline: none;
  }
  .password-field .icon {
    font-size: 20px;
    color: #b7b4b4;
    padding-top: 0.3rem;
  }

  .margin-o {
    margin: 0.3rem 0;
    cursor: pointer;
  }

  .phone-number {
    display: flex;
  }
  .phone-number select {
    width: 20%;
    padding: 0.3rem;
  }

  .phone-number select,
  input {
    border-radius: 0;
  }

  .policy,
  .signin {
    font-size: 10px;
    margin: 0;
    text-align: center;
    color: #1e1e1e;
  }

  .signin a {
    display: inline-block;
    color: #2a4d93;
  }

  .btns a {
    display: block;
    width: 100%;
  }

  .error {
    color: #d9534f;
  }
`

export default Wrapper
