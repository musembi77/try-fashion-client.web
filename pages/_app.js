import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
		<ChakraProvider>
			<Script src="https://www.paypal.com/sdk/js?client-id=Ac_M2cxYO1tz3Fy8eabJPN1A5yrpH1LCGYdZ9w78BMvRl2fBI_RMIFu5nEqkvP0fWiVKpw4rQwJMxwc6&currency=USD" />
				<Header />
		      	<Component {...pageProps} />
				<Footer />
	    </ChakraProvider>
  	)
  	
}

export default MyApp
