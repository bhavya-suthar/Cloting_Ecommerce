import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin } from '@/store/admin/order-slice'

const AdminOrdersView = () => {
    const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
     const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  
  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);


  return (

    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                    <TableCell>123456</TableCell>
                    <TableCell>27/06/2025</TableCell>
                    <TableCell>In Process</TableCell>
                    <TableCell>$1000</TableCell>
                    <TableCell>
                    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>

                      <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                      <AdminOrderDetailsView orderDetails={orderDetails}/>
                    </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          
    </Card> 
  
  
    // <Card>
    //   <CardHeader>
    //     <CardTitle>All Orders</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead>Order ID</TableHead>
    //           <TableHead>Order Date</TableHead>
    //           <TableHead>Order Status</TableHead>
    //           <TableHead>Order Price</TableHead>
    //           <TableHead>
    //             <span className="sr-only">Details</span>
    //           </TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {orderList && orderList.length > 0
    //           ? orderList.map((orderItem) => (
    //               <TableRow>
    //                 <TableCell>{orderItem?._id}</TableCell>
    //                 <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
    //                 <TableCell>
    //                   <
    //                     className={`py-1 px-3 ${
    //                       orderItem?.orderStatus === "confirmed"
    //                         ? "bg-green-500"
    //                         : orderItem?.orderStatus === "rejected"
    //                         ? "bg-red-600"
    //                         : "bg-black"
    //                     }`}
    //                   >
    //                     {orderItem?.orderStatus}
    //                   </Badge>
    //                 </TableCell>
    //                 <TableCell>${orderItem?.totalAmount}</TableCell>
    //                 <TableCell>
    //                   <Dialog
    //                     open={openDetailsDialog}
    //                     onOpenChange={() => {
    //                       setOpenDetailsDialog(false);
    //                       dispatch(resetOrderDetails());
    //                     }}
    //                   >
    //                     <Button
    //                       onClick={() =>
    //                         handleFetchOrderDetails(orderItem?._id)
    //                       }
    //                     >
    //                       View Details
    //                     </Button>
    //                     <AdminOrderDetailsView orderDetails={orderDetails} />
    //                   </Dialog>
    //                 </TableCell>
    //               </TableRow>
    //             ))
    //           : null}
    //       </TableBody>
    //     </Table>
    //   </CardContent>
    // </Card>
  )
}

export default AdminOrdersView