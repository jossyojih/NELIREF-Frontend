import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Paper } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import user from '../../services/api/user'
import SkeletonArticle from '../skeletons/SkeletonArticle'
import { useEffect } from 'react'

const rows = [
  {
    name: 'ABC of Getting any international scholarship',
    group: 'Undergraduate Scholarship ',
    visibility: 'Public',
    dateUploaded: (
      <span>
        2023-04-15 by <a href=''>Wilson Ejim</a>
      </span>
    ),
    action: <BiDotsVerticalRounded />,
    icon: <HiOutlineDocumentText />,
  },
  {
    name: 'ABCD of Getting any international scholarship',
    group: 'Undergraduate Scholarship ',
    visibility: 'Public',
    dateUploaded: (
      <span>
        2023-04-15 by <a href=''>Wilson Ejim</a>
      </span>
    ),
    action: <BiDotsVerticalRounded />,
    icon: <HiOutlineDocumentText />,
  },
]

const Documents = () => {
  const [itemsToShow, setItemsToShow] = useState(4)
  const documents = useQuery({
    queryKey: ['get-documents'],
    queryFn: user.getDocuments,
  })

  const data = documents?.data?.documents?.slice(0, itemsToShow) // Slice the data based on itemsToShow

  const handleLoadMore = () => {
    setItemsToShow((prevCount) => prevCount + 4) // Increment itemsToShow by 4
  }

  useEffect(() => {
    if (
      !documents.isLoading &&
      !documents.isError &&
      data?.length === documents?.data?.documents?.length
    ) {
      setItemsToShow(documents?.data?.documents?.length)
    }
  }, [documents, data])

  return (
    <section className=''>
      {documents.isPending ? (
        [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
      ) : (
        <div>
          <TableContainer sx={{ maxWidth: '100%' }} component={Paper}>
            <Table
              style={{ fontSize: '16px', fontWeight: 300 }}
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow className='thead'>
                  <TableCell className='thead' align='left'>
                    Name
                  </TableCell>
                  <TableCell className='thead' align='left'>
                    File
                  </TableCell>
                  <TableCell className='thead' align='left'>
                    Group
                  </TableCell>
                  <TableCell className='thead' align='left'>
                    Visibility
                  </TableCell>
                  <TableCell
                    className='thead'
                    align='left'
                    style={{ width: '17%' }}
                  >
                    Date Uploaded
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className='tcell' align='left'>
                      {row.name}
                    </TableCell>
                    <TableCell
                      className='tcell icon'
                      component='th'
                      scope='row'
                    >
                      <p>
                        {' '}
                        <HiOutlineDocumentText />
                      </p>
                      <span>
                        {new Date(row.createdAt).toLocaleDateString()} by{' '}
                        {row.createdBy.full_name} <br />
                        <a
                          className='table-link'
                          href={row.file.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {row.file.url.substring(0, 30)}
                        </a>
                      </span>
                    </TableCell>
                    <TableCell className='tcell' align='left'>
                      {row?.group?.name ? row?.group?.name : 'Nill'}
                    </TableCell>
                    <TableCell className='tcell' align='left'>
                      {row.visibility}
                    </TableCell>
                    <TableCell className='tcell' align='left'>
                      {new Date(row.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='tcell' align='left'>
                      {row.action}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data?.length < documents?.data?.documents?.length && (
            <div className='tbtn-container'>
              <button
                className='btn-primary load-more'
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
      {documents.isError && <p>An Error Occurred</p>}
    </section>
  )
}

export default Documents
