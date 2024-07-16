import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  Box,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

// Define the product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  additionalInfo: string;
  availability: string;
  deliveryOptions: string;
  images: string[];
  similarProducts: Product[];
}

// Example similar products
const similarProducts: Product[] = [
  {
    id: 2,
    name: 'Elegant Lamp',
    description: 'A stylish and elegant lamp for your home.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/200',
    rating: 4.0,
    reviewsCount: 20,
    additionalInfo: 'Free shipping on all orders over $50.',
    availability: 'In Stock',
    deliveryOptions: 'Free Delivery by Tomorrow',
    images: [],
    similarProducts: [],
  },
  {
    id: 3,
    name: 'Classic Lamp',
    description: 'A classic lamp that suits any decor.',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/200',
    rating: 4.5,
    reviewsCount: 45,
    additionalInfo: 'Free shipping on all orders over $50.',
    availability: 'In Stock',
    deliveryOptions: 'Free Delivery by Tomorrow',
    images: [],
    similarProducts: [],
  },
  {
    id: 2,
    name: 'Elegant Lamp',
    description: 'A stylish and elegant lamp for your home.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/200',
    rating: 4.0,
    reviewsCount: 20,
    additionalInfo: 'Free shipping on all orders over $50.',
    availability: 'In Stock',
    deliveryOptions: 'Free Delivery by Tomorrow',
    images: [],
    similarProducts: [],
  },
  {
    id: 2,
    name: 'Elegant Lamp',
    description: 'A stylish and elegant lamp for your home.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/200',
    rating: 4.0,
    reviewsCount: 20,
    additionalInfo: 'Free shipping on all orders over $50.',
    availability: 'In Stock',
    deliveryOptions: 'Free Delivery by Tomorrow',
    images: [],
    similarProducts: [],
  },
  {
    id: 2,
    name: 'Elegant Lamp',
    description: 'A stylish and elegant lamp for your home.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/200',
    rating: 4.0,
    reviewsCount: 20,
    additionalInfo: 'Free shipping on all orders over $50.',
    availability: 'In Stock',
    deliveryOptions: 'Free Delivery by Tomorrow',
    images: [],
    similarProducts: [],
  },
  {
    id: 2,
    name: 'Elegant Lamp',
    description: 'A stylish and elegant lamp for your home.',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/200',
    rating: 4.0,
    reviewsCount: 20,
    additionalInfo: 'Free shipping on all orders over $50.',
    availability: 'In Stock',
    deliveryOptions: 'Free Delivery by Tomorrow',
    images: [],
    similarProducts: [],
  },
];

// Example product data
const exampleProduct: Product = {
  id: 1,
  name: 'Modern Lamp',
  description: 'A stylish and modern lamp to brighten up your home. Made with high-quality materials and designed to provide the perfect lighting ambiance.',
  price: 49.99,
  imageUrl: 'https://via.placeholder.com/400',
  rating: 4.5,
  reviewsCount: 34,
  additionalInfo: 'Available in multiple colors and sizes. Free shipping on all orders over $50.',
  availability: 'In Stock',
  deliveryOptions: 'Free Delivery by Tomorrow',
  images: [
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
  ],
  similarProducts: similarProducts,
};

const FilterSidebar: React.FC = () => {
  return (
    <Box sx={{ padding: 2}} >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider style={{ margin: '1rem 0' }} />
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Lamps" />
            <FormControlLabel control={<Checkbox />} label="Ceiling Lights" />
            <FormControlLabel control={<Checkbox />} label="Wall Lights" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            defaultValue={[20, 80]}
            min={0}
            max={100}
            step={10}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="4 stars & up" />
            <FormControlLabel control={<Checkbox />} label="3 stars & up" />
            <FormControlLabel control={<Checkbox />} label="2 stars & up" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl" sx={{ marginTop: '2rem', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <FilterSidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <Card>
                    <CardMedia component="img" image={product.imageUrl} alt={product.name} sx={{ height: '400px', objectFit: 'contain' }} />
                    <CardContent>
                      <Grid container spacing={2}>
                        {product.images.map((img, index) => (
                          <Grid item xs={4} key={index}>
                            <Paper variant="outlined">
                              <img src={img} alt={`img-${index}`} style={{ width: '100%' }} />
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-' }}>
                <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Rating value={product.rating} readOnly precision={0.5} />
                    <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '0.5rem' }}>
                      ({product.reviewsCount} reviews)
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h5" component="p" sx={{ color: '#FF8B66' }} gutterBottom>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {product.additionalInfo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Availability: <span style={{ color: product.availability === 'In Stock' ? '#4CAF50' : '#F44336' }}>{product.availability}</span>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Delivery Options: {product.deliveryOptions}
                  </Typography>
                  <CardActions>
                    <Button variant="contained" sx={{ backgroundColor: '#FF8B66', color: '#fff' }} startIcon={<ShoppingCartIcon />}>
                      Add to Cart
                    </Button>
                  </CardActions>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ margin: '2rem 0' }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Similar Products
          </Typography>
          <Grid container spacing={4}>
            {product.similarProducts.map((similarProduct) => (
              <Grid item xs={12} sm={6} md={4} key={similarProduct.id}>
                <Card>
                  <CardMedia component="img" image={similarProduct.imageUrl} alt={similarProduct.name} sx={{ height: '200px', objectFit: 'contain' }} />
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {similarProduct.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Rating value={similarProduct.rating} readOnly precision={0.5} />
                      <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '0.5rem' }}>
                        ({similarProduct.reviewsCount} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="h5" component="p" sx={{ color: '#FF8B66' }} gutterBottom>
                      ${similarProduct.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" sx={{ color: '#FF8B66', borderColor: '#FF8B66' }}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const App: React.FC = () => {
  return <ProductPage product={exampleProduct} />;
};

export default App;
