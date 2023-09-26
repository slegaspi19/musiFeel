import React from 'react';
import StarIcon from '@material-ui/icons/Star'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import StarOutlineIcon from '@material-ui/icons/StarOutline'

const AverageReview = ({value}: any) => {
    return (
        <div>
            {value >= 1 ? (
                <StarIcon />
            ) : value >= .5 ? (
                <StarHalfIcon/>
            ) : (
                <StarOutlineIcon/>
            )}
            {value >= 2 ? (
                <StarIcon />
            ) : value >= 1.5 ? (
                <StarHalfIcon/>
            ) : (
                <StarOutlineIcon/>
            )}
            {value >= 3 ? (
                <StarIcon />
            ) : value >= 2.5 ? (
                <StarHalfIcon/>
            ) : (
                <StarOutlineIcon/>
            )}
            {value >= 4 ? (
                <StarIcon />
            ) : value >= 3.5 ? (
                <StarHalfIcon/>
            ) : (
                <StarOutlineIcon/>
            )}
            {value >= 5 ? (
                <StarIcon />
            ) : value >= 4.5 ? (
                <StarHalfIcon/>
            ) : (
                <StarOutlineIcon/>
            )}
        </div>
    );
};

export default AverageReview;