import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const clickFindJobs = () => {
    history.replace('/jobs')
  }

  return (
    <div className="home-page-container">
      <Header />
      <div className="home-btm-info-contaier">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-discription">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          className="find-jobs-button"
          type="button"
          onClick={clickFindJobs}
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
