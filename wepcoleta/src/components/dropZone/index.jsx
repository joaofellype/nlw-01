import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import './styles.css'
const Dropzone = (props) => {
    
    const [selectedFileUrl, setSelectedFileUrl] = useState('')
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl)
        props.onFileUploaded(file)
    }, [props.onFileUploaded])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            {selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point thumbmail" />
                : (
                    <p>
                        <FiUpload />
                    Imagem do Estabelicimento</p>
                )
            }

        </div>
    )
}
export default Dropzone