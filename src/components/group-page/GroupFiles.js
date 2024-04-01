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
    queryFn: () => userServices.getGroupFiles('65f0620517c76cbbb10caf4d'),
  })

  console.log(id)
  console.log(getGroupFiles)
  return (
    <div>
      <ul>
        {jsonData.map((item, index) => (
          <div className=' post li-flex'>
            <div className='file-name'>
              <span>
                <FaRegFileAlt className='icon' />
              </span>
              <p>{item.name}</p>
            </div>
            <button>
              <RiFileDownloadLine className='icon' />
              Download
            </button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default GroupFiles
