import React, {useState,createContext} from 'react'
import './App.css';
import PrimarySearchAppBar from './components/AppBar';
import { Box, Container, Grid, createTheme } from '@mui/material';
import jobs from "./jobs.json"
import JobCard from './components/JobCard1';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@emotion/react';

import { OpenInNew } from '@mui/icons-material';
import { Outlet, redirect } from 'react-router-dom';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export const  ModalContext = createContext()

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [open, setOpen] = useState(false);
    const handleOpen = ()=>setOpen(true);
    const handleClose = () => {
      setOpen(false)
      redirect('/')
    };
  
  return(
  <ThemeProvider theme={theme}>
    <Box sx={{
      bgcolor: "secondary.main"
    }} style={{}}>
    <PrimarySearchAppBar/>
    <Container style={{}} maxWidth="lg">

      <Grid style={{marginTop:"1rem",display: "flex"}} container spacing={2}>
        {jobs.jobs.slice(0,5)?.map(job=> (
        <Grid  key={job.id} item xs={12} md={4}>
          <JobCard  job={job} isLoggedIn={isLoggedIn} handleOpen={handleOpen}/>
        </Grid>
        ))}
        {console.log(jobs)}
        
      </Grid>

      <Grid style={{marginTop:"1rem",display:'flex'}} item xs={12} md={12}>
        <Pagination 
        style={{color:"black",width:"100%",justifyContent:"center", display:"flex"}} 
        count={10}  
        color="secondary" />
      </Grid>
    </Container>

    </Box>
    <ModalContext.Provider value={[open, handleClose]}>
    <Outlet/>

    </ModalContext.Provider>
    

</ThemeProvider>
   
  );
}

export default App;
