import {createStyles, Header, Group, Burger, Container} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import {NavLink} from 'react-router-dom'

const useStyles = createStyles(theme => ({
  header: {
    backgroundColor: '#00B886',
    borderBottom: 0,
    margin: 0
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({variant: 'filled', color: theme.primaryColor}).background,
        0.1
      )
    }
  },
  linkLabel: {
    marginRight: 5
  }
}))

export function HeaderMenu() {
  const links = [
    {link: '/', label: 'Домой'},
    {link: '/games', label: 'Игры'}
  ]
  const [opened, {toggle}] = useDisclosure(false)
  const {classes} = useStyles()

  const items = links.map(link => {
    return (
      <NavLink key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </NavLink>
    )
  })

  return (
    <Header height={56} className={classes.header} mb={4}>
      <Container>
        <div className={classes.inner}>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" color="#fff" />
        </div>
      </Container>
    </Header>
  )
}
