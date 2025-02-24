"use client";
import CartItem from "@/components/Cart/CartItem";
import { RootState } from "@/config/redux/store";
import { clearCart } from "@/contexts/cartSlice";
import { Button, Container, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";


const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const totalAmount = cart.reduce((sum, item) => sum + item.sub_total, 0);

  return (
    <Container maxWidth="md" className="my-4 h-screen">
      <Typography variant="h4" className="mt-6 mb-4 !font-semibold">
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6">Your Cart is empty!</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.bookId} item={item} />
          ))}

          <div className="flex justify-between items-center mt-6">
            <Typography variant="h5">Tổng: {totalAmount.toLocaleString()} VND</Typography>
            <Button variant="contained" color="secondary" onClick={() => dispatch(clearCart())}>
              Delete Entire Cart
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
