import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUser, getOrderDetails } from "@/store/shop/order-slice";

const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch()
  const {user}= useSelector(state=>state.auth)
  const {orderList,orderDetails}= useSelector(state=>state.shopOrder)
  console.log("🚀 ~ ShoppingOrders ~ orderList:", orderList)

  //  function handleFetchOrderDetails(getId) {
  //   dispatch(getOrderDetails(getId));
  // }


  // useEffect(() => {
  //   if (orderDetails !== null) setOpenDetailsDialog(true);
  // }, [orderDetails]);

  useEffect(() => {
    dispatch(getAllOrderByUser(user?.id))
  }, [dispatch])
  


  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {/* {orderList && orderList.length >0 ? orderList.map(orderItem=><TableCell>{orderItem?._id}</TableCell>
              <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
              <TableCell><Badge className=`py-1 px-3 ${orderItem?.orderStatus === 'confimed' ?bg-green-500:bg-black-500}`>{orderItem?.orderStatus}</Badge></TableCell>
              <TableCell>{orderItem?.totalAmount}</TableCell>
              <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                <Button onClick={()=> setOpenDetailsDialog(true)}>View Details</Button>
                <ShoppingOrderDetailsView />
              </Dialog>
              </TableCell>
            ) :null} */}

              <TableCell>123456</TableCell>
              <TableCell>27/06/2025</TableCell>
              <TableCell>In Process</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
              {/* <Dialog open={openDetailsDialog}onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }} */}
                <Button onClick={()=> setOpenDetailsDialog(true)}>View Details</Button>
                {/* <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>View Details</Button> */}
                <ShoppingOrderDetailsView  orderDetails={orderDetails}/>
              </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
