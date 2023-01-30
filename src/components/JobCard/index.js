import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <Link className="job-card-link" to={`/jobs/${id}`}>
      <li className="job-card-item-container">
        <div className="logo-details-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-role-container">
            <h1 className="job-role-text">{title}</h1>
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
        <h1 className="discription-text">Description</h1>
        <p className="job-discription">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
