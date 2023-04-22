import React from 'react'
import ReactDOM from 'react-dom/client'
import {MantineProvider} from '@mantine/core'
import {RouterProvider} from 'react-router-dom'
import {router} from '@/app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>
)
