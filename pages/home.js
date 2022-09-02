import React from 'react';
import {Image,Stack,Flex,VStack,Text,Divider} from '@chakra-ui/react'
import { Carousel} from 'antd';
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css'
import {useRouter} from 'next/router'
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

function Home(){
	//handle route navigation
	const router = useRouter();
	return(
			<Stack bg='' h='100%'>
				<Flex className={styles.boxMainImageContainer} mb='5s'>
					<Image className={styles.img} alt='Photo' src='./b1.jpeg'/>
					<div  className={styles.img}>
						<Carousel autoplay >
								<div style={{zIndex:'0',position:'relative',backgroundColor:'',height:'70vh'}}>
									<Image objectFit='cover' w='100%' m="0" h='70vh' alt='Photo' src='https://cdn.shopify.com/s/files/1/0621/5162/2875/products/2022-05-24-websitebarbara-kate-sharon-3502_360x.jpg?v=1654503607'/>
		                       		<Text position='absolute' top='10px' ml='10px' w='' h='50px' bg='rgb(0,0,0,0.6)' fontSize='24px' fontFamily='Vilane Bold' color='#fff' p='2'>Ladies</Text>
		                       	</div>
		                       	<div style={{position:'relative',backgroundColor:'',height:'70vh'}}>
									<Image objectFit='cover' w='100%' m="0" h='70vh' alt='Photo' src='https://cdn.shopify.com/s/files/1/0621/5162/2875/products/0921034GOLDBLUE_1_0fc6d805-18f0-4838-b526-2cea680e9e79_360x.jpg?v=1645176485'/>
		                       		<Text position='absolute' top='10px' ml='10px' w='' h='50px' bg='rgb(0,0,0,0.6)' fontSize='24px' fontFamily='Vilane Bold' color='#fff' p='2'>Men</Text>
		                       	</div>
		                       	<div style={{position:'relative',backgroundColor:'',height:'70vh'}}>
									<Image objectFit='cover' w='100%' m="0" h='70vh' alt='Photo' src='https://cdn.shopify.com/s/files/1/0621/5162/2875/products/aofYOomiHt_360x.jpg?v=1658827825'/>
		                       		<Text position='absolute' top='10px' ml='10px' w='' h='50px' bg='rgb(0,0,0,0.6)' fontSize='24px' fontFamily='Vilane Bold' color='#fff' p='2'>New Arrivals</Text>
		                       	</div>
		                </Carousel>
	                </div>
				</Flex>
				<VStack mt='10px' bg=''>
					<Text fontSize='28px' m='0'>Ladies Collection</Text>
					<Flex flexWrap='wrap' justify='space-around' w='100vw'>
						{ladiescollection.map((item)=>{
							return(
								<div key={item.id} style={{margin:'5px 0',position:'relative',cursor:'pointer',height:'250px',width:'180px'}} onClick={(()=>{router.push(`ladies/${item.link}`)})}>
									<Image w='100%' h='100%' alt='Photo' src={item.img}/>
		                       		<Text position='absolute' top='25%' w='100px' overflow='wrap' left='9%' ml='10px'  bg='rgb(0,0,0,0.6)' fontSize='24px' fontFamily='Vilane Bold' color='#fff' p='2'>{item.title}</Text>
		                       	</div>
								)
						})}
					</Flex>
				</VStack>
				<VStack mt='10px' bg=''>
					<Text fontSize='28px' m='0'>Mens' Collection</Text>
					<Flex flexWrap='wrap' justify='space-around' w='100vw'>
						{mencollection?.map((item)=>{
							return(
								<div key={item.id} style={{margin:'5px 0',position:'relative',cursor:'pointer',height:'250px',width:'180px'}} onClick={(()=>{router.push(`men/${item.link}`)})}>
									<Image w='100%' h='100%' alt='Photo' src={item.img}/>
		                       		<Text position='absolute' top='25%' w='100px' overflow='wrap' left='9%' ml='10px'  bg='rgb(0,0,0,0.6)' fontSize='24px' fontFamily='Vilane Bold' color='#fff' p='2'>{item.title}</Text>
		                       	</div>
								)
						})}
					</Flex>
				</VStack>
				<Flex justify='space-around' bg='#eee'>
					<Flex direction='column' align='center' p='1' textAlign='center' m='2' >
						<StorefrontIcon />
						<Flex direction='column'>
							<Text fontSize='20px'>High-quality Goods</Text>
							<Text>Enjoy top quality<br /> items for less</Text>
						</Flex>
					</Flex>
					<Flex direction='column' align='center' p='1' textAlign='center' m='2' >
						<SupportAgentIcon />
						<Flex direction='column'>
							<Text fontSize='20px'>24/7 Livechat</Text>
							<Text>Get instant assistance <br /> whenever you need it</Text>
						</Flex>
					</Flex>
					<Flex direction='column' align='center' p='1' textAlign='center' m='2' >
						<LocalShippingIcon />
						<Flex direction='column'>
							<Text fontSize='20px'>Express Shipping</Text>
							<Text>Fast & reliable <br /> delivery options</Text>
						</Flex>
					</Flex>
					<Flex direction='column' align='center' p='1' textAlign='center' m='2' >
						<CreditScoreIcon />
						<Flex direction='column'>
							<Text fontSize='20px'>Secure Payment</Text>
							<Text>Multiple safe <br /> payment methods</Text>
						</Flex>
					</Flex>
				</Flex>
				
			</Stack>
		)
}

export default Home;

const ladiescollection = [
	{
		id:1,
		title:"tops",
		img:"https://imgaz1.chiccdn.com/os/202207/20220706212218_740.jpg.webp",
		link:"tops"
	},
	{
		id:2,
		title:"dresses",
		img:"https://imgaz1.chiccdn.com/os/202207/20220706212702_432.jpg.webp",
		link:"dresses"
	},
	{
		id:3,
		title:"shoes",
		img:"https://cdn.shopify.com/s/files/1/0621/5162/2875/products/Moxxalowheel-07.jpg?v=1645783028",
		link:"shoes"
	},
	{
		id:4,
		title:"accessories",
		img:"https://cdn.shopify.com/s/files/1/0621/5162/2875/products/fDUnR7Y8lc_360x.jpg?v=1654682900",
		link:"accessories"
	},
	{
		id:5,
		title:"exclusives",
		img:"https://imgaz1.chiccdn.com/thumb/wap/oaupload/newchic/images/E2/AA/8271a425-7a69-4386-99b8-68d8e5a4cb6f.jpg.webp?s=240x320",
		link:"exclusives"
	},
	{
		id:6,
		title:"bottoms",
		img:"https://imgaz1.chiccdn.com/os/202207/20220706213444_377.jpg.webp",
		link:"bottoms"
	},
]

const mencollection = [
	{
		id:1,
		title:"t-shirts",
		img:"https://imgaz1.chiccdn.com/thumb/wap/oaupload/newchic/images/33/9A/acd18ed4-96b9-4f71-b0d5-5ac39e725294.jpg.webp?s=240x320",
		link:"t-shirts"
	},
	{
		id:3,
		title:"shoes",
		img:"https://cdn.shopify.com/s/files/1/0621/5162/2875/products/KMmeY8rCVO.jpg?v=1652175444",
		link:"shoes"
	},
	{
		id:4,
		title:"accessories",
		img:"https://cdn.shopify.com/s/files/1/0621/5162/2875/products/Brands-0869_360x.jpg?v=1648126194",
		link:"accessories"
	},
	{
		id:5,
		title:"exclusives",
		img:"https://imgaz1.chiccdn.com/thumb/wap/oaupload/newchic/images/74/EA/06b4f554-9cf9-4c8d-b263-18e6c6ae5733.jpg.webp?s=240x320",
		link:"exclusives"
	},
	{
		id:6,
		title:"pants",
		img:"https://imgaz1.chiccdn.com/thumb/view/oaupload/newchic/images/14/11/d80e61fe-f727-499f-93be-75657e66760d.jpg.webp?s=360x480",
		link:"pants"
	},
]