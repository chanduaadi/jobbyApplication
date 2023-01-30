import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link className="nav-link" to="/">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="header-links-container">
        <Link className="nav-link" to="/">
          <li className="header-list-items">Home</li>
        </Link>
        <Link className="nav-link" to="/jobs">
          <li className="header-list-items">Jobs</li>
        </Link>
        <li className="test-case">home</li>
      </ul>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
