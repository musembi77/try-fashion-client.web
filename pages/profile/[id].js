import {useState,useEffect} from 'react'
import {Text,Flex,VStack,Stack,Image,Input,Button,useToast} from '@chakra-ui/react'
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'
import Loading from '../../components/loading.js';
import axios from 'axios'
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export default function Profile(){
	//handle profile editting
	const [editprofile,seteditprofile]=useState(false);
	const [data,setdata]=useState('');

	const router = useRouter();
	const toast = useToast();
    const cookies = new Cookies();
    let token = cookies.get('usertoken');

    const getUser= async ()=>{
        try{
            if(!token || token === null){
                router.push('/')
                return console.log('no token found, please sign in')
            }
            await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getuser',{
                token
            }).then((res)=>{
                console.log(res.data)
                setdata(res.data)
            }).catch((err)=>{
                console.log(err);
            })
        }catch(err){
            console.log(err)
        }
    }
    const deleteUser= async ()=>{
        try{
            if(!token || token === null){
                router.push('/')
                return console.log('no token found, please sign in')
            }
            await axios.post('https://try-fashion-admin-server.herokuapp.com/api/deleteuser',{
                token
            }).then((res)=>{
                console.log(res.data)
                if(res.status === 201){
                return toast({
	              title: '',
	              description: res.data,
	              status: 'error',
	              duration: 9000,
	              isClosable: true,
	            });
            }
            if(res.status === 200){
            	router.push('/')
                return toast({
	              title: '',
	              description: res.data,
	              status: 'success',
	              duration: 9000,
	              isClosable: true,
	            });
            }
                
            }).catch((err)=>{
                console.log(err);
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getUser();
    },[]);

	return(
		<Stack p='2'>
			<Text fontFamily='Vilane Bold' fontSize='20px' textDecoration='underline solid #000 1.5px'>Personal Details</Text>
			<Flex direction='column' gap='4'>
				{editprofile ? 
					<>
						<Input placeholder='Name' value={data?.name} />
						<Input placeholder='Email' value={data?.email} />
						<Input placeholder='Mobile' value={data?.mobile} />
						<Input placeholder='Address' value={data?.adress} />
						<Button onClick={(()=>{seteditprofile(false)})}>Update Profile </Button>
					</>
					:
					<>
					<Text><span style={{fontFamily:'Vilane Bold'}}>Name  </span> : {data?.name} </Text>
					<Text><span style={{fontFamily:'Vilane Bold'}}>Email </span>  : {data?.email} </Text>
					<Text><span style={{fontFamily:'Vilane Bold'}}>Mobile </span> : {data?.mobile} </Text>
					<Text><span style={{fontFamily:'Vilane Bold'}}>Address</span> : {data?.adress} </Text>
					<Button onClick={(()=>{seteditprofile(true)})}>Edit Profile </Button>
					</>
			}
			</Flex>
			
			<Text fontFamily='Vilane Bold' fontSize='20px' textDecoration='underline solid #000 1.5px'>Security</Text>
			<Input placeholder="password" type='password' value={data?.password}/>
			<Button onClick={deleteUser} bg='red' color='#fff'>Delete Account</Button>
		</Stack>
	)
}
const favorites =[
	{name:'jj'},
	{name:'jj'},
	{name:'jj'},
]
const Favourites=()=>{
	return(
			<Flex w='175px' h='250px' direction='column' m='1'>
				<Image w='100%' h='200px' alt='Photo' src='https://cdn.shopify.com/s/files/1/0472/5617/4755/products/image_843ef9b0-8ec1-4d5e-a01e-4a02a00f3ac3_370x.jpg?v=1653032219'/>
				<Text>Name</Text>
				<Button>Remove</Button>
			</Flex>
		)
}

const StyledDiv = styled.div`
    display: flex;
    margin: 0 10px;
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;  
    padding: 5px
`