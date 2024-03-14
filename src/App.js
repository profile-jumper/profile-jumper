import React, { useRef } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createStore } from 'jotai'

import { appRoutes } from './route/appRoutes'
import { AppContext } from './data/repository/provider/jotai-provider'

const App = () => {
    const appStore = useRef(createStore())
    return (
        <AppContext.Provider value={ appStore.current }>
            <RouterProvider router={ appRoutes }/>
        </AppContext.Provider>
    )
}

export default App
