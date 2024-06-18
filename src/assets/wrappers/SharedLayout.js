import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    max-width: 1440px;
    margin: 0 auto;
    display: grid;
  }

  .dashboard-page {
    position: relative;
  }

  .page-dashboard {
    position: absolute;
    top: 100px;
    left: 280px;
    width: 75%;
  }
  .small-sidebar {
    display: none;
  }

  .big-sidebar aside {
    height: 100vh;
  }

  .big-sidebar {
    position: fixed;
    z-index: 999;
    width: 250px;
    height: 100vh;
  }

  @media only screen and (max-width: 1000px) {
    .big-sidebar {
      display: none;
    }

    .page-dashboard {
      position: absolute;
      top: 100px;
      left: 2rem;
      width: 100%;
    }
    .dashboard {
      grid-template-columns: 1fr;
    }
    .small-sidebar {
      position: absolute;
      z-index: 1200;
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
