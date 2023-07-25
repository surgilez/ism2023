import { configureStore } from '@reduxjs/toolkit'
import reducer from '@redux/reducers'

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { ignoredPaths: ['api.ratehawk'] },
      serializableCheck: {
        ignoredPaths: ['api.ratehawk'],
      },
    }),
})
