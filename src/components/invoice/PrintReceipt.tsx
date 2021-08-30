import React, { forwardRef } from "react";
import InvoiceHeadings from './InvoiceHeadings';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getOrdersArray, getTotalPrice } from "../../STORE/selectors";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { FiScissors } from "react-icons/fi";
import InvoiceRows from "./InvoiceRows";



const CollapsibleTable = forwardRef((props, ref: any) => {
  const totalPrice = useSelector(getTotalPrice);

  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );
  const orders = useSelector(getOrdersArray);

  return (
    <div ref={ref}>
      <InvoiceHeadings />
      <TableContainer component={Paper} style={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Premium</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Price/Day ({currencyCode})</TableCell>
              <TableCell align="right">Total Price ({currencyCode})</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <InvoiceRows
                key={order.itemId}
                order={order}
                exchangeRate={exchangeRate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={"total-container"} style={{ marginTop: 60 }}>
        <FiScissors className={"scissor"} />
        <h3 className={"heading"}>Grand Total</h3>
        <h3 className={"heading"}>
          {currencyCode} {(totalPrice * exchangeRate).toFixed(1)}
        </h3>
      </div>
    </div>
  );
});



export default CollapsibleTable;
