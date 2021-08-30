import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { selectAddOnSingleType } from "../../types";
import formattedTitle from "../../utils/formattedTitle";

export default function InvoiceRows({ order, exchangeRate }: any) {
  const classes = useRowStyles();
  const Difference_In_Time =
    order.endDate.getTime() - order.startDate.getTime();

  const Difference_In_Days =
    Math.ceil(Difference_In_Time / (1000 * 3600 * 24)) || 1;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{formattedTitle(order.serviceId)}</TableCell>
        <TableCell align="right">{order.title}</TableCell>
        <TableCell align="right">{formattedTitle(order.countryId)}</TableCell>
        <TableCell align="right">{formattedTitle(order.cityId)}</TableCell>
        <TableCell align="right">{order.premium ? "Yes" : "No"}</TableCell>
        <TableCell align="right">{order.startDate.toDateString()}</TableCell>
        <TableCell align="right">{order.endDate.toDateString()}</TableCell>
        <TableCell align="right">
          {(order.price * exchangeRate).toFixed(1)}
        </TableCell>
        <TableCell align="right">
          {(order.price * Difference_In_Days * exchangeRate).toFixed(1)}
        </TableCell>
      </TableRow>
      {Boolean(order.addOns?.length) && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
            colSpan={8}
          >
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Add Ons
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.addOns.map(
                    (addOn: selectAddOnSingleType, index: number) => (
                      <TableRow key={index}>
                        <TableCell scope="row">{addOn.title}</TableCell>
                        <TableCell align="right">{addOn.quantity}</TableCell>
                        <TableCell align="right">{addOn.price}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
