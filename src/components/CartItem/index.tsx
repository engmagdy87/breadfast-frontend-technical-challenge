import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem as CartItemType } from "types";
import { useAppDispatch } from "hooks";
import { removeFromCart, updateQuantity } from "features/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 140 }}
        image={item.thumbnail}
        alt={item.title}
      />
      <CardContent
        sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography component="h3" variant="h6">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            ${item.price}
          </Typography>
          <TextField
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            sx={{ width: 80, mt: 1 }}
          />
        </Box>
        <IconButton
          onClick={() => dispatch(removeFromCart(item.id))}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;
