import React from 'react'

const PdfViewer = ({fileUrl}: {fileUrl: string}) => {
  return (
    <div>
        <iframe 
            src={fileUrl}
            className='h-[90vh] w-[50vw]'
        />
    </div>
  )
}

export default PdfViewer
