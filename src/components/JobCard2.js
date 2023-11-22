import React from 'react'
import { Divider, Stack, Chip, Button, CardHeader,Card, Typography } from '@mui/material'

export default function JobCard({job}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardHeader style={{ maxWidth: 345 }}>
              hello world
      </CardHeader>

      <Divider variant="middle" />

      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" />
        <Chip label="success" color="success" />
      </Stack>  
      <Stack direction="row" spacing={1}>
      Nihil tenetur quia ipsum vitae excepturi veniam. Excepturi quam reiciendis quis. In adipisci quibusdam. ...
      </Stack>
      <Stack> 
        <Button variant="contained">Learn More</Button>
      </Stack>     
    </Card>
  )
}
