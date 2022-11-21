import React from 'react'

import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { Box } from '@mui/system'

const SelectMenu = ({value, label, name, handleChange, menuItems, defaultValue = [], required, styles} ) => {
    return (
        <Box sx={{ minWidth: 120, ...styles }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                
                    defaultValue={defaultValue}
                    value={value}
                    label={label}
                    name={name}
                    onChange={handleChange}
                    required={required}
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