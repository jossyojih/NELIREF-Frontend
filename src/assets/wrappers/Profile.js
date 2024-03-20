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
  }

  .tab-content h2 {
    color: var(--primary-blue);
    font-size: 30px;
    font-weight: 600;
  }

  .profile-summary {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
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

  .connections {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;

    gap: 0.5rem;
  }

  .active-now {
    color: #34a853;
  }

  .profile-infor {
    font-size: 12px;
  }

  .profile-name {
    font-weight: 500;
    margin-top: 0.5rem;
  }

  .profile-image {
    width: 8rem;
    height: 8rem;
    color: #fff;
    border: 2px solid #2a4d93;
    background-color: #fff;
    border-radius: 50%;
    margin-top: -4rem;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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
  .bg-container {
    background-color: #fff;
    padding: 1.5rem;
  }

  .personal-details {
    display: flex;
    gap: 5rem;
  }

  p {
    color: #1e1e1e;
  }

  .personal-details div p {
    margin: 1rem 0;
  }

  .info p {
    font-weight: 500;
  }

  .bg-container section {
    margin-bottom: 2rem;
  }

  .details-headings {
    display: flex;
    justify-content: space-between;
  }

  .about {
    border-top: 1px solid #b7b4b4;
    border-bottom: 1px solid #b7b4b4;
    padding: 2rem 0;
  }

  .about div p {
    padding: 1rem 0;
  }

  .icon {
    font-size: 22px;
    color: #2a4d93;
    display: block;
  }

  .icons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .bg-container section div h4 {
    color: #2a4d93;
  }

  .feeds-content {
    display: flex;
    padding: 2rem 0;
    align-items: start;
    gap: 1rem;
  }
  img {
    display: block;
    width: 100%;
  }

  h5 {
    color: #1e1e1e;
    font-size: 16px;
    font-weight: 500;
  }

  .date {
    font-size: 12px;
    color: #b7b4b4;
  }

  .activities {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .social-btns-flex {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #b7b4b4;
    margin: 1rem 0;
  }
  .profile-img {
    width: 60px;
  }

  .time-name .time {
    font-size: 12px;
    font-weight: 400;
    color: #b7b4b4;
  }

  .desc {
    padding-right: 2rem;
  }

  .time-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .time-name p {
    font-weight: 600;
  }

  .icon.sm {
    font-size: 15px;
  }

  .connectors {
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #fff;
    display: block;
    color: #2a4d93;
  }

  .asterix {
    color: red;
  }

  label {
    color: #b7b4b4;
  }

  .edit-education {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
`

export default Wrapper
