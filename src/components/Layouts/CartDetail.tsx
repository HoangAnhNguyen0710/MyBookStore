"use client";

import { RootState } from "@/config/redux/store";
import Link from "next/link";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";

interface CartDetailProps {
  handleChangePage: () => void;
}

export default function CartDetail({ handleChangePage }: CartDetailProps) {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <Box component="div" className="p-4">
      <Typography variant="h5" className="pb-4 !font-semibold text-gray-800">
        Your Cart
      </Typography>
      {cart && cart.length > 0 ? (
        <>
          <TableContainer component={Paper} className="shadow-md rounded-lg">
            <Table className="min-w-full">
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell className="font-semibold">Book</TableCell>
                  <TableCell className="font-semibold">Quantity</TableCell>
                  <TableCell className="font-semibold">Sub Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((detail) => (
                  <TableRow key={detail.bookId} className="hover:bg-gray-50 transition">
                    <TableCell>{detail.title}</TableCell>
                    <TableCell align="center">{detail.quantity}</TableCell>
                    <TableCell>{detail.sub_total.toFixed(2)}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Link đến trang giỏ hàng */}
          <Box className="mt-4 flex justify-end">
            <Link href="/cart">
              <Button variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />} className="text-white !bg-primary" onClick={handleChangePage}>
                Go to Cart
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <Typography variant="body1" className="text-gray-500">
          Cart is empty!
        </Typography>
      )}
    </Box>
  );
}
