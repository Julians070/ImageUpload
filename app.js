const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');
const Cloudinary_URL = 'https://api.cloudinary.com/v1_1/dl5iwbnmv/image/upload';
const Cloudinary_Upload_Preset = 'rcnpwek1';
const imageUploaderBar = document.getElementById('img-progressBar');


// Para que funcione el método await se le da un async en el evento.
imageUploader.addEventListener('change', async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', Cloudinary_Upload_Preset);

    const resp = await axios.post(Cloudinary_URL, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        // Paramentro para capturar un metodo
        onUploadProgress(e){
            //Se redondea un número
            console.log(Math.round((e.loaded * 100) / e.total));
            const progress = (e.loaded * 100) / e.total;
            imageUploaderBar.setAttribute('value', progress);
        }
    });
    console.log(resp);
    imagePreview.src = resp.data.secure_url;
});
