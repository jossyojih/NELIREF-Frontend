import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { RiFileDownloadLine } from 'react-icons/ri'

// ;<FaRegFileAlt />

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
const GroupFiles = () => {
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
