import { useState } from 'react';

export default function EmailBar({ openReply, setOpenReply }) {
  function composeEmail() {
    return (
      <>
        <div className='z-10 absolute bottom-0 right-5 bg-slate-100 h-80 w-80 p-2'>
          <div className='relative'>
            <input
              className='h-8 border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 mr-1'
              type='text'
              placeholder='To'
            />
            <button
              type='button'
              className='px-3 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
              onClick={() => {
                setOpenReply(false);
                console.log(openReply);
              }}
            >
              X
            </button>
            <textarea
              className='border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 mt-2'
              type='textarea'
              placeholder='Subject'
            />
          </div>
          <div className='flex'>
            <button
              type='button'
              className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mr-1'
              onClick={() => {}}
            >
              Send
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-4 h-9 text-center mb-1 mt-1'>
        <div>
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
            onClick={() => {
              setOpenReply(true);
              console.log(openReply);
            }}
          >
            Reply
          </button>
        </div>
        <div>
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
            onClick={() => {}}
          >
            Forward
          </button>
        </div>
        <div>
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
            onClick={() => {}}
          >
            Delete
          </button>
        </div>
        <div>
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
            onClick={() => {}}
          >
            Mark As Unread
          </button>
        </div>
      </div>
      <div>{openReply ? composeEmail() : <div></div>}</div>
    </div>
  );
}
