import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

const Bestsellers = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "Description of Product 1",
      image: "product1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Product 2",
      description: "Description of Product 2",
      image: "product2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Product 3",
      description: "Description of Product 3",
      image: "product3.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Product 4",
      description: "Description of Product 4",
      image: "product4.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Product 5",
      description: "Description of Product 5",
      image: "product5.jpg",
      link: "#",
    },
  ];

  const smallProductsRef = useRef(null);

  const [smallProductsHeight, setSmallProductsHeight] = useState(0);


  return (
    <div style={{ padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            marginBottom: "20px",
            color: "#333",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          Bestsellers
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        {/* Large product on the left */}
        <Grid item xs={12} md={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "5px",
              width: "100%",
              height: `${smallProductsHeight}px`, // Set height dynamically
            }}
          >
            <motion.div
              initial={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
              whileHover={{
                clipPath:
                  "polygon(0% 25%, 25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%)",
              }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                border: "2px solid #ff5722",
                zIndex: 1,
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
              }}
            />
            <Card
              sx={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={products[0].image}
                alt={products[0].title}
                style={{ objectFit: "cover" }}
              />
              <CardContent
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {products[0].title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {products[0].description}
                </Typography>
                <Button
                  href={products[0].link}
                  variant="contained"
                  color="primary"
                >
                  View Product
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} ref={smallProductsRef}>
            {products.slice(1, 5).map((product) => (
              <Grid item xs={6} key={product.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Button
                        href={product.link}
                        variant="contained"
                        color="primary"
                      >
                        View Product
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bestsellers;
