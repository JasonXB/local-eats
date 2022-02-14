import React from 'react'
import { Button, Box } from '@mui/material';
import {styles} from "../../styles/auth/verifyPIN"

export default function ReturnHomeBtn() {

  return (
    <Button href="/" variant="outlined" sx={{...styles.formControl, mt:2}}>Return to Homepage</Button>
  )
}
