import React,{useState} from 'react'
import {Text,Image,Flex,Stack,Center,Container,Button} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Visibility,VisibilityOff} from '@mui/icons-material'
import Loading from '../components/loading.js'
export default function PaymentRedirect(){
	return(
			<Flex>
				<Image src='./p1.jpg' className={styles.registerimage} objectFit='cover'/>
				<Center className={styles.registerbody} >
					<Container className={styles.registerbodyimg}/>
					<Flex p='2' bg='#fff' w='300px' h='400px' zIndex='1' direction='column'>
						<Text fontSize='28px' align='Center'>Wait as We Process your Payment</Text>
						<Loading />
					</Flex>
					
				</Center>
			</Flex>
		)
}