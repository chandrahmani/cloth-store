import { getProducts } from '@/services/app.services';
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
// import ProductCard from '../ProductCard/ProductCard';

// const products = [
//   { id: 1, name: 'Red T-Shirt' },
//   { id: 2, name: 'Blue Jeans' },
//   { id: 3, name: 'Black Hoodie' },
//   { id: 4, name: 'White Sneakers' },
//   { id: 5, name: 'Green Jacket' },
// ];

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  productList?: Product[];
  onSelectProduct?: (product: Product) => void;
};

function Home() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (query.trim()) {
      const filtered = productList.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, productList]);

  const handleSelect = (product: Product) => {
    setQuery(product.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelectProduct?.(product);
  };

  const onSelectProduct = (product: Product) => {
    setQuery(product.name);
    setSuggestions([]);
    setShowSuggestions(false);
    // Handle product selection logic here, e.g., navigate to product details page
    // For now, we just log the selected product
    console.log('Selected product:', product);

    // Simulate fetching product details (replace with actual API call if available)
    const fetchProductDetails = async (id: number) => {
      // Example: Find product by id from productList
      return productList.find((p) => p.id === id);
    };

    fetchProductDetails(product.id).then((details) => {
      console.log('Product details:', details);
    });
  };

  useEffect(() => {
    getProducts().then(setProductList);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Box position="relative" width="100%" maxWidth={isMobile ? '100%' : 400} mx="auto">
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(!!suggestions.length)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />

        {showSuggestions && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              zIndex: 10,
              width: '100%',
              maxHeight: 300,
              overflowY: 'auto',
              mt: 1,
            }}
          >
            {suggestions.length ? (
              <List>
                {suggestions.map((product) => (
                  <ListItem key={product.id} onClick={() => handleSelect(product)}>
                    <ListItemText primary={product.name} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box p={2}>
                <Typography variant="body2" color="textSecondary">
                  No matches found.
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>
      <Grid container spacing={3}>
        {productList.map((product) => (
          <Grid key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
