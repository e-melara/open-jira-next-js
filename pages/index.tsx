import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import type { NextPage } from 'next'

import { Layout } from '../components/layout'
import { EntryList } from '../components/ui/Entry/EntryList'
import { NewEntry } from '../components/ui/Entry/NewEntry'

const HomePage: NextPage = () => {
  return (
    <Layout title='OpenJira'>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pendientes' />
            <CardContent>
              {/* Agregar una nueva entrada */}
              <NewEntry />
              {/* Listado de las entradas */}
              <EntryList status='pending' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='En progreso' />
            <CardContent>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completadas' />
            <CardContent>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList status='finished' />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
