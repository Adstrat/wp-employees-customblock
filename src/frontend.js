import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.scss";

const divsToUpdate = document.querySelectorAll( '.employee-update-me' );

divsToUpdate.forEach( div => {
  const data = JSON.parse( div.querySelector( "pre" ).innerHTML );
  ReactDOM.render( <FrontendEmployeesBlock title={data.title} description={data.description} />, div )
  div.classList.remove( "employee-update-me" )
} )

function FrontendEmployeesBlock( props ) {
  const [countries, setCountries] = useState( [] );
  const [selectedCountry, setSelectedCountry] = useState( "Germany" );

  useEffect( () => {
    fetch( 'http://provegcustomersite.local/wp-json/wp/v2/employee?acf_format=standard' )
      .then( response => {
        return response.json();
      } ).then( countries => {
        setCountries( countries );
        console.log( countries );
      } )
  }, [] );

  function handleCountry( country ) {
    setSelectedCountry( country.title.rendered )
  }

  return (
    <div className="main-employee-container">

      {/* Countries Navbar */}
      <ul className="countries">
        {countries.map( ( country, index ) => (
          <li
            key={index}
            onClick={() => handleCountry( country, index )}
            className={selectedCountry == country.title.rendered && "highlighted"}
          >{country.title.rendered}</li>
        ) )}
      </ul>

      <div className="employees-container">
        {/* Loops all countries, returns country with conditional && to then map acf data for each employee */}
        {countries.map( country => {
          return (
            selectedCountry == country.title.rendered &&
            country.acf.employee.map( ( person, index ) => {
              return (
                <div className="employee-container">
                  <img className="circle" src={person.image.sizes.thumbnail} alt="image of {person.name}" />
                  <div>
                    <h5 key={index}>{person.name}</h5>
                    <h6 className="light">{person.job_title}</h6>
                    <h6 className="lighter">{person.city}</h6>
                  </div>
                </div>
              )
            } )
          )
        } )}
      </div>

    </div>
  )
} 
