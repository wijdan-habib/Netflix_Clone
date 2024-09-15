import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthScreen() {
  const [email, setEmail] = useState('')
  return (
    <div className='hero-bg h-screen relative'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img src="/netflix-logo.png" alt="" className='w-32 md:w-52' />
            <Link to={"/login"} className='text-white bg-red-600 py-1 px-3 rounded'>Sign In</Link>
        </header>
        <div className='flex flex-col items-center justify-center text-center py-36 text-white max-w-3xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-extrabold'>Unlimited movies, Tv shows, and more</h1>
          <p className='text-2xl font-bold mb-4 my-5'>Starts at RS 250. Cancel anytime</p>
          <p className='mb-4 font-semibold text-lg'>Ready to watch? Enter your email to create or restart your membership </p>
          <form className='flex flex-col md:flex-row gap-4 w-3/4'>
            <input type="text" placeholder='Email address' className='p-4 rounded flex-1 bg-black/80 border border-gray-700' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>Get started
              <ChevronRight className='size-8 md:size-10'/>
            </button>
          </form>
        </div>
    </div>
  )
}
