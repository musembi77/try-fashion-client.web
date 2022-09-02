import React from 'react'
import {useRouter} from 'next/router'
import {
 Instagram,
 Twitter,
 Facebook
} from '@mui/icons-material'
import {Image,Stack,Flex,VStack,Text,Divider} from '@chakra-ui/react'
export default function Footer (){
  const router = useRouter()
 return(
 	<Flex direction='column' align='center' p='20px'>
 		<Text fontFamily='Vilane bold' fontSize='20px'>FOLLOW US</Text>
 		<Flex gap='4'>
 			<a href="https://www.instagram.com/try_fashion_ladies/" 
	            target="_blank"
	            rel="noopener noreferrer"
	            style={{margin:"2px",display:"flex"}}>
	                <Instagram style={{marginRight:"10px",fontSize:"1.2rem",color:""}}/>
	                <Text >try_fashion_ladies</Text>
	          </a >
	          <a href="https://www.instagram.com/try_fashion_men/" 
	          target="_blank"
	            rel="noopener noreferrer"
	          style={{marginTop:"2px",display:"flex"}}>
	              <Instagram style={{marginRight:"10px",fontSize:"1.2rem",color:""}}/>
	              <Text>try_fashion_men</Text>
	          </a >
 		</Flex>
 		<Text onClick={()=>{router.push('/')}}>T r y F a s h i o n</Text>
   		<Text style={{color:'#212222'}}>&copy; 2022 TryFashion</Text>
 	</Flex>
 )
}

const NFooter=()=>{
  const router = useRouter()
 return(
  <div style={{
               backgroundColor:"#212122",
               color:"#fff",
               padding:"20px",
               display:"flex",
               justifyContent:"space-around",
               fontSize:"0.7rem"
              }}>
    
  
    <div>
    <h5 style={{color:"#d2b48c"}}>LINKS</h5>
     <p onClick={()=>{router.push('/')}} style={{fontSize:"0.7rem"}}>Home</p>
     <p onClick={()=>{router.push('filter')}} style={{fontSize:"0.7rem"}}>Shop</p>
     <p onClick={()=>{router.push('filter')}} style={{fontSize:"0.7rem"}}>Women</p>
     <p onClick={()=>{router.push('filter')}} style={{fontSize:"0.7rem"}}>Men</p>

    </div>
    <div>
     <h5 style={{color:"#d2b48c"}}>CUSTOMER SERVICE</h5>
     <p style={{fontSize:"0.7rem"}}>Contact Us</p>
     <p style={{fontSize:"0.7rem"}}>About Us</p>
     <p style={{fontSize:"0.7rem"}}>Privacy Policy</p>
     <p style={{fontSize:"0.7rem"}}>Return Policy</p>
     <p style={{fontSize:"0.7rem"}}>Terms & Conditions</p>
    </div>
   </div>
 )
}
