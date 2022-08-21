import React, { useState } from "react";

const Item = props => {
  const [addItem, setAddItem] = useState(undefined)
  return (
    <>
      <tr>
        <td className="text-left">{props.name}</td>
        <td>{props.item["rate"]}</td>
        <td style={{ width: "1%" }}>
          <span>{props.qty}</span>
        </td>
        <td>{props.amount}</td>
      </tr>
    </>
  )
}
export default Item