import React from 'react';
import { useState } from 'react';
import { Rating, Box } from '@mui/material';
import { Star } from '@mui/icons-material';

const labels = {
    0: 'Péssimo',
    0.5: 'teste',
    1: 'Ruim',
    1.5: 'Razoavelmente ruim',
    2: 'Regular',
    2.5: 'teste',
    3: 'Bom',
    3.5: 'Razoavelmente Bom',
    4: 'Ótimo',
    4.5: 'test',
    5: 'Excelente'
};

export const Estrelas = (props) => {
    const [hover, setHover] = useState(-1);

    return (
        <div>

                <Rating
                    name="hover-feedback"
                    value={props.valor}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        props.onChange(newValue); 
                    }}
                    
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit"/>}
                />
            {props.valor !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : props.valor]}</Box>
            )}
        </div>
    );
};
