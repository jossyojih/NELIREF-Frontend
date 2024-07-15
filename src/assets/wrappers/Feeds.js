import styled from 'styled-components'

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  justify-content: space-between;
  gap: 2rem;
  align-items: start;

  .post {
    background-color: #fff;
    margin: 1rem 0;
    border-radius: 8px;
    overflow: hidden;
  }

  img {
    width: 100%;
    display: block;
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

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
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
    margin-left: 3rem;
    gap: 2rem;
  }

  .post-content {
    font-size: 12px;
    margin-left: 3rem;
  }
  .post-content p {
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
    color: rgb(183, 180, 180) !important;
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
    color: rgb(183, 180, 180);
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
    color: rgb(183, 180, 180);
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
