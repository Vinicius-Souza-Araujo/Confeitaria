import React from 'react'
import { useState } from 'react'
import { Rating, Box } from '@mui/material'
import { Star } from '@mui/icons-material'


const labels = {
    0: 'Péssimo',
    0.5: 'teste',
    1: 'Ruim',
    1.5: 'teste',
    2:'Regular',
    2.5: 'teste',
    3:'Bom',
    3.5:'teste',
    4: 'Ótimo',
    4.5: 'test',
    5: 'Excelente' 
}

export const Estrelas = () => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

  return (
    <div><h1>estrelas</h1>
    <Box>
       <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={(event, newValue)=>{setValue(newValue)}}
            onChangeActive={(event, newHover) => {setHover(newHover)}}
            emptyIcon={<Star style={{ opacity: 0.55 }} />}
       />

    </Box>{value !== null &&(
        <Box sx={{ ml: 2 }}>{labels[hover != -1 ? hover:value]}</Box>
    )}
    </div>
 
  )
}
