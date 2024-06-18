import styled from 'styled-components'

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  justify-content: space-between;
  gap: 2rem;
  align-items: start;

  .feeds {
    background-color: #fff;
    padding: 1rem 2rem;
    border-radius: 15px;
  }

  .center-rotate {
    display: flex;
    justify-content: center;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-btn button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .updates {
    background-color: #fff;
    padding: 1rem 2rem;
    border-radius: 15px;
  }

  input {
    display: block;
    width: 100%;
    background-color: #f2f7fd;
    border: none;
    color: #b7b4b4;
    font-weight: 200;
  }

  input:focus {
    outline: none;
  }

  .flex-input {
    margin-left: 3rem;
    margin-top: 0.5rem;
  }

  .flex-input form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .icon-send {
    color: #2a4d93;
    font-size: 20px;
    border: none;
    background-color: transparent;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.8rem;
    border-radius: 25px;
  }

  .search .icon {
    font-size: 20px;
    color: #b7b4b4;
  }

  .feeds-card {
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 0;
  }

  .feeds-content {
    display: flex;
    gap: 1rem;
  }

  .feeds-content p {
    color: #1e1e1e;
  }
  .time {
    font-size: 12px;
  }

  .name {
    font-weight: 400;
  }

  .feeds-icons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .feeds-icons p {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 0.5rem;
  }

  .feed-icon.liked {
    color: #2a4d93;
  }

  .feed-icon.unlike {
    color: #b7b4b4;
  }

  .feed-icons p {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }

  .feed-icon {
    color: #b7b4b4;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 3rem;
  }

  .comments {
    margin-left: 3rem;
  }

  .comments p {
    font-size: 13px;
    margin: 0.5rem 0;
  }

  .comment-input {
    font-size: 12px;
    color: #1e1e1e;
    width: 160%;
    display: block;
    padding: 0.4rem;
    border-radius: 4px;
  }

  .updates {
    padding: 1rem;
  }

  .updates h3 {
    color: #1e1e1e;
    font-weight: 600;
    border-bottom: 1px solid #b7b4b4;
  }

  .period {
    font-size: 10px;
  }

  .updates-content {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    border-bottom: 1px solid #b7b4b4;
    padding: 0.5rem 0;
    // border-top: 1px solid #b7b4b4;
    margin: 1rem 0;
  }
  .updates section div p span {
    font-weight: 500;
  }

  .btn-more {
    display: flex;
    justify-content: center;
  }
  @media only screen and (max-width: 700px) {
    .updates {
      display: none;
    }
    grid-template-columns: 1fr;
  }
`
export default Wrapper
