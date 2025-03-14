import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='border-t pt-16'>
      <div className='text-center mb-12'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='max-w-4xl mx-auto'>
        {/* Story section with image */}
        <div className='mb-12 flex flex-col md:flex-row gap-8 items-center'>
          <div className='w-full md:w-1/2'>
            <img 
              src={assets.about_img}
              className='rounded-3xl w-full h-[400px] object-cover'
            />
          </div>
          <div className='w-full md:w-1/2'>
            <h2 className='text-2xl font-semibold mb-4'>Our Story</h2>
            <p className='text-gray-600 leading-relaxed'>
              Founded in 2023, our fashion e-commerce platform brings together the latest trends and timeless classics.
              We believe in making quality fashion accessible to everyone while maintaining sustainable practices.
            </p>
          </div>
        </div>

        <div className='mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
          <p className='text-gray-600 leading-relaxed'>
            To provide our customers with high-quality, trendy fashion pieces at reasonable prices while ensuring
            an exceptional shopping experience from browse to delivery.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <div className='text-center p-6 border rounded-lg'>
            <h3 className='text-xl font-medium mb-2'>Quality First</h3>
            <p className='text-gray-600'>We ensure all our products meet the highest quality standards</p>
          </div>
          <div className='text-center p-6 border rounded-lg'>
            <h3 className='text-xl font-medium mb-2'>Customer Service</h3>
            <p className='text-gray-600'>24/7 support to help you with any questions or concerns</p>
          </div>
          <div className='text-center p-6 border rounded-lg'>
            <h3 className='text-xl font-medium mb-2'>Fast Delivery</h3>
            <p className='text-gray-600'>Quick and reliable shipping to get your items to you</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About