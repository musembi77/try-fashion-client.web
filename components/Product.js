import React,{useState} from 'react'
import {Flex,Text,Image,VStack,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Button,useDisclosure,useToast} from '@chakra-ui/react'
import {VisibilityOutlined,ShoppingBagOutlined} from '@mui/icons-material';
import styles from '../styles/Home.module.css'
import { Carousel} from 'antd';
import 'antd/dist/antd.css'
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios'
export default function Product({item}){

	const [email,setemail]=useState('')
	//console.log(item)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [ismodalvisible,setismodalvisible]=useState(false)
	//handle modal open
	const [openmodal,setopenmodal]=useState(false);

	const cookies = new Cookies();
    let token = cookies.get('usertoken');

	const HandleModal=()=>{
		setismodalvisible(true)
		if(token){
	      let decoded = jwt_decode(token);
	      console.log(decoded.email);
	      setemail(decoded.email);
	    }
	}
	//handleAddtoCart
	const toast = useToast()
	const handleAddToCart=()=>{
		toast({
            title: `${item.name} successfully added to cart`,
            status: 'success',
            isClosable: true,
        })
	}
	const router=useRouter()
	const images = item?.images
	return(
			<Flex direction='column' className={styles.productcontainer} m='1' position='relative' >
			<ProductModal email={email} token={token} isOpen={isOpen} onClose={onClose} ismodalvisible={ismodalvisible} setismodalvisible={setismodalvisible} item={item} handleAddToCart={handleAddToCart} onOpen={onOpen}/>
				<Image onClick={(()=>{window.open(`/product/${item._id}`, '_blank');})} w='100%' h='300px' objectFit='cover' alt='Photo' src={images[0]}/>
				<Flex direction='column' cursor='pointer'>
				<Text fontFamily='Vilane Bold' mb='0'>{item.name}</Text>
				<Text mb='0'>{item?.price}</Text>
				<Text mb='0' fontSize='14px' color='grey' >Size : {item.sizes}</Text>
				<Text mb='0' fontSize='14px' color='grey' >Colors : {item.colors}</Text>
				</Flex>
				<VStack position='absolute' top='10px' ml='2' bg='rgb(255,255,255,0.7)' p='1' borderRadius='10' cursor='pointer'>
					<VisibilityOutlined onClick={HandleModal}/>
				</VStack>
			</Flex>
		)
}

const ProductModal=({isOpen,onClose,token,onOpen,item,email,setismodalvisible,ismodalvisible})=>{
	if(ismodalvisible === true){
		onOpen()
	}
	const [pid,setPid]=useState('')
	const [size,setSize]=useState('')
	const [color,setColor]=useState('')
	const [qty,setQty]=useState(1)

	const sizesarr=item?.sizes?.split(',')
	const colorsarr=item?.colors?.split(',')
	const imagesarr = item?.images

	const product = {
		email,
		pid:item._id,
		size,
		color,
		qty,
		price:item?.price * qty
	}
	const toast = useToast()
	
	const AddtoCart=()=>{
		console.log(product)
		if(!token || token === null){
                return toast({
		              title: '',
		              description: `you you need to be signin or be registered to add to cart`,
		              status: 'error',
		              duration: 9000,
		              isClosable: true,
		            });
            }
		if(product.size === ''){
			return toast({
              title: '',
              description: `you are required to select a size`,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
		}
		if(product.color === ''){
			return toast({
              title: '',
              description: `you are required to select a color`,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
		}
		try{
			axios.post("http://localhost:5000/api/addtocart",{
				product
			}).then((res)=>{
				console.log(res.data)
				onClose()
				return toast({
	              title: '',
	              description: `${product.qty} ${item.name} has been succesfully add to your cart`,
	              status: 'success',
	              duration: 9000,
	              isClosable: true,
	            });
			})
		}catch(err){
			console.log(err)
		}
		
	}
	return(
			<Modal isOpen={isOpen} onClose={onClose}>
		        <ModalOverlay />
		        <ModalContent>
		          <ModalCloseButton onClick={(()=>{setismodalvisible(false)})}/>
		          <ModalBody>
		       		<Text fontFamily='Vilane Bold' fontSize='24px'>Product Quick View</Text>
		       		<Flex direction='column' gap='1'>
		       			<Carousel autoplay className={styles.productmodalimagecontainer} >
		       						{imagesarr?.map((image)=>{
										return(
											<Image key={image.id} objectFit='cover' w='100%' m="0" h='400px' alt='Photo' src={image}/>
										)
									})}
									
			            </Carousel>
			            <Text fontFamily='Vilane Bold' fontSize='24px' mb='0'>{item.name}</Text>
			            <Text mb='0' fontSize='20px'>KES {item.price}</Text>
			            <Text >Sizes : {sizesarr?.map((sizesitem)=>{return(<Button key={sizesitem.id} w='20px' m='0 2px' onClick={(()=>{setSize(sizesitem)})}>{sizesitem}</Button>)})} </Text>
						<Text >Color : {colorsarr?.map((colorsitem)=>{return(<Button key={colorsitem.id} w='' m='1px 2px' onClick={(()=>{setColor(colorsitem)})}>{colorsitem}</Button>)})} </Text>
			            <Text  fontSize='18px' mb='0'>Description</Text>
						<Text  w='100%' mb='0' flexWrap='wrap'>{item?.description}
						</Text> 
						<Flex color='grey' direction='column' m='10px 0' gap='2'>
							<Text mb='0' color='grey'>- fast delivery</Text> 
							<Text mb='0' color='grey'>- 30-day return policy</Text> 
							<Text mb='0' color='grey'>- In stock, usually dispatched in 1 to 2 business days.</Text> 
						</Flex>
			            <Button bg='#000' color='#fff' borderRadius='0' onClick={AddtoCart}>A d d  t o  C a r t</Button>
			            
			            <Text mb='0' cursor='pointer' onClick={(()=>{window.open(`/product/${item._id}`, '_blank');})}>View full details </Text>
		       		</Flex>
		          </ModalBody>
		        </ModalContent>
		      </Modal>
		)
}