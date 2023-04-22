import React from 'react'
import {BinaryGame} from '@/features/binary-game'
import {PageTemplate} from '@/ui'
import {Center} from '@mantine/core'

export const BinaryGamePage = () => {
  return (
    <PageTemplate>
      <Center>
        <BinaryGame />
      </Center>
    </PageTemplate>
  )
}
