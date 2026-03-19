import React from 'react'

const PdfViewer = ({fileUrl}: {fileUrl: string | null}) => {
  console.log('Rendering PdfViewer with fileUrl:', fileUrl)
  return (
    <div>
      {fileUrl && (
        <iframe 
          src={fileUrl}
          className='h-[90vh] w-[50vw]'
        />
      )}
    </div>
  )
}

export default PdfViewer
