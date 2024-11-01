"use client";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "hooks";
import { fetchProducts } from "features/products/products.actions";
import { productsSelector } from "features/products/products.selectors";
import Loader from "shared/Loader";
import dynamic from "next/dynamic";
import ProductCard from "components/ProductCard";
import { Product } from "features/products/products.types";
import LoadMore from "shared/LoadMore";
import Image from "next/image";

const Home = () => {
  const dispatch = useAppDispatch();
  const initialFetchDone = useRef(false);

  const { data, isLoading, error } = useSelector(productsSelector);
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

  useEffect(() => {
    if (!initialFetchDone.current && !products.length && !isLoading) {
      initialFetchDone.current = true;
      fetchAllProducts();
    }
  }, [products.length, isLoading]);

  if (isLoading && !products.length) return <Loader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        align="center"
        gutterBottom
        sx={{
          mb: 4,
          fontSize: {
            xs: "1.25rem",
            lg: "2rem",
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

export default dynamic(() => Promise.resolve(Home), { ssr: false });
