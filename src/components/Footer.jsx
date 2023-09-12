import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import "../Styles/FooterStyles.css"

export default function App() {
  return (
    <MDBFooter className=' footerSt text-center text-white' style={{ backgroundColor: 'grey' }}>
      <MDBContainer className='p-4'></MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'grey' }}>
        © 2023 Copyright:
        <div className='text' href='https://github.com/BrayanSO/CarLot'>
          {/*More information*/}
          <Link to="/LoginForm">
          <button  className="btn btn-link">Login</button>
          </Link>
        </div>
      </div>
    </MDBFooter>
  );
}