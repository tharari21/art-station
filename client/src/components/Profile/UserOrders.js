import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UserOrders = () => {
  //   const user = useSelector();
  //   const [orders, setOrders] = useState(null);
  //   // useEffect(() => {
  //   //     const req = await fetch(`http://localhost:3000/users/${user.id}/orders`)
  //   //     const res = await req.json()
  //   //     setOrders(res)

  //   // }, [])
  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Amount</th>
      </thead>
      <tbody>
        {/* {orders?.map(order => (
          <tr>
            <td>{order.id}</td>
            <td>{order.name}</td>
            <td>{order.amount}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default UserOrders;
