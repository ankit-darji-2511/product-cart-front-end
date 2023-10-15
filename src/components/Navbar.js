import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtnGroup
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function App(props) {
  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.allCart);

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>Shopping Cart</MDBNavbarBrand>
        <span>
        <MDBNavbarBrand>{props.tagName}</MDBNavbarBrand>
          
        </span>
        <MDBBtnGroup  shadow='0' aria-label='Basic example'>
          <Link to="/history">History Data</Link> &emsp;
          <Link to="/cart">Cart({totalQuantity})</Link> &emsp;
          <Link to="/" onClick={() => {
            localStorage.setItem('loginUserId', '')
            cart = [];
            totalQuantity = 0;
            totalPrice = 0;
          }}> Logout</Link>
        </MDBBtnGroup >        
      </MDBContainer>
    </MDBNavbar>
  );
}
