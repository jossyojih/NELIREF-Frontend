import geogiaTech from '../../assets/images/georgia-tech.png'
import React, { useState } from 'react'
import { useEffect } from 'react'

const OtherUserDetails = ({ user, id }) => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    let full_name = 'Joseph Okpanachi Ojih'

    // Split the full name into words
    let words = full_name.split(' ')

    // Assign values based on the number of words
    if (words.length >= 3) {
      setFirstName(words[0])
      setMiddleName(words[1])
      setLastName(words[2])
    } else if (words.length === 2) {
      setFirstName(words[0])
      setMiddleName('-')
      setLastName(words[1])
    } else {
      setFirstName(full_name)
      setMiddleName('-')
      setLastName('-')
    }
  }, [user])

  const renderDescriptionWithLineBreaks = (description) => {
    return description?.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <article className='bg-container'>
      <section>
        <div className='details-headings'>
          <h4>Personal Details </h4>
        </div>
        <section className='personal-details'>
          <div>
            <p>First Name</p>
            <p>Middle Name</p>
            <p>Last Name</p>
            <p>Username</p>
            <p>Date of birth</p>
            <p>Location</p>
          </div>
          <div className='info'>
            <p>{firstName}</p>
            <p>{middleName}</p>
            <p>{lastName}</p>
            <p>@{user?.user_name}</p>
            <p>
              {new Date(user?.DOB).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p>{`${user?.country || 'Country'}, ${user?.state || 'City'}`}</p>
          </div>
        </section>
      </section>
      <section className='about'>
        <div className='details-headings'>
          <h4>About</h4>
        </div>
        <div>
          <p>{renderDescriptionWithLineBreaks(user?.about)}</p>
        </div>
      </section>
      <section>
        <div className='details-headings'>
          <h4>Education</h4>
          <div className='icons'></div>
        </div>
        {user?.education?.map((education, index) => (
          <div className='edit-education' key={index}>
            <div className='feeds-content' key={index}>
              <div>
                <img src={geogiaTech} alt='Georgia Tech Logo' />
              </div>

              <div>
                <h5>{education.school}</h5>
                <p>
                  {education.degree} in {education.course}
                </p>
                <p className='date'>{`${education.start} - ${education.end}`}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </article>
  )
}

export default OtherUserDetails
