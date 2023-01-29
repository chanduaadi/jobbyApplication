import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'
import {HiExternalLink} from 'react-icons/hi'
import Header from '../Header'

import SimilarProducts from '../SimilarProducts'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetailedList: {},
    similarList: [],
  }

  componentDidMount() {
    this.jobDetailsApi()
  }

  jobDetailsApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const data = fetchedData.job_details
      const jobDetails = {
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        lifeAtCompany: data.life_at_company,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        skills: data.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: data.title,
      }

      const similarJobsList = fetchedData.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobDetailedList: jobDetails, similarList: similarJobsList})
    }
  }

  render() {
    const {jobDetailedList, similarList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailedList

    return (
      <div className="jobdetails-container">
        <Header />
        <div className="jobdetail-card-container">
          <div className="logo-details-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-role-container">
              <p className="job-role-text">{title}</p>
              <div className="job-role-star-container">
                <AiFillStar className="star-icon" />
                <p className="job-role-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobs-location-and-pakege-container">
            <div className="job-location-job-type-contianer">
              <div className="job-location-contianer">
                <MdLocationOn className="location-icon" />
                <p className="job-location-text">{location}</p>
              </div>
              <div className="job-location-contianer">
                <CgToolbox className="location-icon" />
                <p className="job-location-text">{employmentType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="line-hr" />
          <div className="jobs-location-and-pakege-container">
            <p className="discription-text">Description</p>
            <a href={companyWebsiteUrl} className="navigate-link">
              Vist <HiExternalLink />
            </a>
          </div>

          <p className="job-discription">{jobDescription}</p>
          <h1 className="discription-text">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li className="skill-list-item" key={eachSkill.name}>
                <img
                  className="skill-img"
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                />
                <p className="skil-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="discription-text">Life At Company</h1>
          <div className="company-discription-container">
            <div className="discription-contaoner">
              <p className="company-discription-text">
                {lifeAtCompany.discription}
              </p>
            </div>
            <img
              className="compony-image"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-job-cards-continer">
          <h1 className="discription-text">Similar Jobs</h1>
        </div>
        <ul className="similar-products-contaienr-list">
          {similarList.map(eachItem => (
            <SimilarProducts key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }
}

export default JobItemDetails
