import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { RiFileDownloadLine } from 'react-icons/ri'
import { useQuery } from '@tanstack/react-query'
import userServices from '../../services/api/user'

const jsonData = [
  {
    name: 'ABC of Getting any international scholarship',
    download: '#',
  },
  {
    name: 'ABC of Getting any international scholarship',
    download: '#',
  },
  {
    name: 'ABC of Getting any international scholarship',
    download: '#',
  },
]
const GroupFiles = ({ id }) => {
  const getGroupFiles = useQuery({
    queryKey: [''],
    queryFn: () => userServices.getGroupDocuments(id),
  })

  const files = getGroupFiles?.data?.documents

  console.log(id)
  console.log(getGroupFiles)
  return (
    <div>
      <ul>
        {files?.map((item, index) => (
          <div className=' post li-flex'>
            <div className='file-name'>
              <span>
                <FaRegFileAlt className='icon' />
              </span>
              <p>{item.name}</p>
            </div>
            <button>
              <RiFileDownloadLine className='icon' />
              <a href={item?.file?.url} target='blank'>
                Download
              </a>
            </button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default GroupFiles
