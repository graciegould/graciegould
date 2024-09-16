import { configureStore } from '@reduxjs/toolkit'
import viewportsReducer from './viewportsReducer'
export default configureStore({
  reducer: {
    viewports: viewportsReducer
  }
})