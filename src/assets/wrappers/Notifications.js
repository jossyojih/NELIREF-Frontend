import styled from 'styled-components'

const Wrapper = styled.main`
  .tab-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .tab-content h2 {
    color: var(--primary-blue);
    font-size: 30px;
    font-weight: 600;
  }

  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f2f7fd;
    padding: 1.5rem;
  }

  .tabs div {
    display: flex;
    align-items: center;
    color: #1e1e1e;
  }
  .tab-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .tab-btn h4 {
    font-weight: 500;
  }
  .tab-btn.tab-active {
    color: var(--primary-blue);
  }

  .tab-btn.active .icon {
    color: var(--primary-blue);
  }

  .tab-btn.active h4 {
    color: var(--primary-blue);
  }

  .groups {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .number {
    background-color: #2a4d93;
    color: #fff;
    padding: 0.2rem;
    border-radius: 10px;
  }

  .number-grey {
    background-color: #b7b4b4;
    color: #fff;
    padding: 0.2rem;
    border-radius: 10px;
  }

  .notifications-wrapper {
    background-color: #fff;
    padding: 1rem;
  }

  .notification-card {
    display: flex;
    align-self: center;
    justify-content: space-between;
    padding: 0.75rem;
    border-bottom: 1px solid #b7b4b4;
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .profile {
    width: 50px;
  }

  .users-name {
    color: #2a4d93;
    font-weight: 500;
  }

  .date {
    font-size: 12px;
    color: #b7b4b4;
  }

  button {
    display: block;
    border: none;
    padding: 0.65rem;
    border-radius: 5px;
  }

  .btns {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .connect,
  .decline,
  .connected {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .connect {
    background-color: #2a4d93;
    color: #fff;
  }
  .connected {
    background-color: #34a853;
    color: #fff;
  }

  .decline {
    color: #eb4335;
    border: 1px solid #eb4335;
    background-color: #fff;
  }

  .icon {
    display: block;
    font-size: 18px;
  }
`

export default Wrapper
