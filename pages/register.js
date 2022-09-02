import React,{useState} from 'react'
import {Text,Image,Flex,Stack,Center,Container,Tabs, TabList, TabPanels, Tab, TabPanel,useToast,InputGroup,Input,InputRightElement,Button} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Visibility,VisibilityOff} from '@mui/icons-material'
import axios from 'axios';
import Cookies from 'universal-cookie';
import {useRouter} from 'next/router'

export default function Register(){
	return(
			<Flex>
				<Image src='./p1.jpg' className={styles.registerimage} objectFit='cover'/>
				<Center className={styles.registerbody} >
					<Container className={styles.registerbodyimg}/>
					<Flex bg='#fff' w='300px' h='' zIndex='1'>
						<Tabs isFitted variant='enclosed' w='300px'>
						  <TabList>
						    <Tab>S i g n I n</Tab>
						    <Tab>R e g i s t e r </Tab>
						  </TabList>
						  <TabPanels>
						    <TabPanel>
						      <SignIn />
						    </TabPanel>
						    <TabPanel>
						      <SignUp />
						    </TabPanel>
						  </TabPanels>
						</Tabs>
					</Flex>
					
				</Center>
			</Flex>
		)
}

const SignUp=()=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  const cookies = new Cookies();
  const router = useRouter();
  //get user
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [mobile,setmobile]=useState('');
  const [password,setpassword]=useState('');
  const [alert,setAlert]=useState('');

  const user={
    name,
    email,
    mobile,
    password
  }
  console.log(user)

  const handleRegister=()=>{
    try{
      axios.post('http://localhost:5000/api/register',{user})
      .then((res)=>{
        
        if(res.status === 200){
          console.log(res.data)
          cookies.set('usertoken', res.data, { path: '/' });
          router.push('/')
           toast({
              title: '',
              description: 'Successfully Signed up',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
        }
        if(res.status !== 200){
          return toast({
              title: '',
              description: res.data,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
        }
      })
    }catch(err){
      console.log(err)
    }
  }
  return(
    <Stack spacing={4}>
      <InputGroup>
        <Input required type='text' placeholder='Name' variant='flushed' onChange={((e)=>{setname(e.target.value)})}/>
      </InputGroup>
      <InputGroup>
        <Input required type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
      <InputGroup>
        <Input required value={mobile} type="tel" pattern="[0-7]{2}-[0-9]{3}-[0-9]{3}" placeholder='phone number' variant='flushed' onChange={((e)=>{setmobile(e.target.value)})}/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
          onChange={((e)=>{setpassword(e.target.value)})}
          required
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
            {show ? <VisibilityOff/> : <Visibility/>}
          </Button>
        </InputRightElement>
    </InputGroup>
    <Button
            mt={4}
            bg='#000'
            type='submit'
            color='#ffffff'
            borderRadius='0'
            onClick={handleRegister}
          >
            R e g i s t e r
          </Button>
          <Text fontSize={'11px'}>By Signing up you agree to our 
                    <a href="help/terms&conditions" 
                        target="_blank"
                        rel="noopener noreferrer" style={{color:'blue'}}> terms&conditions</a > and our <a href="help/privacypolicy" 
                        target="_blank"
                        rel="noopener noreferrer" style={{color:'blue'}}>privacy policy</a>.</Text>
    </Stack>
  )
}
const SignIn=()=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  const cookies = new Cookies();
  const router = useRouter();
  
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const user={
    email,
    password
  }
  console.log(user)

  const handleSignin=()=>{
    try{
      axios.post('https://try-fashion-admin-server.herokuapp.com/api/signin',{user})
      .then((res)=>{
        if(res.status === 200){
          console.log(res.data)
          cookies.set('usertoken', res.data, { path: '/' });
          router.back()
           toast({
              title: '',
              description: 'Successfully Signed in',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
        }
        if(res.status !== 200){
          return toast({
              title: '',
              description: res.data,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
        }
      })
    }catch(err){
      console.log(err)
    }
  } 
  return(
    <Flex justify='space-between' direction='column' gap='4'>
      <InputGroup>
        <Input required type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
          onChange={((e)=>{setpassword(e.target.value)})}
          required
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
            {show ? <VisibilityOff/> : <Visibility/>}
          </Button>
        </InputRightElement>
    </InputGroup>
    <Button
            mt={4}
            bg='#000'
            type='submit'
            color='#ffffff'
            borderRadius='0'
            onClick={handleSignin}
          >
            S i g n I n
          </Button>
    </Flex>
  )
}