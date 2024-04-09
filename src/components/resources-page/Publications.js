import * as React from 'react'
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
import { useEffect, useState } from 'react'

const rows = [
  {
    name: 'Exploring Genomics of plant',
    category: 'Genomics',
    type: 'Research Document',
    dateUploaded: (
      <span>
        2023-04-15 by <a href=''>Wilson Ejim</a>
      </span>
    ),
    action: <BiDotsVerticalRounded />,
    icon: <HiOutlineDocumentText />,
  },
  {
    name: 'Explorings Genomics of plant',
    category: 'Genomics',
    type: 'Research Document',
    dateUploaded: (
      <span>
        2023-04-15 by <a href=''>Wilson Ejim</a>
      </span>
    ),
    action: <BiDotsVerticalRounded />,
    icon: <HiOutlineDocumentText />,
  },
]

const Publications = () => {
  const [itemsToShow, setItemsToShow] = useState(4)
  const getLinks = useQuery({
    queryKey: ['get-publications'],
    queryFn: user.getPublications,
  })

  const data = getLinks?.data?.publications?.slice(0, itemsToShow)
  const handleLoadMore = () => {
    setItemsToShow((prevCount) => prevCount + 4) // Increment itemsToShow by 4
  }

  useEffect(() => {
    if (
      !getLinks.isLoading &&
      !getLinks.isError &&
      data?.length === getLinks?.data?.publications?.length
    ) {
      setItemsToShow(getLinks?.data?.publications?.length)
    }
  }, [getLinks, data])

  console.log(data)

  {
    return (
      <section className='tcontainer-wrapper'>
        {getLinks.isPending ? (
          [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme='light' />)
        ) : (
          <React.Fragment>
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
                    <TableCell className='thead' align='left'>
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
                        {row.title}
                      </TableCell>
                      <TableCell
                        className='tcell icon'
                        component='th'
                        scope='row'
                      >
                        <p> {<HiOutlineDocumentText />}</p>
                        {
                          <span>
                            {new Date(row.createdAt).toLocaleDateString()} by{' '}
                            {row.createdBy.full_name} <br />
                            <a
                              className='table-link'
                              href={row.file.url}
                              target='_blank'
                            >
                              {row.file.url.substring(0, 30)}
                            </a>
                          </span>
                        }
                      </TableCell>
                      <TableCell className='tcell' align='left'>
                        {row.category}
                      </TableCell>
                      <TableCell className='tcell' align='left'>
                        {row.type}
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
            {data?.length < getLinks?.data?.publications?.length && (
              <div className='tbtn-container'>
                <button
                  className='btn-primary load-more'
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </React.Fragment>
        )}
        {getLinks.isError && <p>An Error Occurred</p>}
      </section>
    )
  }
}
export default Publications
