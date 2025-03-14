import React from 'react'
import { Hero , LatestCollections , BestSeller , OurPolicy , NewsLetterBox} from '../components/index'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>


    </div>
  )
}

export default Home