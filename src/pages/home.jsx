import React from 'react'
import Navbar from '../components/Navbar'
import bgimg from '/src/assets/bg_image.jpg'
import KDramaList from '../components/DramaList'
import Drama from './Drama'
import DrawerDefault from '../components/Drawer'

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className='pt-20 h-[100vh] w-[100vw] flex' 
    // style={{ backgroundImage: `url(${bgimg})` }}
    >
        {/* <img className='h-full w-full object-fill' src={bgimg} alt=""  /> */}
        {/* <DrawerDefault/> */}
        <Drama />
    </div>

    {/* <KDramaList /> */}
    </>
  )
}

// import React from 'react';
// import Navbar from '../components/Navbar';
// import bgimg from '/src/assets/bg_image.jpg';
// import Drama from './Drama';

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <div
//         className="pt-20 h-screen w-screen bg-cover bg-center bg-no-repeat relative"
//         style={{ backgroundImage: `url(${bgimg})` }}
//       >
//         {/* Overlay to darken the background for better readability */}
//         <div className="absolute inset-0 bg-black opacity-50"></div>

//         {/* Content over the background */}
//         <div className="relative z-10 text-white p-8">
//           <Drama />
//         </div>
//       </div>
//     </>
//   );
// }