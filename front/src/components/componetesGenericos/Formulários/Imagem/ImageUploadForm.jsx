import React from 'react';
import { POST_UPLOAD_IMAGEM } from '../../../../Api';
import { UserContext } from '../../../../UserContext';


const ImageUploadForm = (props) => {
  const user = React.useContext(UserContext);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [produtoId, setProdutoId] = React.useState(props.id);
  const [message, setMessage] = React.useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    handleSubmit();
    };

    const handleSubmit = async () => {    
        const formData = new FormData();
        selectedImages.forEach((image, index) => {
          formData.append('files', image, image.name);
        });
        formData.append('produtoId', produtoId);
    
        try {
            const { url, options } = POST_UPLOAD_IMAGEM(formData, user.data.token);
            const response = await fetch(url, options);
    
          if (response.status === 201) {
            setMessage('Imagens salvas com sucesso.');
          } else {
            setMessage('Ocorreu um erro ao salvar as imagens.');
          }
        } catch (error) {
          console.error('Erro:', error);
          setMessage('Ocorreu um erro ao enviar as imagens.');
        }
      };

  return (
    <div>
      <div>
        <label htmlFor="images">Selecione as imagens:</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />
      </div>
    {message && <p>{message}</p>}
  </div>
  )
}

export default ImageUploadForm