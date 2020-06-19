import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet";
import { ToastContainer, toast } from 'react-toastify';
import Dropzone from '../../components/dropZone/index'
import 'react-toastify/dist/ReactToastify.css';

import './style.css'
import api from '../../services/api'
import axios from 'axios'
const CreatePoint = () => {


    const [items, setItems] = useState([]);
    const [urlImage,setUrlImage] = useState('')
    const [uf, setUf] = useState([]);
    const [citys, setCitys] = useState([]);
    const [selectCity, setSelectCity] = useState('0');
    const [selectUf, setSelectUf] = useState('0');
    const [selectedFile, setSelectedFile] = useState(null)
    const [initinalPosition, setInitinalPosition] = useState([0, 0])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });
    const [selectedItems, setSelectedItems] = useState([])



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude)

            setInitinalPosition([latitude, longitude])
        })
    }, [])
    useEffect(()=>{
        console.log(selectedFile)
        
            const data = new FormData()
            data.append('image',selectedFile)
            api.post('image',data).then(response=>{
                setUrlImage(response.data.message)

            })

        
    },[selectedFile])
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitinals = response.data.map(el => el.sigla)
            setUf(ufInitinals)
        })

    }, []);
    useEffect(() => {
        if (selectUf === '0') {
            return;
        }
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectUf}/municipios`).then(response => {
            const cityNames = response.data.map(el => el.nome);
            setCitys(cityNames);
        })


    }, [selectUf]);
    const handleSelectUf = (event) => {
        const UF = event.target.value;

        setSelectUf(UF)
    }
    const handleSelectCity = (event) => {
        const city = event.target.value;

        setSelectCity(city)
    }
    const handleChangeInput = (event) => {

        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSetMap = (event) => {

        const { lat, lng } = event.latlng
        console.log(lat)
        setInitinalPosition([lat, lng])
    }
    const handleSelectedItems = (item) => {
        const alreadySelected = selectedItems.findIndex(iten => iten === item);
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(iten => iten != item);
            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([...selectedItems, item])

        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        const { name, email, whatsapp } = formData;
        const uf = selectUf;
        const image = urlImage;
        const city = selectCity;
        const [latitude, longitude] = initinalPosition;
        const items = selectedItems
        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items,
            image

        }
        await api.post('points', data);
        setFormData({
            name: '',
            email: '',
            whatsapp: ''
        })
        setSelectedItems([])
        toast.success('Salvo com Sucesso', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div id="page-create-point">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiLogIn />
                            Voltar para Home
                        </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <Dropzone onFileUploaded={setSelectedFile} />
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input
                            onChange={handleChangeInput}
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                        />
                    </div>
                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="email">Email da Entidade</label>
                            <input
                                onChange={handleChangeInput}
                                type="email"
                                name="email"
                                value={formData.email}
                                id="email" />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                onChange={handleChangeInput}
                                type="text"
                                value={formData.whatsapp}
                                name="whatsapp"
                                id="whatsapp" />
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o Endereço no Mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (uf)</label>
                            <select value={selectUf} onChange={handleSelectUf} name="uf" id="uf">
                                <option value="0">Selecione o UF</option>
                                {uf.map(elements => (

                                    <option key={elements} value={elements}>{elements}</option>

                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select onChange={handleSelectCity} value={selectCity} name="city" id="city">
                                <option value="0">Selecione a cidade</option>
                                {citys.map(elements => (

                                    <option key={elements} value={elements}>{elements}</option>

                                ))}
                            </select>
                        </div>
                    </div>
                    <Map onclick={handleSetMap} center={initinalPosition} zoom={15}>
                        <TileLayer
                            attribution='&amp;scopy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={initinalPosition} />
                    </Map>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Seleciona um ou mais itens</span>
                    </legend>
                    <ul className="items-grid">

                        {items.map(element => (
                            <li className={selectedItems.includes(element.id) ? 'selected' : ''} onClick={() => handleSelectedItems(element.id)} key={element.id}>
                                <img src={element.image_url} alt="teste" />
                                <span>{element.title}</span>
                            </li>
                        ))}


                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>

            </form>
        </div>
    )
}

export default CreatePoint 