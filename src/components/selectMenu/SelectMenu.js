import React from 'react'

import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { Box } from '@mui/system'

const SelectMenu = ({value, label, name, handleChange, menuItems = []} ) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    name={name}
                    onChange={handleChange}
                >
                    {menuItems.map((item, index) => (
                        <MenuItem value={item} key={index}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectMenu