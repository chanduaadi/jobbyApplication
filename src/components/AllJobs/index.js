import JobCard from '../JobCard'

import './index.css'

const AllJobs = props => {
  const {jobCardList} = props
  return (
    <ul className="jobs-cards-list-items-container">
      {jobCardList.map(eachJob => (
        <JobCard key={eachJob.id} eachJob={eachJob} />
      ))}
    </ul>
  )
}

export default AllJobs
