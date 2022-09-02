import React,{useState,useEffect} from 'react'
import {Text,Flex,Image,Button,Input,useToast,
  Divider,
  HStack
} from '@chakra-ui/react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export default function Cart(){
	const [data,setdata]=useState('');
	const [cartarr,setcartarr]=useState('');
	const [total,settotal]=useState(0);

	const router = useRouter();
	const toast = useToast();
    const cookies = new Cookies();
    let token = cookies.get('usertoken');
	
	const getUser= async ()=>{
	        try{
	            if(!token || token === null){
	                router.push('/')
	                return toast({
		              title: '',
		              description: 'you need to be signed in to access your cart',
		              status: 'info',
		              duration: 9000,
		              isClosable: true,
		            });

	            }
	            await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getuser',{
	                token
	            }).then((res)=>{
	                //console.log(res.data)
	                setdata(res.data)
	            }).catch((err)=>{
	                console.log(err);
	            })
	        }catch(err){
	            console.log(err)
	        }
	    }
    const getCart=async()=>{
    	try{
    		await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getcart',{
	    		token
	    	}).then((res)=>{
	    		console.log(res.data)
	    		setcartarr(res.data)
	    		//console.log(cartarr)
	    		let sum = res.data?.map((item)=>{return item.price})
	        		console.log(sum.reduce((a, b) => a + b))
	        		settotal(sum.reduce((a, b) => a + b))
	    		
	    	})
    	}catch(err){
    		console.log(err)
    	}
    }
    useEffect(()=>{
        getUser()
        getCart()
    },[token]);	

    const payload = {
    	customerId : data._id,
    	cart:cartarr,
    	total
    }

    const createOrder=async()=>{
    	console.log(payload)
    	try{
    		await axios.post('https://try-fashion-admin-server.herokuapp.com/api/createorder',{
    			payload
    		}).then((res)=>{
    			console.log(res.data)
    			clearCart()
    			return toast({
	              title: '',
	              description: res.data,
	              status: 'success',
	              duration: 9000,
	              isClosable: true,
	            });
    		})
    	}catch(err){
    		console.log(err)
    	}
    }
    const details={
		id:data._id,
		token
	}
    const clearCart=async()=>{
    	try{
			await axios.post("https://try-fashion-admin-server.herokuapp.com/api/clearcart",
				{details}
			).then((res)=>{
				console.log(res.data)
				router.reload()
			}).catch((err)=>{
				console.log(err)
			})
		}catch(err){
			console.log(err)
		}
    }
	return(
		<Flex direction='column' p=''>
			<Text fontSize='28px' textDecoration='1px solid #000 underline' p=''>Shopping Cart</Text>
			<Flex className={styles.cartbody}>
				<Flex direction='column' className={styles.cartitems} >
						<Text fontSize='20px'>Your Order</Text>
						<Divider />
						{cartarr?.length === 0 ? 
							<Flex w='100%' h='100%' justify='center' align='center'>
							<Text>No items in your cart</Text>
							</Flex>
							:
						<>
						{cartarr?.map((item)=>{
							return(
								<Item key={item._id} item={item} token={token}/>
							)
						})}
						</>
					}
				</Flex>
				<Flex className={styles.cartsummary} direction='column' p='1'>
					<Text fontSize='20px' textDecoration='1px solid #000 underline'>Order Summary</Text>
					<Divider />
					<Flex direction='column' gap='2' p='2'>
						<HStack justify='space-between'>
							<Text mb='0'>Sub-Total</Text>
							<Text mb='0'>KES {total}</Text>
						</HStack>
						<HStack justify='space-between'>
							<Text mb='0'>Shipping</Text>
							<Text mb='0'>KES 200</Text>
						</HStack>
						<Divider />
						<HStack justify='space-between'>
							<Text mb='0'>Total</Text>
							<Text mb='0'>KES {total + 200}</Text>
						</HStack>
					</Flex>
					<Flex direction='column' gap='2' p='2' bg='#eee'>
						<Text mb='1' fontSize='20px' textDecoration='1px solid #000 underline'>Billing Address</Text>
						<Text>{data?.name}</Text>
						<Text>{data?.email}</Text>
						<Text>{data?.mobile}</Text>
						<Text>{data?.adress}</Text>
						<Text fontSize='14px' color='grey'> Order details once purchase has been made , cannot be changed.</Text>
					</Flex>
					<Text mt='2' textDecoration='1px solid #000 underline' mb='2' fontFamily='Vilane bold'>Select payment option</Text>

					<Flex direction='column'>

						{pay.map((item)=>{
							return(
								<Button key={item.id} mr='1' mb='2' borderRadius='0' bg={item.bg}>
								{item.icon }{item.name}
								</Button>
							)
						})}
						<Button mr='1' mb='2' borderRadius='0' bg='#000000' color='#fff' onClick={createOrder}> CheckOut</Button>
					</Flex>
					
				</Flex>
			</Flex>
		</Flex>
		)
}
const pay=[
{name:"Lipa na M p e s a",
	 bg:"#3aa335",
	 },
	{name:"C a r d",
	 bg:"grey",
	 },
	 {name:"P a y p a l",
	 bg:"#3b7bbf",
	 },
	 {name:"Crypto",
	 bg:"#f7931a",
	 icon: <CurrencyBitcoinIcon />
	 },
]

const Item=({item,token})=>{
	const router= useRouter()
	const [data,setdata]=useState('')
	const id = item?.prodctId
	const getProduct=async()=>{
		try{
			await axios.post("https://try-fashion-admin-server.herokuapp.com/api/getproduct",
				{id}
			).then((res)=>{
				//console.log(res.data)
				setdata(res.data)
			}).catch((err)=>{
				console.log(err)
			})
		}catch(err){
			console.log(err)
		}
	}
	const images = data?.images
	const total = data?.price * item?.qty
	useEffect(()=>{
		getProduct()
	},[])
	const details={
		id,
		token
	}
	const removeProduct=async()=>{
		try{
			await axios.post("https://try-fashion-admin-server.herokuapp.com/api/deleteitem",
				{details}
			).then((res)=>{
				//console.log(res.data)
				router.reload()
				return toast({
	              title: '',
	              description: res.data,
	              status: 'success',
	              duration: 9000,
	              isClosable: true,
	            });
			}).catch((err)=>{
				console.log(err)
			})
		}catch(err){
			console.log(err)
		}
	}
	return(
			<Flex m='5px 0px' bg='#eee' p='1' borderRadius='5'>
				<Image w='100px' h='100px' objectFit='cover' alt='cart photo' src={images? images[0]:null}/>
				<Flex direction='column' gap='1' p='1' flex='1'>
					<Text mb='0'>{data?.name}</Text>
					<Text mb='0'>KES {total}</Text>
					<Flex gap='2' align='center' justify='space-between' w='100%'>
						<Text>{item.qty} item(s) </Text>
						<Button bg='red' color='#fff' onClick={removeProduct}>Remove</Button>
					</Flex>
				</Flex>
			</Flex>
		)
}