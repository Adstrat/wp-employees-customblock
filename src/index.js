import "./index.scss"
import { useSelect } from "@wordpress/data";
import { RichText } from "@wordpress/block-editor";

wp.blocks.registerBlockType( "myplugin/employeesblock", {
  title: "Employees Block",
  icon: "admin-users",
  category: "common",
  attributes: {
    country: { type: "string", default: "Germany" },
    title: { type: "string" },
    description: { type: "string" }
  },
  edit: BackendPlaceholder,
  save: function ( props ) {
    return null
  }
} )

function BackendPlaceholder( { attributes, setAttributes } ) {

  // fetches data from Employees Custom Post
  const allEmployees = useSelect( employee => {
    return employee( "core" ).getEntityRecords( "postType", "employee", {
      per_page: -1,
      acf_format: "standard"
    } )
  } )

  if ( allEmployees == undefined ) return <p>Loading...</p>

  // sets attributes to new country value when clicked on navbar
  function handleCountry( country ) {
    setAttributes( { country: country.title.rendered } )
    // console.log(country);
  }

  return (

    <div className="main-employee-container">
      <div className="employee-edit-block backend">
        <RichText
          tagName="h2"
          value={attributes.title}
          onChange={title => setAttributes( { title } )}
          placeholder={( "Title" )}
        />
        <RichText
          tagName="h4"
          className="light"
          value={attributes.description}
          onChange={description => setAttributes( { description } )}
          placeholder={( "Description" )}
        />
      </div>

      <div className="country-employee-container backend">

        {/* Countries Navbar */}
        <ul className="countries">
          {allEmployees.map( ( country, index ) => {
            return (
              <li
                key={index}
                onClick={() => handleCountry( country, index )}
                className={attributes.country == country.title.rendered && "highlighted"}
              >{country.title.rendered}</li>
            )
          } )}
        </ul>

        <div className="employees-container">

          {/* Loops all countries, returns country with conditional && to then map acf data for each employee */}
          {allEmployees.map( country => {
            return (
              attributes.country == country.title.rendered &&
              country.acf.employee.map( ( person, index ) => {
                return (
                  <div className="employee-container">
                    <img className="circle" src={person.image.sizes.thumbnail} alt="" />
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

          {/* Hidden message shown on hover */}
          <div className="hidden-message">
            <h4>This a placeholder image.</h4>
            <h4>To update employee info go to 'Employees' on the left sidebar.</h4>
          </div>

        </div>

      </div>
    </div>
  )
}