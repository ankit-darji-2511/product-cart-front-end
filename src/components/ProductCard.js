import React, { useState, useEffect } from "react";
import axios from '../axios';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput, MDBContainer, MDBRow, MDBCol, MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { initialUpdateCart, updateCart } from "../features/cartSlice";
import Navbar from "./Navbar";

const History = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [basicModal, setBasicModal] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    itemPrice: 0,
    itemIsActive: false,
    categoryId: '',
    categoryCode: 'Select Category'
  });


  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    getItemList('initial');
    getUserAddedAllCartItemCount();
    getCategoryList();
  }, []);

  const getItemList = (from, category_id) => {
    try {
      let searchObj = {
        category_id: '',
        minPrice: '',
        maxPrice: ''
      }
      if (from === 'initial' || from === 'refresh') {
        setCategoryId('');
        setMinPrice('');
        setMaxPrice('');
      }
      if (from === 'category') {
        setCategoryId(category_id);
        searchObj.category_id = category_id;
        searchObj.minPrice = minPrice;
        searchObj.maxPrice = maxPrice;
      }
      else if (from === 'priceFilter') {
        searchObj.category_id = categoryId;
        searchObj.minPrice = minPrice;
        searchObj.maxPrice = maxPrice;
      }


      const apiUrl = "/api/getItemList";
      axios
        .post(apiUrl, searchObj)
        .then((response) => {
          if (response.data.status === 200) {
            setItems(response.data.result);
          }
          else{
            setItems([]);
          }
          
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getUserAddedAllCartItemCount = () => {
    try {
      let user_id = localStorage.getItem("loginUserId");
      const apiUrl = "/api/getUserAddedAllCartItemCount";

      axios
        .post(apiUrl, { user_id: user_id })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(initialUpdateCart(response.data.result[0].total_item_qty));
          }
          else {
            dispatch(initialUpdateCart(0));
          }

        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  const getCategoryList = () => {
    try {
      const apiUrl = "/api/getCategoryList";

      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data.status === 200) {
            setCategory(response.data.result);
          }
          else{
            setCategory([]);
          }
          
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  const addToCart = (item_id) => {
    try {
      let loginUserId = localStorage.getItem("loginUserId");
      const apiUrl = "/api/addToCart";
      axios
        .post(apiUrl, {
          item_id: item_id,
          loginUserId: loginUserId,
        })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(updateCart({
              updateCount: 1,
              paymentUpdate: false
            }))
          } else {
            alert("Item not Added To Cart");
          }
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }


  const inputStyle = {
    width: '120px',
    height: '30px',
    boxShadow: '0 4px 9px -4px #fbfbfb',
    padding: '10px',
    border: '1px solid gray',
    borderRadius: '15px',
    textAlign: 'center'
  }

  const buttonStyle = {
    width: '70px',
    height: '30px',
    backgroundColor: 'rgb(58 104 120)',
    boxShadow: '0 4px 9px -4px #fbfbfb',
    color: 'white',
    border: '1px solid #f2eaea',
    borderRadius: '10px',
    textAlign: 'center'
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleDropdownChange = (categoryId, categoryCode) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryId, categoryCode
    }));
  };

  const openAddItemModal = () => {
    formData.itemCode = ''
    formData.itemName = ''
    formData.itemPrice = 0
    formData.itemIsActive = ''
    formData.categoryId = ''
    formData.categoryCode = 'Select Category'
    toggleShow();
  }

  const addItemToDb = () => {
    try {
      if (formData.itemCode === '' || formData.itemName === '' || formData.itemPrice === '' || formData.categoryId === '') {
        alert('Please fill in all required fields.');
      }
      else {

        const apiUrl = "/api/addItem";
        axios
          .post(apiUrl, formData)
          .then((response) => {
            alert('Your Product Added Successfully');
            getItemList('initial');
            toggleShow();
          })
          .catch((error) => {
            console.error("Error fetching items:", error);
          });

      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <>
      <Navbar tagName={'Product List'} />
      <div className="my-4" style={{ height: '75vh' }}>
        <div style={{ display: "flex" }}>
          <MDBDropdown className="mx-3">
            <MDBDropdownToggle color="light">Category list</MDBDropdownToggle>
            <MDBDropdownMenu>
              {category.map((cat, index) => (
                <MDBDropdownItem
                  key={index}
                  link
                  onClick={() => { getItemList('category', cat._id) }}
                >
                  {cat.category_code}
                </MDBDropdownItem>
              ))}
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBBtn floating tag="a" className="mx-2" onClick={() => getItemList('refresh')}>
            <MDBIcon fas icon="refresh" />
          </MDBBtn>

          <MDBBtn onClick={openAddItemModal} size='sm'>Add Item</MDBBtn>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog size="lg">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Add Product</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol md="4">
                        <label htmlFor="itemCode">Item Code:</label>
                        <MDBInput
                          type="text"
                          id="itemCode"
                          name="itemCode"
                          value={formData.itemCode}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <label htmlFor="itemName">Item Name:</label>
                        <MDBInput
                          type="text"
                          id="itemName"
                          name="itemName"
                          value={formData.itemName}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <label htmlFor="itemPrice">Item Price:</label>
                        <MDBInput
                          type="number"
                          id="itemPrice"
                          name="itemPrice"
                          value={formData.itemPrice}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-4">
                      <MDBCol md="4">
                        <label>Selected Category:</label>
                        <MDBDropdown>
                          <MDBDropdownToggle color="secondary">
                            {formData.categoryCode}
                          </MDBDropdownToggle>

                          <MDBDropdownMenu>
                            {category.map((cat, index) => (
                              <MDBDropdownItem
                                key={index}
                                link
                                onClick={() => handleDropdownChange(cat._id, cat.category_code)}
                              >
                                {cat.category_code}
                              </MDBDropdownItem>
                            ))}
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBCol>
                      <MDBCol md="4">
                        <label>Item Is Active:</label>
                        <MDBSwitch
                          name="itemIsActive"
                          checked={formData.itemIsActive}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color='danger' onClick={toggleShow}>
                    Cancle
                  </MDBBtn>
                  <MDBBtn onClick={(() => addItemToDb())}>Add</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          <div style={{ display: "flex", marginTop: "10px", marginLeft: "auto" }}>
            <div className="mx-5">
              <label>Price Filter : </label>
              &nbsp;
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={inputStyle}
              />
              &nbsp;
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={inputStyle}
              />
              &nbsp;
              <button style={buttonStyle} onClick={() => getItemList('priceFilter')}>Apply</button>
            </div>

          </div>
        </div>

        <div style={{ height: '100%', overflow: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Item Price</th>
                <th>Item Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.item_code}</td>
                  <td>{item.item_name}</td>
                  <td>{item.category.category_code}</td>
                  <td>{item.item_price}</td>
                  <td>{item.item_isActive === true ? "ACTIVE" : "DEACTIVE"}</td>
                  <td>
                    <MDBBtn
                      size="sm"
                      disabled={item.item_isActive === false}
                      onClick={() => addToCart(item._id)}
                    >
                      Add to Cart
                    </MDBBtn>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>


        </div>
      </div>


      {/* // itemsPerPage, totalItems, currentPage, paginate */}
    </>
  );
};


export default History;
