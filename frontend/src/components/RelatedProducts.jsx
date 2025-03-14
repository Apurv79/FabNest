import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({category, subCategory}) => {
    const {products} = useContext(shopContext)
    const [realated,setRelated] = useState([])

    useEffect(() => {
        if(products.length>0){
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter(item => item.category === category);
            productsCopy = productsCopy.filter(item => item.subCategory === subCategory);

           setRelated(productsCopy.slice(1,6));
        }
    },[products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'Related'} text2={'Products'} />

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                realated.map((item,index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }

        </div>
      
    </div>
  )
}

export default RelatedProduct