"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "appHooks";
import { fetchProducts } from "features/products/products.actions";
import { productsSelector } from "features/products/products.selectors";
import type { Product } from "features/products/products.types";
import { addToCart } from "features/cart/cart.reducer";
import Loader from "components/shared/Loader";
import Error from "components/shared/Error";
import ProductCard from "components/ui/ProductCard";
import LoadMore from "components/ui/LoadMore";

const Home = () => {
  const dispatch = useAppDispatch();
  const initialFetchDone = useRef(false);

  const { data, isLoading, error } = useAppSelector(productsSelector);
  const { products, total, skip, limit } = data;

  const fetchAllProducts = async (
    passedLimit: number = limit,
    passedSkip: number = skip
  ) => {
    try {
      await dispatch(fetchProducts({ limit: passedLimit, skip: passedSkip }));
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  };

  const loadProducts = async () => {
    if (products.length < total && !isLoading) {
      await fetchAllProducts(limit, skip + limit);
    }
  };

  const addProductToCart = (product: Product) => {
    const { id, title, price, thumbnail } = product;
    const payload = {
      id,
      name: title,
      price,
      quantity: 1,
      imageUrl: thumbnail,
    };
    dispatch(addToCart(payload));
  };

  useEffect(() => {
    if (!initialFetchDone.current && !products.length && !isLoading) {
      initialFetchDone.current = true;
      fetchAllProducts();
    }
  }, [products.length, isLoading]);

  if (isLoading && !products.length) return <Loader />;

  if (error) return <Error retryAction={fetchAllProducts} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        align="center"
        gutterBottom
        sx={{
          mb: 4,
          fontSize: {
            xs: "1.25rem",
            sm: "1.75rem",
            md: "2rem",
          },
          fontWeight: 600,
        }}
      >
        A Supermarket In Your Pocket
      </Typography>
      <Grid container spacing={2}>
        {products.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              imageUrl={product.thumbnail}
              name={product.title}
              price={product.price}
              description={product.description}
              addToCart={() => addProductToCart(product)}
            />
          </Grid>
        ))}
        {isLoading && (
          <Box width={"100%"} textAlign={"center"} mt={2}>
            <Image
              src="/breadfast.png"
              alt="logo"
              width={20}
              height={20}
              style={{ height: "auto" }}
            />
          </Box>
        )}
      </Grid>
      {products.length < total && (
        <LoadMore onLoadMore={loadProducts} loading={isLoading} />
      )}
    </Container>
  );
};

// Hydration issue fix
export default dynamic(() => Promise.resolve(Home), { ssr: false });
