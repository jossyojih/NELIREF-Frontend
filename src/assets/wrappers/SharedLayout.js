import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 21% auto;
  }
  .dashboard-page {
    margin: 0 auto;
    padding: 2rem 0;
  }

  .dashboard-page {
    width: 90%;
  }
  .small-sidebar {
    display: none;
  }
  @media only screen and (max-width: 1000px) {
    .big-sidebar {
      display: none;
    }
    .dashboard {
      grid-template-columns: 1fr;
    }
    .small-sidebar {
      position: absolute;
      z-index: 2;
      top: 0;
      width: 60%;
      display: block;
      background-color: #fff;
      animation-name: slideFromLeft;
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
    }

    .sidebar-none {
      opacity: 1;
      animation-name: fadeOutAndHide;
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards; /* Keeps the final state of the animation */
    }

    @keyframes slideFromLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0%);
      }
    }

    @keyframes fadeOutAndHide {
      0% {
        opacity: 1;
      }

      20% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.5; /* Fade out gradually */
      }
      100% {
        opacity: 0;
        display: none; /* Hide the element after the animation */
      }
    }
  }
`
export default Wrapper
