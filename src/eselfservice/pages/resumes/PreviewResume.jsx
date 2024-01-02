import React from 'react'

function PreviewResume({selectedFile}) {
  return (
    <div>
    <h2>Preview</h2>
    <p>File Name: {selectedFile.name}</p>
    {/* Display the file preview component here */}
    <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
</div>
  )
}

export default PreviewResume