import React,{useRef,useState} from 'react';
import {useRouter} from 'next/router';

function PayPal({total}){
	const router = useRouter();
	const paypal = useRef();

	console.log(typeof(total))
	const price = (total * 0.00962).toFixed(2)
	console.log(price)

	const [paid,setPaid]=useState(false)
	const [error,setError]=useState(false)

	if(paid){
		console.log('success')
		return <div>Payment Successful !</div>
	}

	//error occurs
	if(error){
		console.log(err)
		return <div>An Error occured in processing payment. Contact support or try again in a few minutes !</div>
	}

	const HandlePay=()=>{

		window.paypal
			.Buttons({
				style:{
					shape:'rect',
					color:'white',
					layout:'horizontal',
					label:'paypal',
				},
				createOrder: (data,actions,err) => {
						return actions.order.create({
							intent: "CAPTURE",
							purchase_units: [
								{
									desription: " try-fashions -paypal checkout",
									amount: {
										currency_code: "USD",
										value: price
									},
								},
							],
						});
					},
					onApprove: async(data,actions)=>{
						const order = await actions.order.capture();
						console.log(order);
						router.push('/cart')
					},
					onError: (err)=>{
						console.log(err);
					},			
				})
				.render(paypal.current);
	}
	return <div ref={paypal} onClick={HandlePay}>Pay with PayPal</div>
}

export default PayPal;