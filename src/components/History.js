import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import Navbar from "./Navbar";
import axios from "axios";



const TableListing = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [innerHistoryData, setInnerHistoryData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    getHistoryDetails();
  }, []);

  const getHistoryDetails = () => {
    try {
      let loginUserId = localStorage.getItem("loginUserId");
      const apiUrl = "http://127.0.0.1:5141/api/getHistoryDetails";
      axios
        .post(apiUrl, {
          loginUserId: loginUserId
        })
        .then((response) => {
          console.log("response>>>>>>>>>> ", response.data.result);
          setHistoryData(response.data.result);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const innerHistrory = (index) => {
    try {
      toggleShow();
      setInnerHistoryData(historyData[index]);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }


  return (
    <>

      <Navbar tagName={'History'} />

      <div className="my-4" style={{ height: '75vh' }}>
        <div style={{ float: 'right', padding: '10px' }}>
          <MDBBtn
            size="sm"
            onClick={() => navigate('/productCard')}
          >
            Go To Product List
          </MDBBtn>
        </div>
        <br></br>
        {/* modal Code */}

        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
          <MDBModalDialog size="xl">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>History For Date : {innerHistoryData._id}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>

                <div style={{ height: '60vh', overflow: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Time</th>
                        <th>Item Qty</th>
                        <th>Total Item Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {innerHistoryData.data?.map((idata, index) => (
                        <tr key={idata._id}>
                          <td>{index + 1}</td>
                          <td>{idata.item.item_code}</td>
                          <td>{idata.item.item_name}</td>
                          <td>{idata.item.item_price}</td>
                          <td>{idata.time}</td>
                          <td>{idata.total_item_qty}</td>
                          <td>{idata.total_item_price}</td>
                        </tr>
                      ))}

                    </tbody>
                  </table>



                </div>


              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='primary' onClick={toggleShow}>
                  Claose
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <div style={{ height: '100%', overflow: 'auto' }}>
          {historyData.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Total Item</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((hData, index) => (
                  <tr key={hData._id}>
                    <td>{index + 1}</td>
                    <td>{hData._id}</td>
                    <td>{hData.total_item_qty}</td>
                    <td>{hData.total_item_price}</td>
                    <td>
                      <MDBBtn
                        size="sm"
                        disabled={hData.item_isActive === false}
                        onClick={() => { innerHistrory(index) }}
                      >
                        Check Details
                      </MDBBtn>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          ) : (
            <div className="row d-flex justify-content-center my-4 card-body" >
              <h1>Yo Have No History Till Date</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableListing;
