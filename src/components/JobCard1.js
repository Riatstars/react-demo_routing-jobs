import { Box, Button, Chip, Divider, Paper, Container } from '@mui/material'
import React, {} from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { Link } from 'react-router-dom'

function JobCard({job,isLoggedIn,handleOpen}) {

  
  return (
   <Paper elevation={4} 
   style={{
    display:"flex",
    height:"350px",
    flexDirection:"column",
    justifyContent:"space-between"}}>
    <Box style={{ margin:"1rem"}}>
        <h3 >
        <LinesEllipsis
        text={`${job.city} : ${job.title}`}
        maxLine='1'
        ellipsis='...'
        trimRight
        basedOn='letters'/>
            </h3>
        <div style={{display:"flex",flexWrap:"wrap"}}>
          
        {job.skills?.slice(0,4).map(skill=> {
          return (<Chip size="small" label={skill} />)
        })}

        </div>
        <Divider />

        <p>Salary Range: ${job.salaryLow} - ${job.salaryHigh}</p>
        
        <LinesEllipsis
        text={`Job Description: ${job.description}`}
        maxLine='4    '
        ellipsis='...'
        trimRight
        basedOn='letters'/>
            
           


        

    </Box>
    <Link to={ isLoggedIn? `${job.id}` : "/sign-in" }>
        <Button onClick={handleOpen} style={{ width:"100%"}} variant="contained">Apply</Button>
    </Link>
   </Paper>
  )
}

export default JobCard