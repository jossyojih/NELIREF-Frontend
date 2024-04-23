import styled from 'styled-components'

const Wrapper = styled.aside`
  @media (max-width: 992px) {
    display: block;

    .menu-icon-two {
      color: #b7b4b4;
      font-size: 20px;
    }
  }

  display: none;
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
  .show-sidebar {
    margin-left: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem 0.7rem 2rem 2rem;
  }

  header div p {
    font-size: 14px;
    padding-left: 0.4rem;
    font-weight: 400;
    color: var(--primary-blue);
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    color: var(--primary-blue);
    padding-left: 2rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    margin: 1rem 0;
    padding: 0.7rem 0;
    padding-left: 1.3rem;
    text-transform: capitalize;
    transition: var(--transition);
    text-decoration: none;
    font-weight: 400;
  }
  .nav-link:hover {
    padding-left: 2rem;
    background-color: var(--primary-blue);
    border-radius: 60px 0px 0px 60px;
    color: #fff;
  }

  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: #fff;
    background-color: var(--primary-blue);
    border-radius: 60px 0px 0px 60px;
  }
  .active .icon {
    color: var(--primary-500);
  }

  .show-sidebar {
    margin-left: 0;
  }
  header {
    display: flex;
    align-items: center;

    justify-content: space-around;
    padding: 2rem 0.7rem 2rem 2rem;
  }

  header div p {
    font-size: 14px;
    padding-left: 0.4rem;
    font-weight: 400;
    color: var(--primary-blue);
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    color: var(--primary-blue);
    padding-left: 1rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    margin: 0.7rem 0;
    padding: 0.5rem 0;
    padding-left: 1rem;
    text-transform: capitalize;
    transition: var(--transition);
    text-decoration: none;
    font-weight: 400;
  }
  .nav-link:hover {
    padding-left: 2rem;
    background-color: var(--primary-blue);
    border-radius: 60px 0px 0px 60px;
    margin-left: 1rem;
    color: #fff;
  }

  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: #fff;
    background-color: var(--primary-blue);
    border-radius: 60px 0px 0px 60px;
  }
  .active .icon {
    color: var(--primary-500);
  }
`
export default Wrapper
