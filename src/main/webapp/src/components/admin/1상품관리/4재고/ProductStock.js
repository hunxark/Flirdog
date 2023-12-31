import React, {useEffect} from "react";
import styles from "../../../../css/admin/1상품관리/productPrimaryInfo.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const ProductStock = ({ stockRef, productDTOStock }) => {
  useEffect(() => {
    if (productDTOStock === undefined) {
      stockRef.current.value = "";
    } else if (productDTOStock !== undefined) {
      stockRef.current.value = productDTOStock;
    }
  }, [productDTOStock, stockRef]);

  return (
    <div className={styles.tableDiv}>
      <div style={{ width: "99%" }} className="d-flex justify-content-end">
        <span style={{ color: "gray", fontSize: "0.9rem" }}>단위: 개</span>
      </div>
      <table className={styles.tableContainer}>
        <tr>
          <th className={styles.tableTh}>재고</th>
          <td className={styles.tableTd}>
            <InputGroup size="sm">
              <Form.Control
                ref={stockRef}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                type="number"
              />
            </InputGroup>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProductStock;
