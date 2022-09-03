import React,{useState,useEffect} from 'react'
import { Flex,Text,Heading,Divider,Stack,Input,HStack,VStack,Button,Box } from '@chakra-ui/react'
import {Menu,ShoppingBagOutlined,Logout,AccountCircle,Close,Search} from '@mui/icons-material';
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios';

function Header (){
	//handle side menu bar
	const [showmenubar,setshowmenubar]=useState(false);
	const [id,setid]=useState('')
	//handle signin state
	const [issignedin,setissignedin]=useState(false);
	//handle router
	const router = useRouter();
	const cookies = new Cookies();
	let token = cookies.get('usertoken');

	 useEffect(()=>{
	    if(token){
	      let decoded = jwt_decode(token);
	      //console.log(decoded.id);
	      setid(decoded.id)
	      setisLoggedin(true)
	    }
	    if(!token){
	    	//router.push('/')
		}
	    //console.log('signedin')
	  },[token])
	const [isloggedin,setisLoggedin]=useState(false);


	return(
			<Flex p='1' justify='space-between' align='center' bg='#eee' cursor='pointer' >
				<Text fontSize='26px' fontFamily='Vilane Light' mb='0' onClick={(()=>{router.push('/')})}>  T R Y F A S H I O N </Text >
				<Flex gap='2' alignItems='center'>
					<ShoppingBagOutlined onClick={(()=>{router.push('/cart')})}/>
					{isloggedin ? 
						<Text mb='0' onClick={(()=>{router.push(`/profile/${id}`)})}>Account</Text>
						:
						<Text mb='0' onClick={(()=>{router.push('/register')})}>Sign In</Text>
					}					
					{showmenubar ? 
						<Close onClick={(()=>{setshowmenubar(!showmenubar)})}/>
							:
						<Menu onClick={(()=>{setshowmenubar(!showmenubar)})}/> 
					}
					{showmenubar ? 
						<MenuSideBar setshowmenubar={setshowmenubar} id={id} isloggedin={isloggedin} cookies={cookies}/>
							:
						null 
					}
				</Flex>

			</Flex>
		)
}

export default Header

const MenuSideBar=({id,isloggedin,cookies})=>{
	const [content,setContent]=useState("ladies")
	const [name,setname]=useState('')
	const [data,setdata]=useState('')

	const query = {
		name
	}
	const getProducts=async(e)=>{
		e.preventDefault()
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getproducts',{
				query
			}).then((res)=>{
				console.log(res.data)
				setdata(res.data)
				// setTimeout(()=>{
				// 	setisfetching(false)
				// },2000)
			})
		}catch(err){
			console.log(err)
		}
	}
	const router = useRouter()
	const men=[
		{name:"pants"},
		{name:"t-shirts"},
		{name:"accessories"},
		{name:"shoes"},
		{name:"shirts"},
	]
	const ladies=[
		{name:"dresses"},
		{name:"tops"},
		{name:"accessories"},
		{name:"shoes"},
		{name:"bottoms"},
	]
	
	return(
			<Stack justify='space-between' p='2' w='60vw' h='90vh' bg='rgb(255,255,255)' position='absolute' top='50px' right='5px' zIndex='2' >
				<Flex mt='3' direction='column' gap='2'>
					
						<form onSubmit={getProducts}>
						<Flex align='center' bg='#e5e5e5'>
							<Input placeholder='search items by name ' variant='unflushed' bg='#e5e5e5' onChange={((e)=>{setname(e.target.value)})} type='text'/>
							<Search onClick={getProducts} style={{padding:'5px',width:'40px',backgroundColor:'grey',height:'40px'}}/>
							</Flex>
						</form>
					
					<Divider />
					{data.length !== 0  && name !== ''? 
						<>
						{data?.slice(0,4).map((item)=>{
							return(
								<QueryResult key={item.id} item={item}/>
							)
						})}
						</>
						:
						<Flex direction='column'>
						<HStack justify='space-around' mb='3'>
						<Text w='50%' h='100%' mb='0' p='1' bg={content=== "ladies" ? "#000" : null} color={content=== "ladies" ? "#fff" : "#000"} onClick={(()=>{setContent("ladies")})}>L a d i e s</Text>
						<Divider orientation='vertical'/>
						<Text w='50%' h='100%' mb='0' p='1' bg={content=== "men" ? "#000" : null} color={content=== "men" ? "#fff" : "#000"} onClick={(()=>{setContent("men")})}>M e n</Text>
					</HStack>
					<Flex direction='column' >
					{content === "ladies" ?

							<Flex direction='column' gap='2'>
								{ladies.map((category)=>{
									return(
										<>
											<Text borderBottom='1px solid #000' onClick={(()=>{router.push(`/ladies/${category.name}`)})}>{category.name}</Text>
											
										</>
									)
								})}
							</Flex>
							:
							<Flex direction='column' gap='2'>
								{men.map((category)=>{
									return(
										<>
											<Text borderBottom='1px solid #000' onClick={(()=>{router.push(`/men/${category.name}`)})}>{category.name}</Text>
											
										</>
									)
								})}
							</Flex>
						}
					</Flex>
					</Flex>
					}
					
				</Flex>
				{isloggedin ? 
						<Flex direction='column'>
					
					<HStack mb='3' onClick={(()=>{router.push(`/profile/${id}`)})}>
						<AccountCircle />
						<Text >Account Settings</Text>
					</HStack>
					<HStack onClick={(()=>{cookies.remove('usertoken'); 
                          
                          setTimeout(()=>{
                            router.push('/');
                            router.reload();
                          },2000)
                          })}>
						<Logout />
						<Text >logout</Text>
					</HStack>
				</Flex>
						:
						null
					}
				
			</Stack>
		)
}

const QueryResult=({item})=>{
	return(
		<Flex onClick={(()=>{window.open(`/product/${item._id}`, '_blank');})} bg='#e5e5e5' p='2' align='center'>
			<Text>{item.name}</Text>
		</Flex>
	)
}