import React from 'react'
import { RequestsTable } from '../organisms/RequestsTable/RequestsTable'
import { MainTemplate } from '../templates/MainTemplate/MainTemplate'

export const MainPage = () => {
  return (
    <MainTemplate>
      <RequestsTable/>
    </MainTemplate>
  )
}
