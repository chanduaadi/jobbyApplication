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

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobCardList: [],
    apiStatus: apiStatusConstants.initial,
    checkBoxValues: [],
    radioValue: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getCardList()
  }

  getCardList = async () => {
    const {checkBoxValues, radioValue, searchInput} = this.state
    const checkValues = checkBoxValues.join()

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkValues}&minimum_package=${radioValue}&search=${searchInput}`
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

  retryJobs = () => {
    this.getCardList()
  }

  onChangeCheck = event => {
    const {checkBoxValues} = this.state
    if (checkBoxValues.includes(event.target.value)) {
      const arr = checkBoxValues.filter(v => v !== event.target.value)
      this.setState({checkBoxValues: arr}, this.getCardList)
    } else {
      const arr = [...checkBoxValues, event.target.value]
      this.setState({checkBoxValues: arr}, this.getCardList)
    }
  }

  onChangeRadio = event => {
    this.setState({radioValue: event.target.value}, this.getCardList)
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onclickSearch = () => {
    this.getCardList()
  }

  renderPendingView = () => (
    <div className="jobs-failure-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noProductFound = () => (
    <div className="jobs-cards-container">
      <img
        className="no-jobs-found"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-discription">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobCardList = () => {
    const {jobCardList} = this.state
    if (jobCardList.length < 1) {
      return this.noProductFound()
    }
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
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="jobs-retry-button"
        type="button"
        onClick={this.retryJobs}
      >
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
    const {searchInput, radioValue} = this.state
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-btm-container">
          <div className="job-profile-and-filter-container">
            <Profile />
            <hr className="profile-hr-line" />
            <h1 className="heading">Type of Employment</h1>
            <ul className="check-box-contaienr">
              {employmentTypesList.map(eachItem => (
                <li className="check-box-list" key={eachItem.employmentTypeId}>
                  <input
                    value={eachItem.employmentTypeId}
                    type="checkBox"
                    id={eachItem.employmentTypeId}
                    onChange={this.onChangeCheck}
                  />
                  <label
                    htmlFor={eachItem.employmentTypeId}
                    className="lable-text"
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="profile-hr-line" />
            <h1 className="heading">Salary Range</h1>
            <ul className="check-box-contaienr">
              {salaryRangesList.map(eachItem => (
                <li className="check-box-list" key={eachItem.salaryRangeId}>
                  <input
                    value={eachItem.salaryRangeId}
                    type="radio"
                    id={eachItem.salaryRangeId}
                    checked={radioValue === eachItem.salaryRangeId}
                    onChange={this.onChangeRadio}
                  />
                  <label
                    htmlFor={eachItem.salaryRangeId}
                    className="lable-text"
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-search-and-cards-container">
            <div className="search-input-container">
              <input
                className="search-input"
                value={searchInput}
                type="search"
                onChange={this.onSearch}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.onclickSearch}
              >
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
