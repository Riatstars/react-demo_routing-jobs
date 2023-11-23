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

    const jobsNumber = jobs.jobs.length

    const [paginationControl, setPaginationControl] = useState({
      jobsPerPage: 9,
      currentPage: 1
    })
    const pagination={
      totalPages: Math.ceil(jobsNumber/paginationControl.jobsPerPage),
      from: (paginationControl.currentPage-1)*paginationControl.jobsPerPage,
      to: ((paginationControl.currentPage)*paginationControl.jobsPerPage > jobsNumber)? jobsNumber :(paginationControl.currentPage)*paginationControl.jobsPerPage
    }
    const handlePagination = (event,value)=>{
      setPaginationControl({...paginationControl,currentPage: value})
    }

  return(
  <ThemeProvider theme={theme}>
    <Box sx={{
      bgcolor: "secondary.main"
    }} style={{}}>
    <PrimarySearchAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Container style={{}} maxWidth="lg">

      <Grid style={{marginTop:"1rem",display: "flex"}} container spacing={2}>
        {jobs.jobs.slice(pagination.from,pagination.to)?.map(job=> (
        <Grid  key={job.id} item xs={12} md={4}>
          <JobCard  job={job} isLoggedIn={isLoggedIn} handleOpen={handleOpen}/>
        </Grid>
        ))}
        
      </Grid>

      <Grid style={{marginTop:"1rem",display:'flex'}} item xs={12} md={12}>
        <Pagination 
        style={{color:"black",width:"100%",justifyContent:"center", display:"flex"}} 
        count={pagination.totalPages}  
        page={paginationControl.currentPage}
        onChange={handlePagination}
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
