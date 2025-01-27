

//Add by two numbers

import React  , {useState} from 'react';

const AddNumbers = () => {

    const [num , setNum] =  useState(0);

    const addNumbers = () => {
        setNum(num+2);
    }

    return (
        <div>
           <h1>
            Number : {num};
            <button 
            onClick={addNumbers} 
            >Add</button>
           </h1>
        </div>
    )
}

export default AddNumbers;
