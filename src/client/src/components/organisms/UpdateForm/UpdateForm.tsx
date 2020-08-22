import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateRequest } from '../../../redux/requests/thunks'
import * as Yup from 'yup'
import { Alert } from '@material-ui/lab'
import { getRequest } from '../../../api/requests'
import { RequestType } from '../../../types/types'

export const UpdateForm = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const [request, setRequest] = useState<null | RequestType>(null)
  useEffect(() => {
    getRequest(+id).then(setRequest)
  }, [id])

  if (!request) return <p style={{ padding: 20 }}>Загрузка...</p>

  return (
    <Formik
      initialValues={{
        companyName: request.companyName,
        carrierFIO: request.carrierFIO,
        carrierPhone: request.carrierPhone,
        comment: request.comment,
        ATICode: request.ATICode
      }}
      validationSchema={
        Yup.object().shape({
          companyName: Yup.string().required('Обязательное поле'),
          carrierFIO: Yup.string().required('Обязательное поле'),
          carrierPhone: Yup.string().required('Обязательное поле'),
          comment: Yup.string(),
          ATICode: Yup.string().required('Обязательное поле')
        })
      }
      onSubmit={(values, { setStatus }) => {
        dispatch(updateRequest(+id, values as any, setStatus))
      }}
    >
      {({ handleChange, handleSubmit, status, isValid, errors, values }) => (
        <form style={{ padding: 20 }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              error={!!errors.companyName}
              helperText={errors.companyName}
              label="Название компании"
              name='companyName'
              onChange={handleChange}
              value={values.companyName}
            />
            <TextField
              error={!!errors.carrierFIO}
              helperText={errors.carrierFIO}
              label="ФИО перевозчика"
              name='carrierFIO'
              onChange={handleChange}
              value={values.carrierFIO}
            />
            <TextField
              error={!!errors.carrierPhone}
              helperText={errors.carrierPhone}
              label="Телефон перевозчика"
              name='carrierPhone'
              onChange={handleChange}
              value={values.carrierPhone}
            />
            <TextField
              error={!!errors.ATICode}
              helperText={errors.ATICode}
              label="ATI код"
              name='ATICode'
              onChange={handleChange}
              value={values.ATICode}
            />
            <TextField
              error={!!errors.comment}
              helperText={errors.comment}
              label="Комментарий"
              name='comment'
              onChange={handleChange}
              value={values.comment}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              style={{ width: 120 }}
              disabled={!isValid}
            >
              Изменить
            </Button>
            <Button
              type='button'
              color='secondary'
              variant='contained'
              style={{ marginLeft: 20, width: 120 }}
              onClick={() => history.push('/')}
            >
              Назад
            </Button>
          </div>
          {status && <Alert severity="success" style={{ marginTop: 20 }}>{status}</Alert>}
        </form>
      )}
    </Formik>
  )
}
