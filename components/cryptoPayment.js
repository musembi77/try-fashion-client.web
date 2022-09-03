import React,{useState} from 'react';
import {useRouter} from 'nect/router';

function Crypto(){
	const router = useRouter();
	const handlePay = async()=>{
		const res = await fetch('')
	}
	return (
		<div onClick={handlePay}>Pay with Crypto</div>
	)
}