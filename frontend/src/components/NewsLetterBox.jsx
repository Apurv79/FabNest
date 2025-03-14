import React from "react";

const NewsLetterBox = () => {
    const onSubmitHandler = (e) => {    
        e.preventDefault();
        alert("Subscribed Successfully");
    };



  return (
    <div className="text-center">
      <p className="text-gray-800 text-2xl font-medium">
        Subscribe now to get 20% off on your first order
      </p>
      <p className="tex-gray-400 mt-3">
        Get latest updates and offers on your email
      </p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"  onSubmit={onSubmitHandler}>
        <input type="email"  placeholder="Enter Your Mail" 
        className="w-full sm:flex-1 outline-none " 
        required />
        <button type="submit" className="bg-black text-white tex-white text-xs px-10 py-4 ">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
