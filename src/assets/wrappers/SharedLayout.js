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
    }

    .sidebar-none {
      display: none;
    }
  }
`
export default Wrapper
