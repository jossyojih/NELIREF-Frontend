import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/Resources'
import Documents from '../../components/resources-page/Documents'
import { CiSearch } from 'react-icons/ci'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { TiDocumentText } from 'react-icons/ti'
import { FiLink2 } from 'react-icons/fi'
import Photos from '../../components/resources-page/Photos'
import UsefullLinks from '../../components/resources-page/UsefullLinks'
import Publications from '../../components/resources-page/Publications'
import { TiDocumentDelete } from 'react-icons/ti'
import { IoLinkSharp } from 'react-icons/io5'
import AddPhotoModal from '../../components/Modals/AddPhotoModal'
import AddUsefulLinks from '../../components/Modals/AddUsefulLinks'
import AddPublicationsModal from '../../components/Modals/AddPublicationsModal'
import AddDocumentModal from '../../components/Modals/AddDocumentModal'
import { useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import user from '../../services/api/user'

const Resources = () => {
  const [activeTab, setActiveTab] = useState('Documents')
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false)
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false)
  const [isAddPublicationsModalOpen, setIsAddPublicationsModalOpen] =
    useState(false)
  const [isAddUsefulLinksModalOpen, setIsAddUsefulLinksModalOpen] =
    useState(false)
  

  const openAddDocumentModal = () => {
    setIsAddDocumentModalOpen(true)
  }

  const closeAddDocumentModal = () => {
    setIsAddDocumentModalOpen(false)
  }

  const openAddPhotoModal = () => {
    setIsAddPhotoModalOpen(true)
  }

  const closeAddPhotoModal = () => {
    setIsAddPhotoModalOpen(false)
  }

  const openAddPublicationsModal = () => {
    setIsAddPublicationsModalOpen(true)
  }

  const closeAddPublicationsModal = () => {
    setIsAddPublicationsModalOpen(false)
  }

  const openAddUsefulLinksModal = () => {
    setIsAddUsefulLinksModalOpen(true)
  }

  const closeAddUsefulLinksModal = () => {
    setIsAddUsefulLinksModalOpen(false)
  }


  return (
    <Wrapper>
      {isAddDocumentModalOpen && (
        <AddDocumentModal onClose={closeAddDocumentModal} />
      )}
      {isAddPhotoModalOpen && <AddPhotoModal onClose={closeAddPhotoModal} />}
      {isAddUsefulLinksModalOpen && (
        <AddUsefulLinks onClose={closeAddUsefulLinksModal} />
      )}
      {isAddPublicationsModalOpen && (
        <AddPublicationsModal onClose={closeAddPublicationsModal} />
      )}

      {activeTab === 'Documents' && (
        <article className='tab-content'>
          <h2>Documents</h2>
          <div className='photos-search'>
            <div className='search'>
              <CiSearch className='search-icon' />
              <input type='text' placeholder='Search Documents' />
            </div>
            <div className='btn-primary '>
              <TiDocumentDelete className='icon' />
              <button onClick={openAddDocumentModal}>Add Document</button>
            </div>
          </div>
        </article>
      )}
      {activeTab === 'Photos' && (
        <article className='tab-content'>
          <h2>Photos</h2>
          <div className='photos-search'>
            <div className='search'>
              <CiSearch className='search-icon' />
              <input type='text' placeholder='Search Photos' />
            </div>
            <div className='btn-primary '>
              <HiOutlinePhotograph className='icon' />
              <button onClick={openAddPhotoModal}>Add Photos</button>
            </div>
          </div>
        </article>
      )}
      {activeTab === 'Useful Links' && (
        <article className='tab-content'>
          <h2>Useful Links</h2>
          <div className='photos-search'>
            <div className='search'>
              <CiSearch className='search-icon' />
              <input type='text' placeholder='Search Photos' />
            </div>
            <div className='btn-primary '>
              <IoLinkSharp className='icon' />
              <button onClick={openAddUsefulLinksModal}>
                Add usefull links
              </button>
            </div>
          </div>
        </article>
      )}
      {activeTab === 'Publications and Research' && (
        <article className='tab-content'>
          <h2>Publications and Research</h2>
          <div className='photos-search'>
            <div className='search'>
              <CiSearch className='search-icon' />
              <input type='text' placeholder='Search Photos' />
            </div>
            <div className='btn-primary '>
              <TiDocumentDelete className='icon' />
              <button onClick={openAddPublicationsModal}>
                Add publications
              </button>
            </div>
          </div>
        </article>
      )}

      <article>
        <section className='tabs'>
          <div
            onClick={() => setActiveTab('Documents')}
            className={`tab-btn ${activeTab === 'Documents' ? 'active' : ''}`}
          >
            <HiOutlineDocumentText className='icon' />
            <h4>Documents</h4>
          </div>
          <div
            onClick={() => setActiveTab('Photos')}
            className={`tab-btn ${activeTab === 'Photos' ? 'active' : ''}`}
          >
            <HiOutlinePhotograph className='icon' />
            <h4>Photos</h4>
          </div>
          <div
            onClick={() => setActiveTab('Useful Links')}
            className={`tab-btn ${
              activeTab === 'Useful Links' ? 'active' : ''
            }`}
          >
            <FiLink2 className='icon' />
            <h4>Useful Links</h4>
          </div>
          <div
            onClick={() => setActiveTab('Publications and Research')}
            className={`tab-btn ${
              activeTab === 'Publications and Research' ? 'active' : ''
            }`}
          >
            <TiDocumentText className='icon' />
            <h4>Publications and Research</h4>
          </div>
        </section>

        <section>
          {activeTab === 'Documents' && <Documents />}
          {activeTab === 'Photos' && <Photos />}
          {activeTab === 'Useful Links' && <UsefullLinks />}
          {activeTab === 'Publications and Research' && <Publications />}
        </section>
      </article>
    </Wrapper>
  )
}

export default Resources
