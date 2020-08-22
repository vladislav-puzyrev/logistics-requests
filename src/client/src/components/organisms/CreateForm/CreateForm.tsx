import React from 'react'
import { Formik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createRequest } from '../../../redux/requests/thunks'
import * as Yup from 'yup'
import { Alert } from '@material-ui/lab'

export const CreateForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        companyName: '',
        carrierFIO: '',
        carrierPhone: '',
        comment: '',
        ATICode: ''
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
        const { ATICode, carrierFIO, carrierPhone, comment, companyName } = values
        dispatch(createRequest(companyName, carrierFIO, carrierPhone, comment, +ATICode, setStatus))
      }}
    >
      {({ handleChange, handleSubmit, status, isValid, errors }) => (
        <form style={{ padding: 20 }} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              error={!!errors.companyName}
              helperText={errors.companyName}
              label="Название компании"
              name='companyName'
              onChange={handleChange}
            />
            <TextField
              error={!!errors.carrierFIO}
              helperText={errors.carrierFIO}
              label="ФИО перевозчика"
              name='carrierFIO'
              onChange={handleChange}
            />
            <TextField
              error={!!errors.carrierPhone}
              helperText={errors.carrierPhone}
              label="Телефон перевозчика"
              name='carrierPhone'
              onChange={handleChange}
            />
            <TextField
              error={!!errors.ATICode}
              helperText={errors.ATICode}
              label="ATI код"
              name='ATICode'
              onChange={handleChange}
            />
            <TextField
              error={!!errors.comment}
              helperText={errors.comment}
              label="Комментарий"
              name='comment'
              onChange={handleChange}
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
              Создать
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
