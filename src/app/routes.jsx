import {createBrowserRouter} from 'react-router-dom'
import {HomePage, StonesGamePage, GamesPage, BinaryGamePage} from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/games',
    element: <GamesPage />
  },
  {
    path: '/stones-game',
    element: <StonesGamePage />
  },
  {
    path: '/binary-game',
    element: <BinaryGamePage />
  }
])
