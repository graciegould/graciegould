import { configureStore } from '@reduxjs/toolkit'
import viewportsReducer from './reducers/viewportsReducer'
export default configureStore({
  reducer: {
    viewports: viewportsReducer
  }
})