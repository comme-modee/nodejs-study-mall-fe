import React from 'react'
import { Row } from 'react-bootstrap';
import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Row className="color-ring">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
    </Row>
  )
}

export default Spinner