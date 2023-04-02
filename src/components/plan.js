import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import styles from "../assets/css/body.module.css";

export default function Plan() {
  return (
    <div className={styles.loginbody}>
      <form>
        <MDBContainer>
          <MDBRow className="justify-content-md-center">
            <MDBCol size='6'>
              One of two
            </MDBCol>
            <MDBCol size='6'>
              One of two
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </div>
  );
}