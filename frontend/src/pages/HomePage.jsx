import React, { useEffect } from 'react'
import { Container, SimpleGrid, Text, textDecoration, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {


    const { fetchProducts, products } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    console.log(products)

    return (
        <Container maxWidth="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGraient="linear(to-r, #000000, #ffffff)"
                    bgClip={"text"}
                    textAling={"center"}
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>

                <Text fontSize={"xl"} textAling={"center"} fontWeight='bold' color="gray.500">
                    No Products found 😞{" "}
                    <Link to={"/create"}>
                        <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                            Create a product
                        </Text>
                    </Link>

                </Text>

            </VStack>
        </Container>
    )
}

export default HomePage