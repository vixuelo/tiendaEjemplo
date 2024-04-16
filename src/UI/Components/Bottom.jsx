import React from 'react'

export const Bottom = () => {
  return (<>
      <footer className=''>
     <div className="vw-100 d-inline-block justify-content-end">
     <div className='d-flex flex-column  '>
      <div className="padding-footer row  ">
        <div className='col'  >
          <div className=""><img src="\src\assets\Layout\Brand\logo-colored.png" alt="" /></div>
          <div className="brandPhrase">Best information about the company gies here but now lorem ipsum is</div>

          <div ><img src="\src\assets\Layout\social\social.png" alt="" /></div>
        </div>
        
          <div className="col-1 about  ">
            <h5 className='fw-bold'>About</h5>
            <p
              className='text-secondary'
              >About Us <br /> Find store <br /> Categories <br /> Blogs </p>

                </div>
          <div className="col-1 partner">
            <h5 className='fw-bold'>Partnership</h5>
           <p
            className='text-secondary'
            > About Us <br /> Find store <br /> Categories <br /> Blogs </p>

                </div>
          <div className="col-1 info">
            <h5 className='fw-bold'>Information</h5>
            <p
              className='text-secondary'
              >Help center <br /> Money Refund <br /> Shipping <br /> Contact us </p>

          </div>
          <div className="col-1 users">
            <h5 className='fw-bold'>For users</h5>
            <p
              className='text-secondary'
              >Login <br /> Register <br /> Settings <br /> My order </p>

          </div>
          <div className="col-1 app">
            <h5 className='fw-bold'>Get App </h5>
            <img className="pb-2"src="\src\assets\GetApp\apple.png" alt="" />
            <img src="\src\assets\GetApp\android.png" alt="" />

          </div>
        </div>
      </div>
     <div className=" footfooter w-100"
        
        >
          <div className="w-100 px-5 pt-2 pb-2 d-inline-flex">
         
     <div className='w-50 '>© 2023 Ecommerce. </div>
        <div className='w-50  text-end'>  <img className='imgLan' 
        
        src="\src\assets\Flags\USA\flag.svg" alt="" /> English ▲</div>
        </div>
        

        </div>
     </div>
    </footer>
    
  </>
  )
}
