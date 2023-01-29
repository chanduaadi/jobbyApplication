import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-discription">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
