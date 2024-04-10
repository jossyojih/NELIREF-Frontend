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

  .search {
    display: flex;
    align-items: center;
    width: 30%;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 10px;
  }

  .search input {
    width: 100%;
    border: none;
    font-size: 14px;
  }

  .search input:focus {
    outline: none;
  }

  .btn-primary {
    padding: 0.7rem 1rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .btn-primary button {
    background-color: inherit;

    border: none;
    color: inherit;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }

  .photos-search {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.5rem;
    width: 60%;
  }

  .photos-search .search {
    width: 60%;
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
    color: #1e1e1e;
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
  .thead {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  .tcontainer-wrapper {
    background-color: #fff;
  }

  .tcontainer-wrapper.photo {
    padding: 2rem;
  }

  .tcontainer {
    background-color: #fff;
    border-bottom: 1px solid #b7b4b4;
  }

  .tcell {
    font-family: 'Poppins', sans-serif;
  }

  .tcell.icon {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .tcell.icon p {
    font-size: 30px;
    color: var(--primary-blue);
  }
  a {
    color: #1e1e1e;
    text-decoration: none;
  }

  .btn-primary {
    padding: 0.5rem 1.5rem;
  }

  .tbtn-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
  }

  .photo-grid div {
    width: 100%;
  }

  .photo-grid div img {
    display: block;
    width: 100%;
  }

  .usefull-links {
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    border: 1px solid #b7b4b4;
  }

  .btn-primary.load-more {
    margin: 3rem auto;
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

  .displays {
    background-color: #fff;
    padding: 0.5rem;
    font-size: 22px;
  }

  .bars {
    color: #2a4d93;
  }

  .all-groups {
    height: 65vh;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
  }

  .all-groups section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border: 1.5px #b7b4b4 solid;
  }

  .all-groups .content {
    display: flex;
    gap: 1rem;
  }
  .img img {
    width: 100%;
    display: block;
  }

  .content .img {
    width: 15%;
  }

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

  .no-forum img {
    width: 25%;
  }

  .no-forum {
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: center;
  }

  .no-forum-container p {
    text-align: center;
    color: #b7b4b4;
  }

  .all-groups.none {
    display: flex;
    align-items: center;
    justify-content: center;
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
    cursor: pointer;
    font-weight: 600;
  }

  @media only screen and (max-width: 700px) {
    .tab-content {
      flex-direction: column;
      align-items: start;
    }

    .photos-search {
      width: 100%;
      justify-content: space-between;
      gap: 0;
    }

    .btn-primary {
      padding: 0.5rem;
    }

    div.search {
      width: 20%;
    }

    div.displays {
      display: none;
    }
    section.tabs {
      display: block;
    }

    div.groups {
      width: 100%;
      justify-content: space-between;
      gap: 0;
    }

    .flex-column section {
      flex-direction: column;
      padding: 0.65rem;
    }

    .flex {
      width: 100%;
      justify-content: space-between;
      gap: 0.5rem;
      margin: 1rem;
    }

    div.content {
      width: 100%;
    }

    .content.my {
      width: 70%;
    }
    .all-groups .approved {
      flex-direction: column;
      gap: 1rem;
    }

    .all-groups section {
      flex-direction: column;
    }

    .content {
      flex-direction: column;
      width: 100%;
      margin-bottom: 1rem;
    }

    .img {
      height: 100px;
    }

    .content .img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .content .img {
      width: 100%;
      height: 150px;
      margin: 0 auto;
      display: block;
    }
  }
`

export default Wrapper
