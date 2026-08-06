import { useTheme } from '@emotion/react'
import { Button, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputBaseClasses } from '@mui/material/InputBase';
import { useForm } from "react-hook-form"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import SendIcon from '@mui/icons-material/Send';

const Account = () => {
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const [loading, setLoading] = useState(false);
const[account,setAccount]=useState("Create")
  const [showPassword, setShowPassword] = React.useState(false);

  const outlinedPasswordId = React.useId();


const onSubmit = async (data) => {
  setLoading(true);

  console.log(data);

  // Simulate API request
  await new Promise((resolve) => setTimeout(resolve, 5000));

  setLoading(false);
};

 const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };



  return (
    <div className='min-h-screen flex items-center gap-5 flex-col justify-center'>
        <div>
            <img className='w-30 scale-150' src="/animatedLogo.gif" alt="" />
        </div>
      <div className='gap-2 flex flex-col'>
        <div className='w-full flex justify-center'>
{
  account === "Create" ?  <h1 className='text-4xl'>Create Account</h1>    : <h1 className='text-4xl'>Login To Your Account</h1>
}
       
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-120 flex flex-col gap-4' >
           {
            account === "Create" ? 
            <div>
 <TextField
            label="Enter First Name"
  variant="outlined"
  error={!!errors.firstName}
  helperText={errors.firstName?.message}
   {...register("firstName", {
    required: "First Name is required",
  
  })}
           className='w-full' id="outlined-basic" label="First Name" variant="outlined" /> 
           <TextField
            label="Enter First Name"
  variant="outlined"
  error={!!errors.lastName}
  helperText={errors.lastName?.message}
   {...register("lastName", {
    required: "Last Name is required",
  
  })}
           className='w-full' id="outlined-basic" label="Last Name" variant="outlined" /> 
            </div> 
              : null
           }
          
           
 <TextField 
   label="Enter Username"
  variant="outlined"
  error={!!errors.username}
  helperText={errors.username?.message}
   {...register("username", {
    required: "Username is required",
    pattern: {
      value: /^[a-z0-9]+$/,
      message:
        "Username should not contain uppercase letters or special characters.",
    },
  })} id="outlined-suffix-shrink" label="Enter Username" variant="outlined" slotProps={{   input: { endAdornment: ( <InputAdornment position="end" sx={{ opacity: 1,fontWeight:500,pointerEvents: 'none', [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {opacity: 1, },  }}> @smail.com </InputAdornment> ), },}}/> 
 <FormControl fullWidth error={!!errors.password}>
  <InputLabel htmlFor="password">Password</InputLabel>

  <OutlinedInput
    id="password"
    type={showPassword ? "text" : "password"}
    label="Password"
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long.",
      },
    })}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
  />

  <FormHelperText>
    {errors.password?.message}
  </FormHelperText>
</FormControl>
<div>
  <div>
    
  </div>
</div>
          <Button
          type="submit"
  endIcon={<SendIcon />}
  loading={loading}
  loadingPosition="end"
  variant="contained"
        >
          Create Account
        </Button>
 
        </form>
        {
          account === "Create" ?  <div className='flex gap-2'>
          <p>Already Have Account?</p>
          <p onClick={()=>setAccount("Login")} className='font-bold cursor-pointer' >
          
            Login Here
            </p>
        </div> :  <div className='flex gap-2'>
          <p>Don't Have Account?</p>
          <p onClick={()=>setAccount("Create")} className='font-bold cursor-pointer' >
          
            Create Account
            </p>
        </div>
        }
       
      </div>
    </div>
  )
}

export default Account
