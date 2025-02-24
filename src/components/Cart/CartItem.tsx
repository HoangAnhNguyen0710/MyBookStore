import { Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { addToCart, CartDetail } from "@/contexts/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface CartItemProps {
  item: CartDetail;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="border-b py-4 px-2 md:grid md:grid-cols-[3fr_1fr_2fr_2fr_1fr] md:gap-4 flex flex-col items-center justify-center">
      {/* Tên sản phẩm */}
      <Typography
        variant="h6"
        className="!font-medium truncate w-full md:w-auto"
      >
        {item.title}
      </Typography>

      <Typography className="text-center min-w-[80px] md:block hidden">
        {item.price.toLocaleString()}$
      </Typography>


      <div className="flex items-center justify-start md:justify-center md:min-w-[120px] w-full md:w-auto">
        <Button
          variant="outlined"
          className="font-semibold !text-xl !px-2"
          size="small"
          onClick={() =>
            dispatch(
              addToCart({
                bookId: item.bookId,
                quantity: -1,
                price: item.price,
                title: item.title,
              })
            )
          }
        >
          <RemoveIcon />
        </Button>
        <Typography className="px-4 min-w-[30px] text-center">
          {item.quantity}
        </Typography>
        <Button
          variant="outlined"
          className="font-semibold !text-xl !px-2"
          size="small"
          onClick={() =>
            dispatch(
              addToCart({
                bookId: item.bookId,
                quantity: 1,
                price: item.price,
                title: item.title,
              })
            )
          }
        >
          <AddIcon />
        </Button>
      </div>


      <Typography className="text-center min-w-[100px] md:block hidden">
        {item.sub_total.toLocaleString()}$
      </Typography>

      <IconButton
        className="min-w-[40px] hidden md:block self-end md:self-center mt-2 md:mt-0 rounded-xl !text-primary"
        onClick={() =>
          dispatch(
            addToCart({
              bookId: item.bookId,
              quantity: -item.quantity,
              price: item.price,
              title: item.title,
            })
          )
        }
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default CartItem;
