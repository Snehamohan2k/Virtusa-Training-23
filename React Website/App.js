import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";
import './App.css';
import bg from './images/lib_bg.jpg';
function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(10);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");
  const [startcount, setstartcount] = useState(false);
  const [subjValue, setSubjValue] = useState("");
  const [AuthorValue, setAuthorOptions] = useState("");
  const [TitleValue, setTitleOptions] = useState("");
  const sortOptions = ["Title", "Author", "Subject", "PublishDate", "Price", "Availability"];
  const subjOptions = ["Fiction", "Horror", "Fantasy", "Suspense", "Mystery", "Romance", "Motivation"];
  const AuthorOptions = ["James Camal", "Bimal Jalal", "	Amish Tripathi", "James Patterson", "Dan Brown", "Preeti Shenoy", "Sahitya Akademi"];
  const TitleOptions = ["	The Funny Animals", "The Immortals of Meluha", "Kingdom of the Cursed", "The Lost Symbol", "	The India Story", "The Oath of the Vayuputras", "Kingdom of the Cursed"];
  useEffect(() => {
    loadUsersData(0, 10, 0);
  }, []);
  const loadUsersData = async (start, end, increase, optType = null, filterOrSortValue) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        setSubjValue("");
        setAuthorOptions("");
        setTitleOptions("");
        return await axios.get(`http://localhost:5000/users?q=${value}&_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
          setValue("");
          })
          .catch((err) => console.log(err));
        case "sort":
          setOperation(optType);
          setSortFilterValue(filterOrSortValue);
          return await axios.get(`http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
      .then((response) => {
        setData(response.data);
        setCurrentPage(currentPage + increase);
      })
      .catch((err) => console.log(err));
      default:
        return await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data)
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    };
  }

  console.log("data", data);

  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("")
    loadUsersData(0, 10, 0);

  };

  const handleSearch = (e) => {
     e.preventDefault();
    console.log(value);
    loadUsersData(0, 10, 0, "search")
     };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUsersData(0,10,0,"sort",value);
    // return await axios.get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleFilter = async (value) => {
    return await axios.get(`http://localhost:5000/users?Availability=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));

  };

  const handleSubject = async (e) => {
    let value = e.target.value;
    setSubjValue(value);
    return await axios.get(`http://localhost:5000/users?Subject=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));

  };
  const handleAuthor = async (e) => {
    let value = e.target.value;
    setAuthorOptions(value);
    return await axios.get(`http://localhost:5000/users?Author=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));

  };
  const handleTitle = async (e) => {
    let value = e.target.value;
    setTitleOptions(value);
    return await axios.get(`http://localhost:5000/users?Title=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));

  };

  const renderPagination = () => {
    if(data.length<10&&currentPage===0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => {
              loadUsersData(10, 20, 1, operation,sortFilterValue);
              setstartcount(true)
            }
            }>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
    else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">

          <MDBPaginationItem>
            <MDBBtn onClick={() => { loadUsersData((currentPage - 1) * 10, currentPage * 10, -1, operation,sortFilterValue);
            setstartcount(false) 
            }
            }>
              Previous
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => { loadUsersData((currentPage + 1) * 10, (currentPage + 2) * 10, 1, operation, sortFilterValue);
             setstartcount(true)
             }
            }>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }

    else {
      return (
        <MDBPagination className="mb-0">

          <MDBPaginationItem>
            <MDBBtn onClick={() => { loadUsersData((currentPage - 1) * 10, currentPage * 10, -1, operation,sortFilterValue);  setstartcount(false) 
            }
            }>
              Previous
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination >
      );
    }
  };
  return (

    <div>
      <img src={bg} className=" position-absolute bg-image" ></img>
      <MDBContainer>
        <br></br>
        <h1 className="text-center"><b>Library Management System</b></h1>
        <form style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
          className="d-flex input-group w-auto"
          onSubmit={handleSearch}
        >
          <input type="text" className="form-control" placeholder="Search Name" value={value}  onChange={(e) => 
           {setValue(e.target.value);
          // loadUsersData(0,10,0,"search");
          }}  />

          <MDBBtn type="submit" color="dark">Search</MDBBtn>
          <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>Reset</MDBBtn>

        </form>

        <MDBCol size="8" className="d-flex flex-column align-items-start position-absolute">
          <h4><b>Sort By:</b></h4>
          <select className="selection" style={{
           color: "black", width: "25%", borderRadius: "2px", height: "35px"
          }}
            onChange={handleSort}
            value={sortValue}
          >
            <option >Please Select value</option>
            {
              sortOptions.map((item, index) => (
                <option value={item} key={index}>{item}</option>
              ))
            }
          </select>
        </MDBCol>
        <MDBCol size="12" className="d-flex flex-column align-items-end" >
          <h4 className="align-self-end" ><b>Filter By Availability:</b></h4>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => handleFilter("Available")}>Available</MDBBtn>
            <MDBBtn color="danger" style={{ marginLeft: "2px" }} onClick={() => handleFilter("UnAvailable")}>UnAvailable</MDBBtn>
          </MDBBtnGroup>

        </MDBCol>

        <div style={{ marginTop: "30px" }}>

          <MDBRow className="table-rounded">
            <MDBCol size="12" className="table-rounded">
              <MDBTable  class="table">
                <MDBTableHead dark>
                  <tr>
                    <th scope="col"><h5>S.No</h5></th>
                    <th scope="col"><h5>Title</h5>
                               <select style={{
                        color:"green", width: "60%", borderRadius: "8px", height: "35px"
                      }}

                        onChange={handleTitle}
                        value={TitleValue}>

                        <option><b>Select Options</b></option>
                        {
                          TitleOptions.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                          ))    
                        }
                      </select>
                    </th>
                    <th scope="col"><h5>Author</h5>
                      <select style={{
                       color:"green", width: "70%", borderRadius: "8px", height: "35px"
                      }}

                        onChange={handleAuthor}
                        value={AuthorValue}>

                        <option>Select Options</option>
                        {
                          AuthorOptions.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                          ))
                        }
                      </select>
                    </th>
                    <th scope="col"><h5>Subject</h5>
                      <select style={{
                       color:"green", width: "80%", borderRadius: "8px", height: "35px"
                      }}

                        onChange={handleSubject}
                        value={subjValue}>

                        <option>Select Options</option>
                        {
                          subjOptions.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                          ))
                        }
                      </select>
                    </th>
                    <th scope="col"><h5>Publish-Date</h5></th>
                    <th scope="col"><h5>Price</h5></th>
                    <th scope="col"><h5>Availability</h5></th>
                  </tr>

                </MDBTableHead>
                {data.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">No data found</td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  data.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr >
                        <th scope="row">{startcount ? index + 11 : index + 1}</th>
                        <td>{item.Title}</td>
                        <td>{item.Author}</td>
                        <td>{item.Subject}</td>
                        <td>{item.PublishDate}</td>
                        <td>{item.Price}</td>
                        <td>{item.Availability}</td>

                      </tr>
                    </MDBTableBody>
                  ))
                )
                }
              </MDBTable>
            </MDBCol>
          </MDBRow>
          <div
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "250px",
              alignContent: "center",
            }}
          >
            {renderPagination()}
          </div>
        </div>
        
        <br></br>
      </MDBContainer>

    </div>
  );
}

export default App;
