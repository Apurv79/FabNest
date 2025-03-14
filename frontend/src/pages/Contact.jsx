import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
 const  onsubmitHandler = (e) => {  
    e.preventDefault();
  }
  return (
    <div className='border-t pt-16'>
      <div className='text-center mb-12'>
        <Title text1={'Contact'} text2={'Us'} />
        <p className='text-gray-600 mt-4'>We'd love to hear from you. Please fill out this form or shoot us an email.</p>
      </div>

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20'>
        {/* Contact Information */}
        <div className='bg-gray-50 p-8 rounded-2xl'>
          <h2 className='text-xl font-semibold mb-6'>Get in Touch</h2>
          <div className='space-y-6'>
            <div>
              <h3 className='font-medium mb-2'>Email</h3>
              <p className='text-gray-600'>support@fashionstore.com</p>
            </div>
            <div>
              <h3 className='font-medium mb-2'>Phone</h3>
              <p className='text-gray-600'>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className='font-medium mb-2'>Address</h3>
              <p className='text-gray-600'>123 Fashion Street<br />New York, NY 10001</p>
            </div>
            <div>
              <h3 className='font-medium mb-2'>Social Media</h3>
              <div className='flex gap-4'>
                <a href="#" className='text-gray-600 hover:text-black'>Instagram</a>
                <a href="#" className='text-gray-600 hover:text-black'>Facebook</a>
                <a href="#" className='text-gray-600 hover:text-black'>Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='bg-white p-8 rounded-2xl shadow-sm border'>
          <form className='space-y-6' onSubmit={onsubmitHandler}>
            <div>
              <label className='block text-sm font-medium mb-2'>Name</label>
              <input 
                type="text" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
                placeholder='Your name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input 
                type="email" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
                placeholder='you@example.com'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Subject</label>
              <input 
                type="text" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
                placeholder='How can we help?'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>Message</label>
              <textarea 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 h-32'
                placeholder='Your message...'
              ></textarea>
            </div>
            <button 
              type='submit'
              className='w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      
    </div>
  )
}

export default Contact