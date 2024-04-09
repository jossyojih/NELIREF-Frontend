import styled from 'styled-components'

const Wrapper = styled.main`
  .tab-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .skeleton-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .tabs.funding {
    background-color: #fff;
  }
  .members-container {
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    padding: 1rem;
  }

  .tab-content h2 {
    color: var(--primary-blue);
    font-size: 30px;
    font-weight: 600;
  }

  .funding-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .funding-grid section.events {
    margin: 0;
    padding: 0;
  }

  .cover-picture {
    height: 300px;
    width: 100%;
  }

  .event-content.funding .title {
    font-size: 16px;
    color: #2a4d93;
  }

  .event-content p .summary-funding {
    font-size: 14px;
    color: #1e1e1e;
  }
  .event-content.funding {
    padding: 0.5rem;
  }

  .cover-picture img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .funding-grid section.events {
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
  }
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f2f7fd;
    padding: 1.5rem;
  }

  .search input {
    width: 100%;
    border: none;
    font-size: 14px;
  }

  .photos-search .search {
    width: 60%;
  }

  .photos-search {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.5rem;
    width: 60%;
  }

  .search {
    display: flex;
    align-items: center;
    width: 70%;
    background-color: #fff;
    padding: 0.5rem;
    border-radius: 10px;
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
  .thead {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  .tcontainer-wrapper {
    background-color: #fff;
  }

  .displays {
    padding: 0.5rem;
    font-size: 22px;
  }

  .displays div {
    color: #b7b4b4;
  }

  .bars {
    color: #2a4d93;
  }
  .groups div h4 {
    color: #2a4d93;
    font-size: 14px;
    font-weight: 500;
  }

  .groups {
    display: flex;
    gap: 1.5rem;
  }

  .upcoming {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .today {
    padding: 0.35rem;
    background-color: #fff;
  }

  .events {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem;
    padding: 0rem 0.2rem;
    padding-right: 3rem;
    padding-left: 0.3rem;
    border: 1.5px solid #b7b4b4;
  }
  .picture {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    margin: 1rem 0;
  }

  .picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .event-container {
    background-color: #fff;
    padding: 1rem;
  }

  .event-content p {
    color: #b7b4b4;
    font-size: 14px;
  }

  .link {
    color: #2a4d93;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
  }

  .event-content.funding p.summary-funding {
    color: #1e1e1e;
  }
  .event-content h5 {
    font-size: 16px;
    color: #1e1e1e;
    font-weight: 600;
    margin: 0.3rem 0;
  }

  .virtual-event {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 12px;
    color: #1e1e1e;
  }

  .virtual-event p {
    color: #1e1e1e;
    margin: 0.3rem 0;
  }

  .virtual-event .icon {
    color: #1e1e1e;
    font-size: 20px;
  }
  .summary {
    color: #1e1e1e;
    font-size: 13px;
  }

  .picture {
    color: #b7b4b4;
  }

  .event-date {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .line {
    width: 90%;
    height: 2px;
    background-color: #b7b4b4;
  }

  .event-date p {
    color: #2a4d93;
  }

  .nav-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn-primary button {
    border: none;
    background-color: transparent;
    color: #fff;
  }

  @media screen and (max-width: 700px) {
    .events {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
    }
    .event-content {
      order: -1;
    }
  }
`

export default Wrapper
