import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { updateCart } from "../features/cartSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom'
import { MDBBtn } from "mdb-react-ui-kit";

import {
  removeItem,
  addQty,
  removeQty,
  fetchData
} from "../features/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { cart, loading, error, totalQuantity, totalPrice } = useSelector((state) => state.allCart);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const addQty = (data) => {
    try {
      let loginUserId = localStorage.getItem("loginUserId");
      const apiUrl = "http://127.0.0.1:5141/api/addRemoveCartQty";
      axios
        .post(apiUrl, {
          data: data,
          action: "add",
          loginUserId: loginUserId,
        })
        .then((response) => {
          if (response.data.status == 200) {
            console.log("Item Qty Added Successfully");

          } else {
            console.log("Isseu in Item Add");
          }
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }

  }

  const removeQty = (data) => {
    try {
      let loginUserId = localStorage.getItem("loginUserId");
      const apiUrl = "http://127.0.0.1:5141/api/addRemoveCartQty";
      axios
        .post(apiUrl, {
          data: data,
          action: "remove",
          loginUserId: loginUserId,
        })
        .then((response) => {
          if (response.data.status == 200) {
            console.log("Item Qty Removed Successfully");
          }
          else{
            console.log("Issue In Item Remove");
          }
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }

  }

  const removeItem = (data) => {
    try {
      let loginUserId = localStorage.getItem("loginUserId");
      const apiUrl = "http://127.0.0.1:5141/api/deleteItem";
      axios
        .post(apiUrl, {
          data: data,
          loginUserId: loginUserId,
        })
        .then((response) => {
          console.log("response>>> ", response);
          if (response.data.status == 200) {
            console.log("Item Deleted Successfully");
          }
          else{
            console.log("Issue In Item Delete");
          }
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }

  }

  const paymentFunction = () => {
    try {
      const apiUrl = "http://127.0.0.1:5141/api/paymentApi";

      axios
        .post(apiUrl, { cart: cart })
        .then((response) => {
          console.log("response >>> ", response);
          dispatch(updateCart({
            paymentUpdate: true
          }))


        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.log("error in payment API call : ", error);
    }
  }

  return (

    <>
      <Navbar tagName={'Your Cart'} />
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8" style={{ textAlign: "center" }}>
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h1 className="mb-0">You Have {cart.length} Items in Your Cart</h1>
                </div>
                <div className="card-body" style={{ height: '53vh', overflow: 'auto' }}>
                  {cart.length > 0 ? (
                    <div>
                      {cart.map((data, index) => (
                        <div key={index} className="row">

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{data.item.item_code}</strong> &emsp;
                              <strong>{data.item.item_name}</strong>
                            </p>

                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-1 mb-2"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              onClick={() => {
                                removeItem(data);
                                dispatch(fetchData())
                              }}  
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                              disabled={data.item_qty == 1}
                                className="btn btn-primary px-3 me-2"
                                onClick={() => {
                                  removeQty(data)
                                  dispatch(fetchData())
                                }

                                }
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="form-outline">
                                <p className="text-start text-md-center" style={{ margin: 0 }}>
                                  <strong>Item Price : {data.item.item_price}</strong> <br></br>
                                  <strong>Current Qty : {data.item_qty}</strong>
                                </p>
                              </div>

                              <button
                                className="btn btn-primary px-3 ms-2"
                                onClick={() => {
                                  addQty(data)
                                  dispatch(fetchData())
                                }

                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>


                          </div>
                          <hr className="my-4" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h1>Ohh !! Your Cart is Empty</h1>
                      <br></br>
                      <h1>You can add Products from Product List</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h2 className="mb-0">Summary</h2>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{totalQuantity}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>{totalPrice}</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => paymentFunction()}
                    disabled={totalPrice == 0}
                  >
                    Pyment

                  </button>

                  <h6 className="my-3">To Check Your History Please Click on button Below</h6>
                  <MDBBtn
                    size="sm"
                    onClick={() => navigate('/history')}
                  >
                    History
                  </MDBBtn>
                  <h6 className="my-3">To Check Product List Please Click on button Below</h6>

                  <MDBBtn
                    size="sm"
                    onClick={() => navigate('/productCard')}
                  >
                    Product List
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>


  );
};

export default CartPage;
