import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'

import './index.css'

const SimilarProducts = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem
  return (
    <li className="similar-product-item-container">
      <div className="img-contaienr">
        <img className="similar-img" src={companyLogoUrl} alt="facebook" />
        <div className="job-name-containar">
          <p className="job-role-text">{title}</p>
          <div className="job-role-star-container">
            <AiFillStar className="star-icon" />
            <p className="job-role-rating">{rating}</p>
          </div>
        </div>
      </div>
      <p className="similar-discription">Discription</p>
      <p className="job-role-discrption">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarProducts
