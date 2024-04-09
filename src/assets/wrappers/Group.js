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

  .comment-input-container {
    display: flex;
    gap: 0.3rem;
    width: 60%;
  }

  .comment-submit-btn {
    border: none;
    background-color: transparent;
    color: #2a4d93;
    font-size: 18px;
  }
  .comment-input-container input {
    padding: 0.3rem;
    background-color: #f2f7fd;
    color: #1e1e1e;
    border: none;
    font-size: 13px;
  }

  .profile-summary {
    display: flex;
    gap: 2rem;
    background-color: #fff;
    padding: 0.6rem 0;
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

  .tabs-wrapper {
    background-color: #fff;
    border-top: 1px solid #565656;
    padding: 1rem;
  }

  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
  }

  .tabs h3 {
    font-size: 14px;
    color: #565656;
    font-weight: 400;
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

  .tab-btn.active {
    color: var(--primary-blue);
    border-bottom: 2px solid #2a4d93;
    padding: 0 0.5rem;
    font-weight: 600;
  }

  .groups {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .member-no {
    background-color: #2a4d93;
    padding: 0.2rem 0.5rem;
    font-size: 12px;
    margin-bottom: 0.2rem;
    border-radius: 10px;
    color: #fff;
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

  .tab-container {
    display: grid;
    grid-template-columns: 1fr 0.3fr;
    margin-top: 1rem;
    gap: 1rem;
  }

  .post {
    background-color: #fff;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 8px;
    overflow: hidden;
  }

  .post.event {
    border-radius: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-left: 2rem;
    gap: 1rem;
  }
  .post-author {
    display: flex;
    gap: 1rem;
  }

  .card .time {
    color: #2a4d93;
    margin: 0.5rem 0;
  }

  .card .content {
    font-size: 12px;
  }

  .card {
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #b7b4b4;
  }

  .list-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .head {
    font-weight: 600;
    font-size: 17px;
  }

  .img-wrapper {
    width: 40px;
    background-color: #b7b4b4;
    border-radius: 50%;
    margin: 1rem 0;
  }

  .list-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .role {
    font-size: 10px;
    padding: 0.2rem 0.6rem;
    border-radius: 8px;
    text-align: center;
    background-color: #f2f7fd;
  }

  .list-card {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .card-img {
    height: 100%;
  }

  ul {
    padding: 0;
  }

  .li-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
    border-radius: 0;
  }
  .file-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .li-flex button {
    border: none;
    background-color: transparent;
    color: #2a4d93;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card-img {
    height: 100px;
  }

  .card h2 {
    font-size: 14px;
    font-weight: 600;
    color: #1e1e1e;
    margin: 0.2rem 0;
  }

  .post-author h3 {
    font-size: 14px;
    font-weight: 600;
    color: #2a4d93;
  }

  .post-likes {
    display: flex;
    margin-top: 1rem;
    gap: 2rem;
  }

  .post-content {
    font-size: 12px;
  }

  .post-author p {
    font-size: 10px;
  }
  img {
    display: block;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }

  .post-likes p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .comment .post-author img {
    width: 30px;
  }

  .comments {
    margin: 1rem 0;
    padding: 0 1.5rem;
  }
  .comment {
    margin: 1rem 0;
  }

  .comment .post-author h3 {
    font-size: 12px;
  }

  .comment .post-content {
    font-size: 12px;
  }

  .comment .post-author p {
    font-size: 10px;
  }
  .post-likes p .icon {
    color: #2a4d93;
    font-size: 14px;
  }

  .post-author .img {
    width: 40px;
    padding: 0.2rem;
    background-color: #b7b4b4;
    overflow: hidden;
    border-radius: 50%;
  }

  label {
    color: #b7b4b4;
  }

  .description {
    background-color: #fff;
    padding: 0.5rem;
  }

  .description.events {
    margin-top: 1rem;
  }

  .description h4 {
    font-size: 15px;
    font-weight: 600;
    margin: 0.5rem 0;
    color: #1e1e1e;
    border-bottom: 1px solid #565656;
  }

  .description p {
    font-size: 11px;
  }
  .modals-btn {
    display: flex;
    gap: 1rem;
    background-color: #fff;
    padding: 0.6rem;
  }

  .modals-btn button {
    border: none;
    display: flex;
    align-items: center;
    color: #565656;
    gap: 0.5rem;
    background-color: #fff;
    cursor: pointer;
  }

  .edit-education {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
`

export default Wrapper
