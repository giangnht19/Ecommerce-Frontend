import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='description-box'>
      <div className="description-box-nav">
        <div className="description-box-nav-box">Description</div>
        <div className="description-box-nav-box-fade">Reviews (122)</div>
      </div>
      <div className="description-box-description">
        <p>Discover a seamless shopping experience at FashFRENZY, where we bring you the best in quality, variety, and customer service. Our mission is to provide you with an unparalleled online shopping experience, offering a wide range of products to meet all your needs.</p>
        <p>From the latest fashion trends and high-tech gadgets to everyday essentials and unique gifts, our diverse product catalog caters to all tastes and preferences. Explore our categories and find exactly what you need. We are committed to delivering products that meet the highest standards of quality. Each item in our store is carefully selected and rigorously tested to ensure it meets your expectations.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
