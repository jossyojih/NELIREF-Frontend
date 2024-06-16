import styled from 'styled-components'

const Wrapper = styled.article`
  h3 {
    text-align: center;
    font-weight: 600;
    color: #2a4d93;
    font-size: 24px;
  }

  p {
    text-align: center;
  }

  .photo-icon {
    color: #141b34;
    width: 30px;
    display: inline-block;
    margin-right: 1rem;
  }

  .custom-file-upload.border {
    border: 1px dashed #141b34;
    border-radius: 10px;
    height: 50px;
  }

  .custom-file-upload.mul-file {
    border: none;
  }

  .img-flex {
    display: flex;
    gap: 0.5rem;
  }

  .img-width {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .img-wrapper-flex {
    display: flex;
    align-items: end;
    gap: 0.5rem;
  }

  .custom-file-upload.mul-file label {
    color: #2a4d93;
    font-weight: 500;
  }

  .custom-file-upload.border label {
    color: #b7b4b4;
    text-decoration: none;
  }
  textarea {
    display: block;
    width: 100%;
  }

  .sm-p {
    color: #b7b4b4;
    font-size: 10px;
  }

  button {
    display: block;
    border: none;
    background-color: #2a4d93;
    color: #fff;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0.5rem auto;
    cursor: pointer;
  }

  .input-document {
    display: block;
    background-color: #34a853;
    width: 500px;
  }

  .close-modal {
    font-size: 28px;
    display: flex;
    justify-content: flex-end;
    color: #141b34;
    cursor: pointer;
  }

  .modal-content {
    text-align: left;
    margin: 1rem 0;
  }

  .modal-content p {
    text-align: left;
  }
  .p-color {
    color: #205090;
  }

  .new-pword {
    color: #fff;
    text-decoration: none;
  }

  /* Resources Modals */
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .heading button {
    margin: 0;
    background-color: transparent;
    color: #141b34;
    font-size: 20px;
  }

  label {
    display: block;
    margin: 1rem 0;
  }

  input,
  select {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }

  .action-btn {
    width: 100%;
    background-color: #2a4d93;
  }

  .drop-box {
    border: 1.5px dashed #5e5e5e;
    height: 200px;

    border-radius: 5px;
    margin: 0.5rem auto;
  }

  .photo-icon {
    font-size: 100px;
    width: 50%;
    margin: 1rem auto;
    color: #b7b4b4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-file-upload {
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2a4d93;
  }

  .custom-file-upload.file {
    padding: 0.85rem;
    border: 1px dashed #1e1e1e;
    border-radius: 5px;
    color: #1e1e1e;
    gap: 1rem;
  }

  .custom-file-upload.file label {
    margin: 0;
    color: #1e1e1e;
    text-decoration: none;
  }
  .custom-file-upload label {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
  }
  .p-info {
    color: #b7b4b4;
    margin-bottom: 1rem;
    font-size: 12px;
  }

  input[type='file'] {
    display: none;
  }

  /* Resources Modals */

  /* Event Modal  */

  .event-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  label.reduce {
    margin: 0.2rem 0;
  }

  label.reduce input,
  select {
    padding: 0.2rem;
    font-size: 14px;
  }

  p.p-info.two {
    margin: 0.4rem 0;
  }
  .label.reduce {
    font-size: 14px;
  }

  .summary-text.two .reduce {
    margin: 0.3rem;
  }

  .custom-file-upload.file.margin {
    margin-top: 0.4rem;
    padding: 0.2rem;
  }
  .p-info.two {
    font-size: 10px;
  }

  .input-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #b7b4b4;
  }

  .input-flex input {
    border: none;
    width: 60%;
    margin: none;
    display: inline-block;
  }

  .summary-text p {
    text-align: left;
    margin: 0.7rem 0;
  }

  .summary-text textarea {
    height: 50px;
    width: 100%;
    padding: 0.5rem;
  }
  .input-flex input:focus {
    outline: none;
  }
  /* Event Modal */

  /* Forum Modal  */
  .member {
    display: flex;
    align-items: center;

    gap: 0.5rem;
    border: none;
    color: #fff;
    background-color: #34a853;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  .content h5 {
    font-size: 16px;
    font-weight: 600;
    color: #1e1e1e;
  }

  .member.join-group {
    background-color: #fff;
    color: #1e1e1e;
    border: #1e1e1e 1px so;
  }
  .span-bold {
    font-weight: 600;
  }

  .member.red {
    background-color: #eb4335;
  }

  .cta-flex {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .see-more {
    color: #2a4d93;
    font-weight: 600;
  }

  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }

  .d-flex button {
    margin: 0.3rem;
    width: 100px;
  }

  .d-flex .red {
    background-color: #eb4335;
  }

  .summary-text.two {
    margin: 0;
  }

  .content-style {
    background-color: white;
    width: 35%;
    margin: auto;
    margin-top: 1%;
    overflow: hidden;
    border-radius: 5px;
    padding: 1.5rem;
    z-index: 99999;
  }
  .content-style2 {
    background-color: white;
    width: 30%;
    margin: auto;
    margin-top: 1%;
    overflow: hidden;
    border-radius: 5px;
    padding: 1rem;
    z-index: 99999;
  }

  @media only screen and (max-width: 700px) {
    .content-style {
      width: 80%;
    }
    .content-style2 {
      width: 80%;
    }
  }
  /* Forum Modal */
`

export default Wrapper
