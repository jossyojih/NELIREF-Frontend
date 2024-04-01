import styled from 'styled-components'

const Wrapper = styled.nav`
  height: 4rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 0.5rem 6rem;
  background-color: #fff;
  position: relative;

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

  .nav-icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .icon {
    display: block;
    font-size: 34px;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #f2f7fd;
  }
  .profile-info {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }

  .profile-info div {
    font-size: 14px;
  }

  a {
    color: #1e1e1e;
    text-decoration: none;
  }

  .nav-dropdown {
    position: absolute;
    top: 4rem;
    background-color: #fff;
    padding: 0.5rem;
  }

  .profile-img {
    width: 50px;
    display: block;
    padding: 0.3rem;
    background-color: #2a4d93;
    border-radius: 50%;
  }

  .nav-dropdown button {
    display: block;
    border: none;
    font-size: 14px;
    padding: 0.4rem;
    margin: 0.2rem 0;
    background-color: transparent;
    color: #1e1e1e;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .nav-dropdown button:hover {
    background-color: #2a4d93;
    color: #fff;
  }
  .profile-content {
    display: flex;
    border-bottom: 1px solid #b7b4b4;
    gap: 0.2rem;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .profile-content div h5 {
    font-weight: 600;
    color: #1e1e1e;
  }

  .profile-content div p {
    font-size: 12px;
  }

  .drop-down {
    cursor: pointer;
  }

  .menu-icon{
    display: none;
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 3fr 1fr;
    padding: 0.5rem 1rem;

    .menu-icon {
      display: block;
    }
  }
`

export default Wrapper
