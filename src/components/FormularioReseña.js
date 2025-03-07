import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const FormularioReseña = ({ onSuccess, showForm }) => {
    const [formStyle, setFormStyle] = useState({
        display: 'none',
        opacity: 0,
        transform: 'translateY(-20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
    });

    useEffect(() => {
        if (showForm) {
            setFormStyle(prevStyle => ({
                ...prevStyle,
                display: 'block'
            }));
            setTimeout(() => {
                setFormStyle({
                    display: 'block',
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease'
                });
            }, 10);
        } else {
            setFormStyle(prevStyle => ({
                ...prevStyle,
                opacity: 0,
                transform: 'translateY(-20px)'
            }));
            setTimeout(() => {
                setFormStyle(prevStyle => ({
                    ...prevStyle,
                    display: 'none'
                }));
            }, 300);
        }
    }, [showForm]);

    const [formData, setFormData] = useState({
        name: '',
        job: '',
        badge: '',
        title: '',
        review: '',
        profileImage: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 800,
                    useWebWorker: true
                });

                setFormData(prevState => ({
                    ...prevState,
                    profileImage: compressedFile
                }));

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
                toast.error('Hubo un error al comprimir la imagen');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.profileImage) {
            toast.error('Por favor, selecciona una imagen de perfil');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

            try {
                const response = await axios.post(`https://ivanchenkoel7.dev/api/reseñas/`, {
                    name: formData.name,
                    job: formData.job,
                    badge: formData.badge,
                    title: formData.title,
                    review: formData.review,
                    image_base64: base64String
                });

                if (response.status === 201) {
                    toast.success('Reseña enviada exitosamente');
                    onSuccess && onSuccess();
                    setFormData({
                        name: '',
                        job: '',
                        badge: '',
                        title: '',
                        review: '',
                        profileImage: null
                    });
                    setImagePreview(null);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Hubo un error al enviar la reseña');
            }
        };

        reader.readAsDataURL(formData.profileImage);
    };

    const getBadgeClass = (badge) => {
        switch (badge) {
            case 'verdecito':
                return 'jedi-verde';
            case 'azulito':
                return 'jedi-azul';
            case 'rojito':
                return 'sith';
            case 'amarillito':
                return 'the-force';
            default:
                return '';
        }
    };

    return (
        <div className="form-container" style={formStyle}>
            <form className="form-review" onSubmit={handleSubmit}>
                <h2>Deja tu reseña</h2>
                
                <div className="form-group">
                    <label htmlFor="profileImage">
                        {imagePreview ? 'Cambiar imagen' : 'Imagen de perfil:'}
                    </label>
                    <input 
                        type="file" 
                        id="profileImage" 
                        name="profileImage"
                        accept="image/*" 
                        onChange={handleFileChange}
                        required 
                        style={{ color: '#fff' }}
                    />
                    {imagePreview && (
                        <img 
                            src={imagePreview} 
                            alt="Vista previa" 
                            className={`img__profile-preview`}
                            style={{ 
                                width: '120px', 
                                height: '120px', 
                                borderRadius: '50%',
                                marginTop: '10px' 
                            }} 
                        />
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="job">Profesión:</label>
                    <input 
                        type="text" 
                        id="job" 
                        name="job"
                        value={formData.job}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="badge">Tipo de Jedi:</label>
                    <select 
                        id="badge" 
                        name="badge"
                        value={formData.badge}
                        onChange={handleInputChange}
                        required
                        className={getBadgeClass(formData.badge)}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="verdecito">Jedi Verde</option>
                        <option value="azulito">Jedi Azul</option>
                        <option value="rojito">Sith</option>
                        <option value="amarillito">The Force</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="title">Título de la reseña:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="review">Tu reseña:</label>
                    <textarea 
                        id="review" 
                        name="review" 
                        maxLength="150"
                        value={formData.review}
                        onChange={handleInputChange}
                        required
                        className={`${getBadgeClass(formData.badge)}`}
                    ></textarea>
                    <small>Máximo 150 caracteres</small>
                </div>

                <button 
                    type="submit"
                    style={{
                        '--font-color': '#ecf805'
                    }}
                >
                    Enviar Reseña
                </button>
            </form>
        </div>
    );
};

export default FormularioReseña;