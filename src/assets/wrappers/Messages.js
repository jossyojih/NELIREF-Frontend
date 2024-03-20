import styled from 'styled-components'

const Wrapper = styled.main`
  .tab-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .members-container {
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    border: 1px solid #b7b4b4;
    background-color: #fff;
  }

  .members-container section {
    border: 1px solid #b7b4b4;
  }

  .friends-list {
    display: flex;
    padding: 0.5rem;
    margin: 0.5rem;
    border-bottom: 1px solid #b7b4b4;
  }

  .friends-img {
    width: 50px;
  }

  .send-msg {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.65rem;
    background-color: #f2f7fd;
    gap: 0.5rem;
  }

  button {
    width: 20%;
    display: block;
  }

  .align-end {
    display: flex;
    align-items: flex-end;
    width: 100%;
    padding: 1rem;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .send-msg input {
    display: block;
    width: 100%;
    border: none;
    background-color: #f2f7fd;
  }

  .msg-container {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 10px;
  }
  .send-msg input:focus {
    outline: none;
  }

  .chat {
    padding: 1rem;
    margin: 1rem;
  }

  .time-sent {
    font-size: 10px;
  }

  .sender {
    font-size: 12px;
  }

  .message {
    padding: 0.5rem;
    background-color: #f2f7fd;
    width: 50%;
    border-radius: 7px;
  }

  .send-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #2a4d93;
    color: #fff;
    border: none;
    padding: 0.65rem;
  }

  .msg {
    font-size: 12px;
    font-weight: 500;
  }

  .send-msg .icon {
    font-size: 20px;
    color: #b7b4b4;
  }

  .time {
    font-size: 10px;
    color: #b7b4b4;
  }

  .username {
    color: #2a4d93;
    font-weight: 500;
  }

  .friends-img img {
    display: block;
    width: 100%;
  }

  .tab-content h2 {
    color: var(--primary-blue);
    font-size: 30px;
    font-weight: 600;
  }

  .tabs {
    background-color: #f2f7fd;
    padding: 1.5rem;
  }

  h3 {
    font-weight: 400;
    color: #2a4d93;
  }
`

export default Wrapper
