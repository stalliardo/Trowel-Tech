import React from 'react';
import Typography from '@mui/material/Typography';

const GridLabel = ({ text }) => {
    return <Typography component="label" sx={{ fontSize: "18px" }}>{text}</Typography>
  }

export default GridLabel;