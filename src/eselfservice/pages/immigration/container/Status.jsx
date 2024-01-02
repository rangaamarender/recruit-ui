import React from 'react'

function Status() {
  return (
    <div className='rounded border p-2 mt-4'>
    <div className="formgrid grid m-2 ">
        <div className="col-12 md:col-4 mb-2">
            <label className='p-text-secondary'>I-9 Status</label>
            <p className="p-text-primary">{"Not Submited"}</p>
        </div>
        <div className="col-12 md:col-4  mb-2">
            <label className='p-text-secondary'>W4 Status</label>
            <p className="p-text-primary">{"---"}</p>
        </div>
        <div className="col-12 md:col-4  mb-2">

        </div>
        <div className="col-12 md:col-12 ">
            <label className='p-text-secondary'>Note</label>
            <p className="p-text-primary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text</p>
        </div>

    </div>
</div>
  )
}

export default Status