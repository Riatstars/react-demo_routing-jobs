import React, {useState,createContext} from 'react'
import './App.css';
import PrimarySearchAppBar from './components/AppBar';
import { Box, Container, Grid, createTheme } from '@mui/material';
import jobs from "./jobs.json"
import JobCard from './components/JobCard1';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';




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
      navigate("/",{replace:true})
    };

    const navigate = useNavigate();
  
  return(
  <ThemeProvider theme={theme}>
    <Box sx={{
      bgcolor: "secondary.main"
    }} style={{}}>
    <PrimarySearchAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Container style={{}} maxWidth="lg">

      <Grid style={{marginTop:"1rem",display: "flex"}} container spacing={2}>
        {jobs.jobs.slice(0,6)?.map(job=> (
        <Grid  key={job.id} item xs={12} md={4}>
          <JobCard  job={job} isLoggedIn={isLoggedIn} handleOpen={handleOpen}/>
        </Grid>
        ))}
        
      </Grid>

      <Grid style={{marginTop:"1rem",display:'flex'}} item xs={12} md={12}>
        <Pagination 
        style={{color:"black",width:"100%",justifyContent:"center", display:"flex"}} 
        count={10}  
        color="secondary" />
      </Grid>
    </Container>

    </Box>
    <ModalContext.Provider value={[open, handleClose, setIsLoggedIn]}>
      <Outlet/>
    </ModalContext.Provider>
    

</ThemeProvider>
   
  );
}

export default App;
