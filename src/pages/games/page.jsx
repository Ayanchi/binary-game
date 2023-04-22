import React from 'react'
import {Center} from '@mantine/core'
import {PageTemplate} from '../../ui'
import {NavLink} from 'react-router-dom'

export const GamesPage = () => {
  return (
    <PageTemplate>
      <Center>
        <NavLink to="/binary-game">Двоичная игра</NavLink>
      </Center>
    </PageTemplate>
  )
}
