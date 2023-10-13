import React, { useState } from 'react';
import { Rating } from '@mui/material';
import { Star } from '@mui/icons-material';

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
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
        </div>
    );
};
