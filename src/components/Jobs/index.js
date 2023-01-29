import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Profile from '../Profile'
import AllJobs from '../AllJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobCardList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCardList()
  }

  getCardList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const filteredData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobCardList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPendingView = () => (
    <div className="jobs-failure-view-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobCardList = () => {
    const {jobCardList} = this.state
    return (
      <div className="jobs-cards-container">
        <AllJobs jobCardList={jobCardList} />
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-discription">
        We cannot seem to find the page your looking for
      </p>
      <button className="jobs-retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobCardList()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPendingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-btm-container">
          <div className="job-profile-and-filter-container">
            <Profile />
          </div>
          <div className="job-search-and-cards-container">
            <div className="search-input-container">
              <input className="search-input" type="search" />
              <button className="search-button" type="button">
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderSwitch()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
