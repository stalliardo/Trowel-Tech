import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { closeToast } from '../../features/notifications/notificationSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = () => {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeToast());
  };

  const { isOpen, message, alertType, duration } = useSelector(state => state.notification);

  return (
    <Snackbar open={isOpen} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ mt: "40px" }}>
      <Alert severity={alertType} sx={{ ".MuiAlert-message": { fontSize: "18px" } }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast