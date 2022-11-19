import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CircularIndicator from '../../loadingIndicator/CircularIndicator';

const ExtendableModal = (props) => {

    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
        props.modalClosed()
    }

   
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: "70%", md: "40%" },
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                    minHeight: "400px"
                }}>
                    <Typography variant="h4" align="center" mb="20px">{props.title}</Typography>

                    {isLoading ? <CircularIndicator style={{ mt: "20px" }} /> :
                        props.children
                    }
                </Box>
            </Modal>
        </div>
    )
};

export default ExtendableModal;