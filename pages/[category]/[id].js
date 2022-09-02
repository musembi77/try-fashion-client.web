import React,{useState,useEffect} from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Text,
  Flex,
  HStack,
  Button,
  Select,
  Grid,
  Center
} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Product from '../../components/Product.js';
import axios from 'axios';
import Loading from '../../components/loading.js'

const items=[
	{	id:1,
		name:'Tops',
		price:'2000',
		size:[
			"m","xl"
		]
	},
	{
		id:2,
		name:'shoes',
		price:'2000',
		size:[
			"sm","l","xxl"
		]
	},
	{
		id:3,
		name:'dress',
		price:'2000',
		size:[
			"sm","m","xl"
		]
	},
	{
		id:4,
		name:'jeans',
		price:'2000',
		size:[
			"sm","m","xl"
		]
	},
]
export default function Category(){
	const router = useRouter();
	//console.log(router.query)
	const [isfetching,setisfetching]=useState(false)
	const [category,setcategory]=useState(router.query.type);
	const [subcategory,setsubcategory]=useState(router.query.id);

	const [name,setname]=useState('');
	const [data,setdata]=useState([]);
	
	const query = {
		category,
		subcategory,
		name
	}

	

	const getProducts=async()=>{
		setisfetching(true)
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getproducts',{
				query
			}).then((res)=>{
				console.log(res.data)
				
				setTimeout(()=>{
					setdata(res.data)
					setisfetching(false)
				},2000)
			})
		}catch(err){
			console.log(err)
		}
	}
	useEffect(()=>{
		getProducts()
		if(typeof window !== 'undefined'){
			console.log(window.location.href)
			let currentUrl = window.location.href.split('/');
			setcategory(currentUrl[3])
			setsubcategory(currentUrl[4])
			console.log(currentUrl)
		}
	},[name,category,subcategory,router])


		
	return(
			<Flex direction='column' p='2'>
				<Breadcrumb separator='>'>
				  <BreadcrumbItem>
				    <BreadcrumbLink >{router.query.category === "" ? category : router.query.category }</BreadcrumbLink>
				  </BreadcrumbItem>
				  <BreadcrumbItem>
				    <BreadcrumbLink >{router.query.id === "" ? subcategory : router.query.id }</BreadcrumbLink>
				  </BreadcrumbItem>
				</Breadcrumb>
				<HStack>
					<Select placeholder='Sort'>
						<option>price low to high</option>
						<option>price high to low</option>
						<option>A - Z</option>
						<option>Z - A</option>
					</Select>
					<Select placeholder='Size'>
						<option>small</option>
						<option>medium</option>
						<option>large</option>
						<option>xlarge</option>
						<option>xxlarge</option>
					</Select>
				</HStack>
					<Flex flexWrap='wrap' justify='space-around'>
					{isfetching ? 
						<Center h='80vh'>
							<Loading />
						</Center>
					:
					<>
						{data.length === 0 ? 
							<Text>We do not have any items you are looking for at the moment.</Text>
							:
						<>
							{data.map((item)=>{
								return(
									<div key={data.id}>
										<Product item={item}/>
									</div>
								)
							})}
							</>
						}
					</>
					}
					</Flex>
			</Flex>
		)
}