import React, { useState, useEffect } from "react";
import axios from '../axios';

import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { initialUpdateCart } from "../features/cartSlice";

const TableListing = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const apiUrl = "/api/getItemList";

      axios
        .get(apiUrl)
        .then((response) => {
          setItems(response.data.result);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, []);


  useEffect(() => {
    try {
        let user_id = localStorage.getItem("loginUserId");
      const apiUrl = "/api/getUserAddedAllCartItemCount";

      axios
        .post(apiUrl, {user_id : user_id})
        .then((response) => {
            dispatch(initialUpdateCart(response.data.result[0].total_item_qty));
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, []);

  return (
    <div className="container">
      <h1>Table Listing</h1>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Item Desc</th>
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
              <td>{item.item_desc}</td>
              <td>{item.item_price}</td>
              <td>{item.item_isActive == true ? "ACTIVE" : "DEACTIVE"}</td>
              <td>
                <MDBBtn
                  size="sm"
                  disabled={item.item_isActive == false}
                  // onClick={() => dispatch(addToCart(item))}
                >
                  Add to Cart
                </MDBBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableListing;
