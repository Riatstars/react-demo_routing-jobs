import { Box, Chip, Divider, Fade, Modal, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Backdrop from '@mui/material/Backdrop';
import { ModalContext } from '../App';
import { useParams } from 'react-router-dom';
import data from "../jobs.json"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function getJobInfo (id){
  return data.jobs?.find((job)=>job.id === id)
 }
 function getCompanyInfo(id){
  return data.companies?.find((company)=> company.id === id)
 }
 

function JobInfoModal() {
    const open = useContext(ModalContext)[0]
    const handleClose = useContext(ModalContext)[1]
    let params = useParams()
    const jobInfo = getJobInfo(params.jobId)
    const companyInfo = getCompanyInfo(jobInfo.companyId)

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {jobInfo.city}: {jobInfo.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {jobInfo.description}
            </Typography>
            <Divider style={{margin: "1rem"}} />
            {jobInfo.skills?.slice(0,4).map(skill=> {
          return (<Chip key={skill} size="small" label={skill} />)
        })}
            <Divider style={{margin: "1rem"}} />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Company: {companyInfo.name}
              
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Hiring Positions:{companyInfo.numOfJobs}
              
            </Typography>

          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default JobInfoModal