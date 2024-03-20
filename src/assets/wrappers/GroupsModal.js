import styled from 'styled-components'

const Wrapper = styled.article`
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f2f7fd;
    padding: 1rem;
    color: #1e1e1e;
  }

  .card {
    margin: 1rem 0;
    width: 40%;
    margin: 1rem auto;
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    background-color: #34a853;
    color: #fff;
    border: none;
    display: block;
  }

  .heading h3 {
    font-weight: 400;
  }

  .heading .icon {
    font-size: 24px;
  }

  form {
    padding: 1rem;
  }

  form div {
    margin: 1rem 0;
  }
  input,
  label {
    display: block;
  }

  label {
    font-size: 12px;
    font-weight: 500;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 14px;
    // color: #b7b4b4;
    border: 1.2px solid #b7b4b4;
    border-radius: 4px;
  }

  select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 14px;
    color: #b7b4b4;
    border: 1.2px solid #b7b4b4;
    border-radius: 4px;
  }

  textarea {
    display: block;
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
    font-size: 14px;
    // color: #b7b4b4;
    border: 1.2px solid #b7b4b4;
    border-radius: 4px;
    resize: none;
  }
  .note {
    font-size: 12px;
    color: #b7b4b4;
  }

  .btn {
    display: flex;
    justify-content: end;
  }

  .btn button {
    border: none;
    background-color: #2a4d93;
    color: #fff;
    display: block;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }
  .error {
    color: #d9534f;
  }
`

export default Wrapper
