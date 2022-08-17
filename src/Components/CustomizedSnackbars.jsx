import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(props.message)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.openFunction(false)
  };

  useEffect(() => {
    if(props.open){
        setOpen(true)
    }
    if(props.message){
        setMessage(props.message)
    }
  }, [props])

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
         {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
