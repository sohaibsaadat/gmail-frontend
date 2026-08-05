import { useTheme } from '@emotion/react'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputBaseClasses } from '@mui/material/InputBase';


const Account = () => {
    const [account,setAccount]=useState()
  return (
    <div className='min-h-screen flex items-center gap-5 flex-col justify-center'>
        <div>
            <img className='w-30 scale-150' src="/animatedLogo.gif" alt="" />
        </div>
      <div className='gap-2 flex flex-col'>
        <div className='w-full flex justify-center'>
        <h1 className='text-4xl'>Create Account</h1>
        </div>
        <div className='w-120 flex flex-col gap-4' >
           <TextField className='w-full' id="outlined-basic" label="First Name" variant="outlined" /> 
           <TextField className='w-full' id="outlined-basic" label="Last Name" variant="outlined" /> 
 <TextField id="outlined-suffix-shrink" label="Enter Username" variant="outlined" slotProps={{   input: { endAdornment: ( <InputAdornment position="end" sx={{ opacity: 1,fontWeight:500,pointerEvents: 'none', [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {opacity: 1, },  }}> @smail.com </InputAdornment> ), },}}/>        </div>
      </div>
    </div>
  )
}

export default Account
