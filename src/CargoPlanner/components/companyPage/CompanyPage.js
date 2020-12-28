import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './CompanyPage.css'

export default function CompanyPage({
    name,
    email,
    boxes
  }) {
  
    const [inputBoxes, setInputBoxes] = useState(boxes);

    const handleChange = (event) => {
      setInputBoxes(event.target.value);
    }  

    function findCargo(string) {
      if (string === null) {
        return;
      } else {
        string = string.split(",");
        let sum = 0;
        let cargo = 0;
        for (let i = 0; i < string.length; i++) {
          sum += parseFloat(string[i]);
        }
        cargo = Math.ceil(sum / 10);
        return cargo;
      }
    }
  
    const neededCargoBays = findCargo(inputBoxes);

    return(
        <div className="CompanyContainer">
            <div className="companyName">
                <Typography variant="h4" >
                    {name}
                </Typography>
                <Typography variant="subtitle1">
                    {email}
                </Typography>
            </div>
                <Typography variant="body1" className="cargoInfo">
                    Number of required cargo bays: <strong> {neededCargoBays} </strong> 
                </Typography>
                <TextField
                 label="Cargo boxes"
                 onChange={handleChange}
                 value={inputBoxes || ""}
                />
        </div>
    );
}