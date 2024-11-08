import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React from 'react'
import { CiEdit, CiTrash } from "react-icons/ci";
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    const { deleteProduct } = useProductStore()
    const toast = useToast()

    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id)
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }


    return (
        <Box
            shadow={"lg"}
            rounded={'lg'}
            overflow={"hidden"}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} w={"full"} h={"48"} objectFit={"cover"} />

            <Box p={"6"}>
                <Heading as={"h3"} size={"md"} mb={"2"}>
                    {product.name}
                </Heading>
                <Text fontSize={"xl"} color={textColor} mb={"4"}>
                    {product.price}
                </Text>

                <HStack spacing={"2"}>
                    <IconButton icon={<CiEdit />} colorScheme={"blue"} />
                    <IconButton icon={<CiTrash />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />


                </HStack>
            </Box>
        </Box>
    )
}

export default ProductCard