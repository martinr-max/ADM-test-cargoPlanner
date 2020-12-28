import React from 'react';
import Typography from '@material-ui/core/Typography';
import './CompanyList.css';
import Button from '@material-ui/core/Button';


export default function CompanyList({companyList, openCompanyDetails}) {

    if (companyList.length === 0) {
        return (
          <Typography variant="h5">
              Please load a companies!
          </Typography>
        );
    }
    return(
        <div className="companyListContainer">
            <Typography variant="h5">
                Companies
            </Typography>
            { companyList.map(company => {
                return <li className="company_name" key={company.id}>
                    <Button
                     size="small"
                     onClick={e => openCompanyDetails(company.id)}
                     style={{justifyContent: "flex-start"}}
                     >
                        {company.name}
                    </Button>
                    </li>
              })
            }       
        </div>
    );
}