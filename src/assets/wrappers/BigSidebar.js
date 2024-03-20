import styled from 'styled-components'

const Wrapper = styled.aside`
  display: block;
  background-color: #fff;

  .show-sidebar {
    margin-left: 0;
  }
  header {
    display: flex;
    align-items: center;
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
`
export default Wrapper
