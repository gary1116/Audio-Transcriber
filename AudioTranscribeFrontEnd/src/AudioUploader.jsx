import axios from 'axios';
import { useState } from 'react'

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');



    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            console.log(e.target.files);
            setFile(e.target.files[0]);
        }
    };

    const handleClick = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoader(true);
            const Response =await axios.post(
                'http://localhost:8080/api/transcribe',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            setResponse(Response.data);
        } catch (error) {
            setError(
                error.response?.data || 'Something went wrong while generating the image.'
            ); console.error("Error transcribing audio", error);
        }finally{
            setLoader(false)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center min-h-screen flex-col gap-5 bg-gray-800'>
                <h1 className='text-5xl font-bold font-mono text-white'>Audio To Text Transcriber</h1>
                <div className="">
                    <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        id='fileUpload'
                        onChange={handleChange}
                    />
                    {/* Custom button */}
                    <label
                        htmlFor="fileUpload"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                        Select Audio
                    </label>

                    {/* File name display */}
                    <span className="text-white p-2">{!file ? "No file chosen" : file?.name}</span>
                </div>
                <div>
                    <button className='p-2 text-white shadow-2xl bg-indigo-800 rounded-lg cursor-pointer' onClick={() => handleClick()}>Upload And Transcribe</button>
                </div>
                {loader &&<h1 className='text-2xl animate-bounce text-white'>Working on converting Speech to Text</h1>}
                {error && <h1 className='text-xl text-red-600'>Error Occurred: {error}</h1>}
                {!loader &&<div>
                    <h1 className='text-3xl text-white font-medium font-mono'>{response}</h1>
                </div>}
            </div>
        </>
    )
}

export default AudioUploader
