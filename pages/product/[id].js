import React,{useState,useEffect} from 'react';
import {Flex,Text,Image,Stack,Button,Input,useToast} from '@chakra-ui/react';
import { Carousel} from 'antd';
import styles from '../../styles/Home.module.css'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import axios from 'axios';
import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Loading from '../../components/loading.js';
import { AddReviewModal } from '../../components/AddReviewModal';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Product(){
	const [pid,setPid]=useState('');
	const [size,setSize]=useState('');
	const [color,setColor]=useState('');
	const [qty,setQty]=useState(1);
	const [email,setemail]=useState('');
	const [isfetching,setisfetching]=useState(false);
	const [isaddingreviewModalvisible,setisaddingreviewModalvisible]=useState(false);

	const router = useRouter()
	const queryparam = router.query;
	console.log(queryparam.id)
	const id = queryparam.id
	console.log(id)
	const [data,setdata]=useState('')
	const [recommendeddata,setRecommendeddata]=useState('')
	const [isadding,setisadding]=useState(false)

	const getProduct=async()=>{
		setisfetching(true)
		try{
			await axios.post("https://try-fashion-admin-server.herokuapp.com/api/getproduct",
				{id}
			).then((res)=>{
				console.log(res.data)
				setTimeout(()=>{
					setdata(res.data)
					setisfetching(false)
				},2000)
			}).catch((err)=>{
				console.log(err)
			})
		}catch(err){
			console.log(err)
		}
	}
	//const {images}= data?.images//<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src={images[0] === undefined ? "https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219" : images[0]}/>
	useEffect(()=>{
		if(data.images === undefined){
			getProduct()	
		}
		getRecommendProducts()
	},[id])
	const sizesarr=data?.sizes?.split(',')
	const colorsarr=data?.colors?.split(',')
	const imagesarr = data?.images
	//console.log(imagesarr?.length)
	//add to cart
	const product = {
		email,
		pid:id,
		size,
		color,
		qty,
		price:data?.price * qty
	}
	const toast = useToast()
	const cookies = new Cookies();
    let token = cookies.get('usertoken');
    const reviews = data?.reviews

	const AddtoCart=async()=>{
		setisadding(true)
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
        if(token){
	      let decoded = jwt_decode(token);
	      console.log(decoded.email);
	      setemail(decoded.email);
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
			console.log(product)
			await axios.post("https://try-fashion-admin-server.herokuapp.com/api/addtocart",{
				product
			}).then((res)=>{
				console.log(res.data)
				setisadding(false)
				return toast({
	              title: '',
	              description: `${product.qty} ${data.name} has been succesfully add to your cart`,
	              status: 'success',
	              duration: 9000,
	              isClosable: true,
	            });
			})
		}catch(err){
			console.error
		}
		
	}
	const param = {
        category:data?.category,
        subcategory:data?.subcategory
    }
//https://keja--app.herokuapp.com
    const getRecommendProducts=async(query)=>{
        try{
            await axios.post('https://try-fashion-admin-server.herokuapp.com/api/recommendproducts',{
                param
            }).then((res)=>{
                console.log(res.data)
                setRecommendeddata(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
        
    }
	return(
			<>
			{isfetching ? 
				<Flex h='80vh' align='center' justify='center'>
					<Loading />
				</Flex>
			:
			<>
			<Flex className={styles.productViewbody}>
				<Flex className={styles.ProductViewImageContainer}>
					<Flex className={styles.ProductViewSideImageContainer}>
						<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src={imagesarr? imagesarr[0] : null}/>
						<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src={imagesarr? imagesarr[1] : null}/>
						<Image className={styles.ProductViewSideImage} objectFit='cover' alt='Photo' src={imagesarr? imagesarr[2] : null}/>
					</Flex>
					<div  className={styles.ProductViewMainImageContainer}>
						<Carousel autoplay >
								{imagesarr?.map((image)=>{
									return(
										<Image key={image.id} objectFit='cover' className={styles.ProductViewMainImage} alt='Photo' src={image}/>
									)
								})}
		                </Carousel>
	                </div>
				</Flex>
				<Flex className={styles.productinfo} direction='column'>
					<Text fontSize='28px' mb='0'>{data?.name}</Text>
					<Text fontSize='20px'>KES {data?.price}</Text>
					<Text >Sizes : {sizesarr?.map((sizesitem)=>{return(<Button key={sizesitem.id} w='20px' m='0 2px' onClick={(()=>{setSize(sizesitem)})}>{sizesitem}</Button>)})} </Text>
					<Text >Color : {colorsarr?.map((colorsitem)=>{return(<Button key={colorsitem.id} w='' m='1px 2px' onClick={(()=>{setColor(colorsitem)})}>{colorsitem}</Button>)})} </Text>
					<Text  fontSize='18px' mb='0'>Description</Text>
					<Text  w='100%' flexWrap='wrap'>{data?.description}
					</Text> 
					<Flex color='grey' direction='column' m='10px 0' gap='2'>
						<Text mb='0' color='grey'>- fast delivery</Text> 
						<Text mb='0' color='grey'>- 30-day return policy</Text> 
						<Text mb='0' color='grey'>- In stock, usually dispatched in 1 to 2 business days.</Text> 
					</Flex>
					<Flex gap=''>
						<Input w='60px' type='number' min='0' value={qty} onChange={((e)=>{setQty(e.target.value)})}/> 
						{isadding?
						<Button flex='1' bg='#000' color='#fff' borderRadius='0' isLoading
    loadingText='Adding to cart'>Add to Cart</Button>
    :
    <Button flex='1' bg='#000' color='#fff' borderRadius='0' onClick={AddtoCart} >Add to Cart</Button>}
					</Flex>
					
				</Flex>

			</Flex>
			<AddReviewModal isaddingreviewModalvisible={isaddingreviewModalvisible} setisaddingreviewModalvisible={setisaddingreviewModalvisible} id={data._id}/>
			<Text fontSize='18px' mt='3' mb='0' ml='3'>Reviews</Text>
					<Flex direction='column' p='1'>
					{
                        reviews?.length === 0 ? 
                        <>
                        <Text> We do not have any reviews for this Product yet</Text> 
                            <Button mt='2' mb='2'  bg='#000' color='#fff' 
                                onClick={(()=>{setisaddingreviewModalvisible(true)})}
                                >
                                    Add  a  review
                                </Button>
                        
                        </>
                        :
                        <Flex direction='column' gap='3'>
                            
                            <StyledSlider className={styles.scrollbar}>
                            {reviews?.slice(0,3).map((reviews)=>{
                                return(
                                    <StyledDiv key={reviews.id}>
                                        <Item  reviews={reviews}/>
                                    </StyledDiv>
                                )
                            })}
                        </StyledSlider>
                        <Button 
                        bg='#000'
                        color='#fff'
                        borderRadius='0'>
                                    Add a review
                        </Button>
                        </Flex>
                        
                    }
						</Flex>
						<Text fontSize='18px' mt='3' mb='0' ml='3'>You may also like</Text>
					<Flex >
					{recommendeddata?.length === 0 ? 
						<Text>We could not recommend any products at the moment</Text>
						:
						<StyledSlider className={styles.scrollbar}>
							{
								recommendeddata?.slice(0,4).map((item)=>{
									return(
										<Recommend key={item.id} item={item}/>
									)
								})
							}
						</StyledSlider>
					}
						</Flex>
						</>
			}
			</>
		)
}

const favorites =[
	{name:'jj'},
	{name:'jj'},
	{name:'jj'},
]
const Recommend=({item})=>{
	const images = item?.images
	return(
			<Flex w='175px' h='250px' direction='column' m='1' onClick={(()=>{window.open(`/product/${item._id}`, '_blank');})}>
				<Image w='100%' h='200px' objectFit='cover' cursor='pointer' alt='Photo' src={item?.images[0] !== undefined? item?.images[0] : null}/>
				<Text mb='0'>{item?.name}</Text>
				<Text mb='0'>{item?.price}</Text>
			</Flex>
		)
}

const Item=({reviews})=>{
    return(
        <Flex p='2' gap='3' borderRadius='10px' direction='column' w='250px' h='200px' bg='#eee' color='#212222'>
            <Flex gap='3'>
                <AccountCircleIcon style={{width:"40px",height:"40px"}}/>
                <Flex direction='column' >
                    <Text mb='0' fontFamily='Poppins-bold' fontSize='12px' w='60%'>
                        {reviews.email}
                    </Text>
                </Flex>
            </Flex>
            <Text mb='0' fontSize='14px' w='100%' overflow='wrap'>
                {reviews.body}
            </Text>
        </Flex>
    )
}

const StyledDiv = styled.div`
    display: flex;
    margin: 0 10px;
`
const StyledSlider = styled.div`
    display: flex;
    flex-direction: row;
    overflow: auto;  
    padding: 5px
`