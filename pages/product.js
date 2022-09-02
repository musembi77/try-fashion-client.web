// import React from 'react';
// import {Flex,Text,Image,Stack,Button,NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper,} from '@chakra-ui/react';
// import { Carousel} from 'antd';
// import styles from '../styles/Home.module.css'
// import 'antd/dist/antd.css'
// import styled from 'styled-components'

// export default function Product(){
// 	return(
// 			<>
// 			<Flex className={styles.productViewbody}>
// 				<Flex className={styles.ProductViewImageContainer}>
// 					<Flex className={styles.ProductViewSideImageContainer}>
// 						<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
// 						<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
// 						<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
// 					</Flex>
// 					<div  className={styles.ProductViewMainImageContainer}>
// 						<Carousel autoplay >
// 								<Image objectFit='cover' className={styles.ProductViewMainImage} alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
// 		                       	<Image objectFit='cover' className={styles.ProductViewMainImage} alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
// 		                </Carousel>
// 	                </div>
// 				</Flex>
// 				<Flex className={styles.productinfo} direction='column'>
// 					<Text fontSize='28px' mb='0'>Name</Text>
// 					<Text >KES 2000</Text>
// 					<Text >Sizes : sm, m, xl, </Text>
// 					<Text >Color : blue, red, White</Text>
// 					<Text  fontSize='18px' mb='0'>Description</Text>
// 					<Text  w='100%' flexWrap='wrap'>kjhhhhhhhhhhhhhhhhhhhhhhhhhhhdbxhjhdbcjhx
// 					afjkddddddddddddddddddddddddddddddddddddddddjkxnlzjkkkkkkknjzxnjiznxjnzxjddddddddd
// 					afdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
// 					</Text> 
// 					<Flex color='grey' direction='column' m='10px 0' gap='2'>
// 						<Text mb='0' color='grey'>- fast delivery</Text> 
// 						<Text mb='0' color='grey'>- 30-day return policy</Text> 
// 						<Text mb='0' color='grey'>- In stock, usually dispatched in 1 to 2 business days.</Text> 
// 					</Flex>
// 					<Flex gap='2'>
// 						<NumberInput defaultValue={1} min={1} max={5} w='20%'>
// 						  <NumberInputField />
// 						  <NumberInputStepper>
// 						    <NumberIncrementStepper />
// 						    <NumberDecrementStepper />
// 						  </NumberInputStepper>
// 						</NumberInput>
// 						<Button w='78%' bg='#000' color='#fff' borderRadius='0'>Add to Cart</Button>
// 					</Flex>
					
// 				</Flex>

// 			</Flex>
// 			<Text fontSize='18px' mt='3' mb='0' ml='3'>Reviews</Text>
// 					<Flex >
// 					<StyledSlider className={styles.scrollbar}>
// 						{
// 							favorites.map((item)=>{
// 								return(
// 									<Recommend />
// 								)
// 							})
// 						}
// 					</StyledSlider>
// 						</Flex>
// 						<Text fontSize='18px' mt='3' mb='0' ml='3'>You may also like</Text>
// 					<Flex >
// 					<StyledSlider className={styles.scrollbar}>
// 						{
// 							favorites.map((item)=>{
// 								return(
// 									<Recommend />
// 								)
// 							})
// 						}
// 					</StyledSlider>
// 						</Flex>
// 			</>
// 		)
// }

// const favorites =[
// 	{name:'jj'},
// 	{name:'jj'},
// 	{name:'jj'},
// ]
// const Recommend=()=>{
// 	return(
// 			<Flex w='175px' h='250px' direction='column' m='1'>
// 				<Image w='100%' h='200px' alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
// 				<Text mb='0'>Name</Text>
// 				<Text mb='0'>price</Text>
// 			</Flex>
// 		)
// }
// const StyledDiv = styled.div`
//     display: flex;
//     margin: 0 10px;
// `
// const StyledSlider = styled.div`
//     display: flex;
//     overflow: auto;  
//     padding: 5px
// `