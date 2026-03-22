        const handleClick = async () => {
            const formData = new FormData();
            formData.append('file', file);

            try {
                setLoader(true);

                const Response = await axios.post(
                    'http://localhost:8080/api/transcribe',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                );

                setResponse(Response.data);

            } catch (error) {
                setError(
                    error.response?.data || 'Something went wrong while generating the image.'
                );
                console.error("Error transcribing audio", error);

            } finally {
                setLoader(false);
            }
        };




# Explanation

        const formData = new FormData();

        👉 Creates a special object to send files

        Think of it like:

        Key → Value
        file → (your audio file)

        👉 Used when:

        Uploading files
        Sending binary data
        🔹 2. formData.append('file', file);

        👉 Adds your file into request body

        'file' → must match backend
        @RequestParam("file") MultipartFile file
        file → actual selected audio
        🔹 3. setLoader(true);

        👉 UI logic (React)

        Shows loading state
        Example: "Transcribing..."
        🔹 4. await axios.post(...)

        👉 This is the core part

        Let’s break it 👇

        🔥 AXIOS POST STRUCTURE
        axios.post(url, data, config)
        🔹 A. URL
        'http://localhost:8080/api/transcribe'

        👉 Backend endpoint

        🔹 B. DATA (VERY IMPORTANT)
        formData

        👉 This becomes the request body

        What actually gets sent:
        POST /api/transcribe
        Content-Type: multipart/form-data

        file: (binary audio file)
        🔹 C. CONFIG (headers)
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }

        👉 Tells backend:

        “I am sending a file, not JSON”

        ⚠️ Important note (advanced)

        Axios can automatically set this header.
        Sometimes you can even skip it.

        🔹 5. const Response = await axios.post(...)

        👉 await means:

        “Wait until server responds”

        Without await:

        Response = Promise ❌

        With await:

        Response = actual response ✅
        🔹 6. What is inside Response?

        Example:

        {
        data: "I am Gary",
        status: 200,
        headers: {...}
        }

        