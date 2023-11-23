import { Alert, Box, Fade, IconButton, InputAdornment, Modal, Stack, Typography } from '@mui/material'
import React,{useContext, useState} from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { ModalContext } from '../App';
import Backdrop from '@mui/material/Backdrop';

import {useForm} from "react-hook-form"
import { VisibilityOff,Visibility, CheckBox } from '@mui/icons-material';
import {FormProvider,FCheckBox,FTextField} from "./form"

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

 

function SignInModal() {
  const open = useContext(ModalContext)[0]
  const handleClose = useContext(ModalContext)[1]
  const setIsLoggedIn = useContext(ModalContext)[2]
  // const {open, handleClose, setIsLoggedIn} = useContext(ModalContext)

  
  const defaultValues = {
    username: "nam",
    password: '123',
    remember: true
  }
  const methods = useForm({defaultValues})
  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: {errors, isSubmitting}
  } = methods
  
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = async data => {
    try {
      if (data.username==="nam" && data.password==="123") {
        setIsLoggedIn(true)
        handleClose()
      }
    }catch{
      setError("afterSubmit", {message: 'Server Response Error'}) 
    }
  }



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
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Sign in
            </Typography>
            
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
              <Stack spacing={3} style={{marginTop:"1rem"}}>
                {!!errors.afterSubmit &&(
                  <Alert severity='error'>{errors.afterSubmit.message} </Alert>
                )}
                <FTextField name="username" label="Username"/>

                <FTextField
                  name="password"
                  label="Password"
                  type={showPassword? "text":"password"}
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={()=> setShowPassword(!showPassword)}
                          onMouseDown={(e)=>e.preventDefault()}
                          edge="end"
                        >
                          {showPassword? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  />
              </Stack>
              <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{my:2}}
              >
                <FCheckBox
                name="remember"
                label="Remember Me"
                />
              </Stack>
              <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
              >
                Log In
              </LoadingButton>

            </FormProvider>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default SignInModal