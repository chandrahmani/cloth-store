import { useCart } from '@/ProductContext/ProductContext';
import { Product } from '@/types/index';
import { Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Card>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="subtitle1">₹{product.price}</Typography>
        <Button variant="contained" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
