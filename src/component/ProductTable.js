import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import { currencyFormat } from "../utils/number";
const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  const [show, setShow] = useState(false);
  const [ deleteId, setDeleteId ] = useState(null);
  const [ deleteName, setDeleteName ] = useState(null);

  const handleClose = () => {
    setShow(false)
    setDeleteId(null)
    setDeleteName(null)
  };

  const handleShow = (id, name) => {
    setDeleteId(id)
    setDeleteName(name)
    setShow(true)
  };

  return (
    <div className="overflow-x">
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>아이템 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>'{deleteName}' 아이템을 정말 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={() => deleteItem(deleteId)}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              item.isDeleted === false &&
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button 
                    size="sm" 
                    className="mr-1"
                    onClick={() => openEditForm(item)}
                  >
                    수정
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleShow(item._id, item.name)}
                  >
                    삭제
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
