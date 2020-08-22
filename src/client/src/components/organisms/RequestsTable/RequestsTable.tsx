import React, { useEffect, useState } from 'react'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { requestsSelector, totalRequestsSelector } from '../../../redux/requests/selectors'
import { deleteRequest, getRequests } from '../../../redux/requests/thunks'
import { Pagination } from '@material-ui/lab'
import BuildIcon from '@material-ui/icons/Build'
import DeleteIcon from '@material-ui/icons/Delete'
import { useHistory } from 'react-router-dom'

export const RequestsTable = () => {
  const history = useHistory()
  const requests = useSelector(requestsSelector)
  const totalRequests = useSelector(totalRequestsSelector)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRequests(10, 1))
  }, [dispatch])

  const handleChange = (event: any, value: number) => {
    setPage(value)
    dispatch(getRequests(10, value))
  }

  const countPages = Math.ceil(totalRequests / 10)
  const pageCount = countPages > 10 ? 10 : countPages

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 20, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Pagination count={pageCount} page={page} onChange={handleChange}/>
          <TextField label="Поиск" variant="filled" value={search} onChange={e => {
            setSearch(e.target.value)
            dispatch(getRequests(10, page, e.target.value))
          }}/>
        </div>
        <Button variant='contained' color='primary' onClick={() => history.push('/create')}>
          Добавить заявку
        </Button>
      </div>
      <TableContainer component={Paper} style={{ marginBottom: 20 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Номер</TableCell>
              <TableCell align="left">Дата создания</TableCell>
              <TableCell align="left">Название фирмы</TableCell>
              <TableCell align="left">Перевозчик</TableCell>
              <TableCell align="left">Телефон перевозчика</TableCell>
              <TableCell align="left">Комментарий</TableCell>
              <TableCell align="left">ATI код</TableCell>
              <TableCell align="center">Редактировать</TableCell>
              <TableCell align="center">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              requests.map(request => {
                const href = `https://ati.su/firms/${request.ATICode}/info`
                return <TableRow key={request.seq}>
                  <TableCell component="th" scope="row">
                    {request.seq}
                  </TableCell>
                  <TableCell align="left">{request.date}</TableCell>
                  <TableCell align="left">{request.companyName}</TableCell>
                  <TableCell align="left">{request.carrierFIO}</TableCell>
                  <TableCell align="left">{request.carrierPhone}</TableCell>
                  <TableCell align="left">{request.comment}</TableCell>
                  <TableCell align="left">
                    <a href={href} target='_blank' rel="noopener noreferrer">
                      https://ati.su/firms/{request.ATICode}/info
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="update" onClick={() => history.push(`/update/${request.seq}`)}>
                      <BuildIcon/>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" onClick={() => dispatch(deleteRequest(request.seq, page))}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
