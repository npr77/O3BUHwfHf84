import { Box, Heading, HStack, IconButton, Image, Input, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { CiEdit, CiTrash } from "react-icons/ci";
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                    <IconButton icon={<CiEdit />} colorScheme={"blue"} onClick={onOpen} />
                    <IconButton icon={<CiTrash />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />


                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={"4"}>
                            <Input placeholder='Product Name' value={product.name} />
                            <Input placeholder='Price' value={product.price} type='number' />
                            <Input placeholder='Image' value={product.image} />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>Update</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>

                </ModalContent>

            </Modal>

        </Box>
    )
}

export default ProductCard