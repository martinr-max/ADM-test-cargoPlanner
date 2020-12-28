import React, { useState} from 'react';
import data from '../../data/shipments.json';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import CompanyList from '../components/companyList/CompanyList';
import CompanyPage from '../components/companyPage/CompanyPage';
import {useHistory} from 'react-router-dom';
import './CargoPlanner.css'
import CargoAppBar from '../../shared/appBar/Appbar';


export default function CargoPlanner() {

    const [companyList, setCompanyList] = useState(data);
    const [error, setError] = useState(false);
    const [choosedCompanyId, setChoosedCompanyId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  
    const url = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';
  
    const history = useHistory();
  
    const onLoadCompanies = async () => {
      try {
        const responseData = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        const companies = await responseData.json();
        setCompanyList(companies);
        setSearchResults([]);
      }
      catch(err) {
        setError(err);
      } 
    }
  
    const onSaveCompanies = (event) => {
      event.preventDefault();
      let filename = "shipments";
      const fileData = JSON.stringify(companyList);
      const blob = new Blob([fileData], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${filename}.json`;
      link.href = url;
      link.click();
    }
  
    const openCompanyDetails = (id) => {
      setChoosedCompanyId(id);
      history.push(`/planner/${id}`)
      setSearchResults([]);
    }
  
    const handleSearchChange = event => {
      event.preventDefault();
      setSearchTerm(event.target.value);
    }
  
    const handleKeyPress = async (event) => {
      if (event.key === "Enter" && searchTerm.length !== 0) {
        const results = companyList.filter(company =>
          company.name.toLowerCase()
          .match(searchTerm)
        );
        setSearchResults(results); 
      }
    }

    return(  
        <React.Fragment>
            <CargoAppBar
             onLoadCompanies={onLoadCompanies}
             handleSearchChange={handleSearchChange}
             searchTerm={searchTerm}
             handleKeyPress={handleKeyPress}
             companyList = {companyList}
             openCompanyDetails={openCompanyDetails}
             onSaveCompanies={onSaveCompanies}
             />
            <Container>
                <Grid  container spacing={1}>
                    <Grid item xs={4} className="companyList">
                        <CompanyList
                         openCompanyDetails={openCompanyDetails}
                         companyList={companyList}
                         searchResults={searchResults} />
                    </Grid>
                    <Grid item xl={6}>
                        {companyList &&
                         !error &&
                         searchResults.length === 0 && companyList.map(com => {
                            return choosedCompanyId === com.id ?
                                <CompanyPage
                                 key={com.id} 
                                 name={com.name}
                                 email={com.email}
                                 boxes={com.boxes}
                                 />
                                : null;
                            })}
                        {searchResults.length !== 0 ? searchResults.map(com => {
                            return  <CompanyPage
                             key={com.id} 
                             name={com.name}
                             email={com.email}
                             boxes={com.boxes}
                             /> }) : null
                            }
                        </Grid>
                    </Grid>
                </Container>
        </React.Fragment>
    );
}
