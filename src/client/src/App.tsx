import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { MainPage } from './components/pages/MainPage'
import { CreatePage } from './components/pages/CreatePage'
import { UpdatePage } from './components/pages/UpdatePage'

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <MainPage/>}/>
          <Route exact path='/create' render={() => <CreatePage/>}/>
          <Route exact path='/update/:id' render={() => <UpdatePage/>}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
