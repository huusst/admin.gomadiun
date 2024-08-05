import { React, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import ReactPaginate from 'react-paginate';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faEdit, faEye, faTimes, faTrash, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getCroppedImg } from '../../components/croopingImg';
import Cropper from 'react-easy-crop';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min.js';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

const TableWisata = ({ role, id_admin_login }) => {
    const navigate = useNavigate();
    const [DataWisata, setDataWisata] = useState([]);
    const [DataDetailAdminVerifikator, setDataDetailAdminVerifikator] = useState([]);
    const [DataAdminOption, setDataAdminOption] = useState([]);
    const [DataAdminDinasOption, setDataAdminDinasOption] = useState([]);
    const [DataAdminPengelolaOption, setDataAdminPengelolaOption] = useState([]);
    const [DataDesaWisataOption, setDataDesaWisataOption] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [showModalDetailAdmin, setShowModalDetailAdmin] = useState(false);
    const [isClosingDetailAdmin, setIsClosingDetailAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [isClosingEdit, setIsClosingEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [isClosingDelete, setIsClosingDelete] = useState(false);
    const [showModalFormVerifikasi, setShowModalFormVerifikasi] = useState(false);
    const [isClosingFormVerifikasi, setIsClosingFormVerifikasi] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatar2, setAvatar2] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea2, setCroppedArea2] = useState(null);
    const [crop2, setCrop2] = useState({ x: 0, y: 0 });
    const [zoom2, setZoom2] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedImage2, setCroppedImage2] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [showCropper2, setShowCropper2] = useState(false);
    const [searchTerm, setKeyword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [responseMessageStatus, setResponseMessageStatus] = useState('');
    const [AlertaddImage, setAlertaddImage] = useState('');

    const [formData, setFormData] = useState({
        id_admin: '',
        id_desaWisata: '',
        id_admin_pengelola: '',
        nama_destinasi: '',
        nib_destinasi: '',
        kbli_destinasi: '',
        alamat_destinasi: '',
        status_wisata: '',
        npwp_pemilik_destinasi: '',
        npwp_destinasi: '',
        status_jalan: '',
        jenis_kendaraan: '',
        desk_destinasi: '',
        harga_tiket: '',
        kontak_person_destinasi: ''
    });

    const [formDataEdit, setFormDataEdit] = useState({
        id_admin: '',
        id_desaWisata: '',
        id_admin_pengelola: '',
        nama_destinasi: '',
        nib_destinasi: '',
        kbli_destinasi: '',
        alamat_destinasi: '',
        status_wisata: '',
        npwp_pemilik_destinasi: '',
        npwp_destinasi: '',
        desk_destinasi: '',
        status_jalan: '',
        jenis_kendaraan: '',
        harga_tiket: '',
        kontak_person_destinasi: '',
        sampul_destinasi: '',
        ruang_destinasi: '',
        id_wisata: '',
    });

    const [DataDelete, setDataDelete] = useState({
        id: '',
        name: '',
        sampul_desawisata: ''
    });

    const [DataDetailAdmin, setDataDetailAdmin] = useState({
        jenis_detail: '',
        username: '',
        nama_lengkap: '',
        role: '',
        sampul_admin: ''
    });

    const [DataFormVerifikasi, setDataFormVerifikasi] = useState({
        id_wisata: '',
        id_admin: '',
        username: '',
        nama_lengkap: '',
        sampul_admin: '',
        status_verifikasi: ''
    });



    const searchKeyword = (event) => {
        setLoading(true);
        setDataWisata([])
        const value = event.target.value;
        setKeyword(value);
        debounceGetData(value);
    };

    const debounceGetData = useCallback(
        debounce((value) => {
            getData(value);
        }, 1000),
        []
    );

    const getDataOption = async () => {
        setLoading(true);
        setDataAdminOption([])
        setDataAdminDinasOption([])
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/option/adminpengelola`;

            const response = await axios.get(url);
            if (response) {
                setDataAdminOption(response.data.data)

                if (role === "admin") {

                    try {
                        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/option/admindinas`;

                        const response = await axios.get(url);
                        if (response) {
                            setDataAdminDinasOption(response.data.data)
                            setLoading(false);
                        }
                    } catch (error) {
                        if (error.response.status === 401) {
                            navigate('/');
                            setLoading(false);
                        }
                        else {
                            console.log(error.response)
                            setLoading(false);
                        }
                    }
                }

            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/');
                setLoading(false);
            }
            else {
                console.log(error.response)
                setLoading(false);
            }
        }
    };

    const getData = async (searchTerm = '') => {
        setLoading(true);
        setDataWisata([])
        try {
            let url = null;
            if (role === "admin" || role === "dinas") {
                getDataOption()
            }
            if (role === "admin" || role === "dinas") {
                url = `${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/get_data/byAdmin?keyword=${searchTerm}`;
            }
            else if (role === "admin pengelola") {
                url = `${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/get_data/byAdmin?byAdmin=${id_admin_login}&keyword=${searchTerm}`;
            }
            else if (role === "user pengelola") {
                url = `${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/get_data/byAdmin?byAdminPengelola=${id_admin_login}&keyword=${searchTerm}`;
            }
            else {
                url = `${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/get_data/byAdmin?keyword=${searchTerm}`;
            }

            const response = await axios.get(url);
            if (response) {
                setDataWisata(response.data.data)
                setLoading(false);
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/');
                setLoading(false);
            }
            else {
                console.log(error.response)
                setLoading(false);
            }
        }
    };

    const getDataDetailAdminDinas = async (id) => {
        setLoading1(true);
        setDataDetailAdminVerifikator([])
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/detail/adminDinas/${id}`;

            const response = await axios.get(url);
            if (response) {
                setDataDetailAdminVerifikator(response.data.data)
                setLoading1(false);
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/');
                setLoading1(false);
            }
            else {
                console.log(error.response)
                setLoading1(false);
            }
        }
    };

    const getDataPengelolaOption = async (id) => {
        setDataAdminPengelolaOption([])
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/pengelola/get_all?byAdmin=${id}`;

            const response = await axios.get(url);
            if (response) {
                setDataAdminPengelolaOption(response.data.data)
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/');
                setLoading1(false);
            }
            else {
                console.log(error.response)
                setLoading1(false);
            }
        }
    };

    const getDataDesaWisataOption = async (id) => {
        setDataDesaWisataOption([])
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/desawisata/get_all/byAdmin?byAdmin=${id}`;

            const response = await axios.get(url);
            if (response) {
                setDataDesaWisataOption(response.data.data)
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/');
                setLoading1(false);
            }
            else {
                console.log(error.response)
                setLoading1(false);
            }
        }
    };

    useEffect(() => {
        if (showModal) {
            const initSelect2 = (selector, fieldName, namePlaceholder) => {
                $(selector).select2({
                    placeholder: `--- Pilih ${namePlaceholder} ---`,
                    allowClear: true,
                }).on('change', (e) => {
                    const selectedValue = $(e.target).val();
                    setFormData(prevFormData => ({ ...prevFormData, [fieldName]: selectedValue }));
                    if (fieldName === 'id_admin') {
                        getDataPengelolaOption(selectedValue);
                        getDataDesaWisataOption(selectedValue);
                    }
                });
            };

            initSelect2('#id_admin', 'id_admin', 'Admin');
            initSelect2('#id_admin_pengelola', 'id_admin_pengelola', 'Admin Pengelola');
            initSelect2('#id_desaWisata', 'id_desaWisata', 'Desa Wisata');

            return () => {
                $('#id_admin').select2('destroy');
                $('#id_admin_pengelola').select2('destroy');
                $('#id_desaWisata').select2('destroy');
            };

        }
    }, [showModal]);

    useEffect(() => {
        if (showModalEdit) {
            const initSelect2 = (selector, fieldName, namePlaceholder) => {
                $(selector).select2({
                    placeholder: `--- Pilih ${namePlaceholder} ---`,
                    allowClear: true,
                }).on('change', (e) => {
                    const selectedValue = $(e.target).val();
                    setFormDataEdit(prevFormData => ({ ...prevFormData, [fieldName]: selectedValue }));
                });
            };

            initSelect2('#id_admin_pengelola_edit', 'id_admin_pengelola', 'User Pengelola');
            initSelect2('#id_desaWisata_edit', 'id_desaWisata', 'Desa Wisata');

            return () => {
                $('#id_admin_pengelola_edit').select2('destroy');
                $('#id_desaWisata_edit').select2('destroy');
            };

            // $('#id_admin_pengelola_edit').select2({
            //     placeholder: '--- Pilih User Pengelola ---',
            //     allowClear: true,
            // }).on('change', (e) => {
            //     const selectedValue = $(e.target).val();
            //     setFormDataEdit({ ...formDataEdit, id_admin_pengelola: selectedValue });
            // });
            // return () => {
            //     $('#id_admin_pengelola_edit').select2('destroy');
            // };
        }
    }, [showModalEdit]);

    useEffect(() => {
        if (showModalFormVerifikasi) {
            $('#id_admin_verif').select2({
                placeholder: '--- Pilih Admin ---',
                allowClear: true,
            }).on('change', (e) => {
                const selectedValue = $(e.target).val();
                getDataDetailAdminDinas(selectedValue);
                setDataFormVerifikasi({ ...DataFormVerifikasi, id_admin: selectedValue });
            });
            return () => {
                $('#id_admin_verif').select2('destroy');
            };
        }
    }, [showModalFormVerifikasi]);

    useEffect(() => {
        getData();
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Tentukan jumlah item per halaman
    const offset = currentPage * itemsPerPage;
    const currentPageData = DataWisata.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(DataWisata.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const openModal = () => {
        if (role === "admin pengelola") {
            setFormData({id_admin: id_admin_login,})
            getDataPengelolaOption(id_admin_login);
            getDataDesaWisataOption(id_admin_login);
        }
        setShowModal(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
        }, 500);
    };

    // const openModalEdit = (id_admin, nama_desaWisata, desk_desaWisata, no_hp, id, sampul) => {
    //     setFormDataEdit({
    //         id_admin: id_admin,
    //         nama_desaWisata: nama_desaWisata,
    //         desk_desaWisata: desk_desaWisata,
    //         no_hp: no_hp,
    //         id: id,
    //         sampul_desawisata: sampul
    //     });
    //     setShowModalEdit(true);
    //     setIsClosingEdit(false);
    // };

    const openModalEdit = (
        id_admin, 
        id_wisata, 
        id_desaWisata, 
        id_admin_pengelola, 
        nama_destinasi, 
        nib_destinasi, 
        kbli_destinasi, 
        alamat_destinasi, 
        status_wisata, 
        npwp_pemilik_destinasi, 
        npwp_destinasi, 
        desk_destinasi, 
        harga_tiket, 
        status_jalan, 
        jenis_kendaraan, 
        kontak_person_destinasi, 
        sampul, 
        ruang
    ) => {
        if (role === "admin" || role === "dinas" || role === "admin pengelola") {
            getDataPengelolaOption(id_admin);
            getDataDesaWisataOption(id_admin);
        }
        setFormDataEdit({
            id_admin: id_admin,
            id_desaWisata: id_desaWisata,
            id_admin_pengelola: id_admin_pengelola,
            nama_destinasi: nama_destinasi,
            nib_destinasi: nib_destinasi,
            kbli_destinasi: kbli_destinasi,
            alamat_destinasi: alamat_destinasi,
            status_wisata: status_wisata,
            npwp_pemilik_destinasi: npwp_pemilik_destinasi,
            npwp_destinasi: npwp_destinasi,
            desk_destinasi: desk_destinasi,
            harga_tiket: harga_tiket,
            status_jalan: status_jalan, 
            jenis_kendaraan: jenis_kendaraan, 
            kontak_person_destinasi: kontak_person_destinasi,
            sampul_destinasi: sampul,
            ruang_destinasi: ruang,
            id_wisata: id_wisata
        });
        setShowModalEdit(true);
        setIsClosingEdit(false);
    };

    const closeModalEdit = () => {
        setIsClosingEdit(true);
        setTimeout(() => {
            setShowModalEdit(false);
            setIsClosingEdit(false);
        }, 500);
    };

    const openModalDelete = (id_desawisata, name_desawisata, sampul) => {
        setDataDelete({
            id: id_desawisata,
            name: name_desawisata,
            sampul_desawisata: sampul
        });
        setShowModalDelete(true);
        setIsClosingDelete(false);
    };

    const closeModalDelete = () => {
        setIsClosingDelete(true);
        setTimeout(() => {
            setShowModalDelete(false);
            setIsClosingDelete(false);
            setDataDelete({
                id: '',
                name: '',
                sampul_desawisata: ''
            });
        }, 500);
    };

    const openModalDetailAdmin = (jenis_detail, name_admin, nameLengkap_admin, role, sampul) => {
        setDataDetailAdmin({
            jenis_detail: jenis_detail,
            username: name_admin,
            nama_lengkap: nameLengkap_admin,
            role: role,
            sampul_admin: sampul
        });
        setShowModalDetailAdmin(true);
        setIsClosingDetailAdmin(false);
    };

    const closeModalDetailAdmin = () => {
        setIsClosingDetailAdmin(true);
        setTimeout(() => {
            setShowModalDetailAdmin(false);
            setIsClosingDetailAdmin(false);
            setDataDetailAdmin({
                jenis_detail: '',
                username: '',
                nama_lengkap: '',
                role: '',
                sampul_admin: ''
            });
        }, 500);
    };

    const openModalFormVerifikasi = (id_wisata, status, id_admin) => {
        if (role === "dinas") {
            setDataFormVerifikasi({
                id_admin: id_admin_login,
                id_wisata: id_wisata,
                status_verifikasi: status
            });
            getDataDetailAdminDinas(id_admin_login);
        } else {
            if (id_admin) {
                getDataDetailAdminDinas(id_admin);
                setDataFormVerifikasi({
                    id_admin: id_admin,
                    id_wisata: id_wisata,
                    status_verifikasi: status
                });
            }
        }
        setShowModalFormVerifikasi(true);
        setIsClosingFormVerifikasi(false);
    };

    const closeModalFormVerifikasi = () => {
        setIsClosingFormVerifikasi(true);
        setTimeout(() => {
            setShowModalFormVerifikasi(false);
            setIsClosingFormVerifikasi(false);
            setDataFormVerifikasi({
                id_wisata: '',
                id_admin: '',
                username: '',
                nama_lengkap: '',
                sampul_admin: '',
                status_verifikasi: ''
            });
            setDataDetailAdminVerifikator([])
        }, 500);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeEdit = (e) => {
        const { name, value } = e.target;
        setFormDataEdit({ ...formDataEdit, [name]: value });
    };

    const handleInputChangeFormVerifikasi = (e) => {
        const { name, value } = e.target;
        setDataFormVerifikasi({ ...DataFormVerifikasi, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setAvatar(imageURL);
            setShowCropper(true);
        } else {
            setAvatar(null);
        }
    };

    const handleAvatarChange2 = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setAvatar2(imageURL);
            setShowCropper2(true);
        } else {
            setAvatar2(null);
        }
    };

    const handleCancelAvatar = () => {
        setAvatar(null);
        setCroppedImage(null);
        setShowCropper(false);
        document.getElementById('avatar').value = '';
    };

    const handleCancelAvatar2 = () => {
        setAvatar2(null);
        setCroppedImage2(null);
        setShowCropper2(false);
        document.getElementById('avatar2').value = '';
    };

    const handleUploadClick = () => {
        document.getElementById('avatar').click();
    };

    const handleUploadClick2 = () => {
        document.getElementById('avatar2').click();
    };

    const ButtonhandleSubmit = () => {
        document.getElementById('submit').click();
    };

    const ButtonhandleSubmitDelete = () => {
        document.getElementById('submitDelete').click();
    };

    const ButtonhandleSubmitUpdate = () => {
        document.getElementById('submitEdit').click();
    };

    const ButtonhandleSubmitVerifikasi = () => {
        document.getElementById('submitVerifikasi').click();
    };

    const handleCancelCropping = () => {
        setShowCropper(false);
        setAvatar(null);
        setCroppedArea(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const handleCancelCropping2 = () => {
        setShowCropper2(false);
        setAvatar2(null);
        setCroppedArea2(null);
        setCrop2({ x: 0, y: 0 });
        setZoom2(1);
    };

    const onCropComplete = async () => {
        try {
            const croppedImage = await getCroppedImg(avatar, croppedArea);
            setCroppedImage(croppedImage);
            setShowCropper(false);
        } catch (e) {
            console.error(e);
        }
    };

    const onCropComplete2 = async () => {
        try {
            const croppedImage2 = await getCroppedImg(avatar2, croppedArea2);
            setCroppedImage2(croppedImage2);
            setShowCropper2(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (croppedImage && croppedImage2) {
            const formDataObj = new FormData();

            for (const key in formData) {
                formDataObj.append(key, formData[key]);
            }

            const response = await fetch(croppedImage);
            const blob = await response.blob();
            formDataObj.append('foto_depan', blob, 'foto_ruang.jpg');

            const response2 = await fetch(croppedImage2);
            const blob2 = await response2.blob();
            formDataObj.append('foto_ruang', blob2, 'foto_ruang.jpg');

            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/add_data/byAdmin`, formDataObj)
                if (response) {
                    setResponseMessage(response.data.message);
                    setResponseMessageStatus(response.data.status);
                    closeModal();
                    getData();
                    setFormData({
                        id_admin: '',
                        nama_desaWisata: 'Desa Wisata ',
                        desk_desaWisata: '',
                        no_hp: '',
                    })
                    handleCancelCropping();
                    handleCancelAvatar();
                    handleCancelCropping2();
                    handleCancelAvatar2();
                    setTimeout(() => {
                        setResponseMessage('');
                        setResponseMessageStatus('');
                    }, 2000)
                }
            } catch (error) {
                if (error.response.status === 422) {
                    closeModal();
                    setResponseMessageStatus(error.response.data.status);
                    setResponseMessage(error.response.data.message);
                    setTimeout(() => {
                        setResponseMessage('');
                    }, 2000)
                } else {
                    closeModal();
                    setResponseMessageStatus(error.response.data.status);
                    setResponseMessage(error.response.data.message);
                    setTimeout(() => {
                        setResponseMessageStatus('');
                        setResponseMessage('');
                    }, 2000)
                }
            }
        } else {
            if (!croppedImage && !croppedImage2) {
                setAlertaddImage('Mohon pilih foto sampul wisata dan ruang wisata')
                setTimeout(() => {
                    setAlertaddImage('');
                }, 3000)
            } else if (!croppedImage2) {
                setAlertaddImage('Mohon pilih foto ruang wisata')
                setTimeout(() => {
                    setAlertaddImage('');
                }, 3000)
            } else {
                setAlertaddImage('Mohon pilih foto sampul wisata')
                setTimeout(() => {
                    setAlertaddImage('');
                }, 3000)
            }
        }
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataObj = new FormData();

        formDataObj.append("id_desaWisata", formDataEdit.id_desaWisata);
        formDataObj.append("id_admin_pengelola", formDataEdit.id_admin_pengelola);
        formDataObj.append("nama_destinasi", formDataEdit.nama_destinasi);
        formDataObj.append("nib_destinasi", formDataEdit.nib_destinasi);
        formDataObj.append("kbli_destinasi", formDataEdit.kbli_destinasi);
        formDataObj.append("alamat_destinasi", formDataEdit.alamat_destinasi);
        formDataObj.append("status_wisata", formDataEdit.status_wisata);
        formDataObj.append("npwp_destinasi", formDataEdit.npwp_destinasi);
        formDataObj.append("npwp_pemilik_destinasi", formDataEdit.npwp_pemilik_destinasi);
        formDataObj.append("desk_destinasi", formDataEdit.desk_destinasi);
        formDataObj.append("harga_tiket", formDataEdit.harga_tiket);
        formDataObj.append("status_jalan", formDataEdit.status_jalan);
        formDataObj.append("jenis_kendaraan", formDataEdit.jenis_kendaraan);
        formDataObj.append("kontak_person_destinasi", formDataEdit.kontak_person_destinasi);

        if (croppedImage) {
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            formDataObj.append('foto_depan', blob, 'foto_depan.jpg');
        }

        if (croppedImage2) {
            const response2 = await fetch(croppedImage2);
            const blob2 = await response2.blob();
            formDataObj.append('foto_ruang', blob2, 'foto_ruang.jpg');
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/update/byAdmin/${formDataEdit.id_wisata}`, formDataObj)
            if (response) {
                setResponseMessage(response.data.message);
                setResponseMessageStatus(response.data.status);
                closeModalEdit();
                getData();
                setFormDataEdit({
                    id_admin: '',
                    id_admin_pengelola: '',
                    nama_destinasi: '',
                    nib_destinasi: '',
                    kbli_destinasi: '',
                    alamat_destinasi: '',
                    status_wisata: '',
                    npwp_pemilik_destinasi: '',
                    npwp_destinasi: '',
                    desk_destinasi: '',
                    harga_tiket: '',
                    kontak_person_destinasi: '',
                    sampul_destinasi: '',
                    ruang_destinasi: '',
                    id_wisata: '',
                })
                handleCancelCropping();
                handleCancelAvatar();
                handleCancelCropping2();
                handleCancelAvatar2();
                setTimeout(() => {
                    setResponseMessage('');
                    setResponseMessageStatus('');
                }, 2000)
            }
        } catch (error) {
            if (error.response.status === 422) {
                closeModalEdit();
                setResponseMessageStatus(error.response.data.status);
                setResponseMessage(error.response.data.message);
                setTimeout(() => {
                    setResponseMessageStatus('');
                    setResponseMessage('');
                }, 2000)
            } else {
                closeModalEdit();
                setResponseMessageStatus(error.response.data.status);
                setResponseMessage(error.response.data.message);
                setTimeout(() => {
                    setResponseMessageStatus('');
                    setResponseMessage('');
                }, 2000)
            }
        }

    };

    const handleSubmitDelete = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/delete/byAdmin/${DataDelete.id}`)
            if (response) {
                setResponseMessage(response.data.message);
                setResponseMessageStatus(response.data.status);
                closeModalDelete();
                getData();
                setTimeout(() => {
                    setResponseMessage('');
                    setResponseMessageStatus('');
                }, 2000)
            }
        } catch (error) {
            if (error.response.status === 422) {
                closeModalDelete();
                setResponseMessageStatus(error.response.data.status);
                setResponseMessage(error.response.data.message);
                setTimeout(() => {
                    setResponseMessage('');
                    setResponseMessageStatus('');
                }, 2000)
            } else {
                closeModalDelete();
                setResponseMessageStatus(error.response.data.status);
                setResponseMessage(error.response.data.message);
                setTimeout(() => {
                    setResponseMessageStatus('');
                    setResponseMessage('');
                }, 2000)
            }
        }

    };

    const handleSubmitUpdateVerifikasi = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/api/wisata/verif/byAdmin/${DataFormVerifikasi.id_wisata}`, {
                id_admin: DataFormVerifikasi.id_admin,
                status_verifikasi: DataFormVerifikasi.status_verifikasi
            })
            if (response) {
                setResponseMessage(response.data.message);
                setResponseMessageStatus(response.data.status);
                closeModalFormVerifikasi();
                getData();
                setDataFormVerifikasi({
                    id_desaWisata: '',
                    id_admin: '',
                    username: '',
                    nama_lengkap: '',
                    sampul_admin: '',
                    status_verifikasi: ''
                })
                setTimeout(() => {
                    setResponseMessage('');
                    setResponseMessageStatus('');
                }, 2000)
            }
        } catch (error) {
            if (error.response.status === 422) {
                closeModalFormVerifikasi();
                setResponseMessageStatus(error.response.data.status);
                setResponseMessage(error.response.data.message);
                setTimeout(() => {
                    setResponseMessageStatus('');
                    setResponseMessage('');
                }, 2000)
            } else {
                closeModalFormVerifikasi();
                setResponseMessageStatus(error.response.data.status);
                setResponseMessage(error.response.data.message);
                setTimeout(() => {
                    setResponseMessageStatus('');
                    setResponseMessage('');
                }, 2000)
            }
        }

    };


    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className='d-flex justify-content-end w-100'>
                        {(role === "admin" || role === "dinasi" || role === "admin pengelola") && (
                            <button type="button" className="button good rounded" onClick={openModal}>
                                <FontAwesomeIcon icon={faSquarePlus} width={17} />
                                <span className='mx-2'>Add Data</span>
                            </button>
                        )}
                    </div>

                    {showModal && (
                        <div className={`modal ${isClosing ? 'closing' : ''}`}>
                            <div className="modal-content slideDown">
                                {AlertaddImage && (
                                    <div className={`alert alert-warning`} role="alert">
                                        {AlertaddImage}
                                    </div>
                                )}
                                <div className="modal-header">
                                    <h3>Form Tambah</h3>
                                    <div>
                                        <span className="close" onClick={closeModal}>&times;</span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} className="modal-form">
                                        {(role === "admin" || role === "dinas") && (

                                            <div className="form-group">
                                                <label htmlFor="id_admin">Admin Pengelola</label>
                                                <select
                                                    className="form-control"
                                                    id="id_admin"
                                                    name="id_admin"
                                                    style={{ width: '100%' }}
                                                    value={formData.id_admin}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">select</option>

                                                    {DataAdminOption.length !== 0 && (
                                                        <>
                                                            {DataAdminOption.map((item, index) => (
                                                                <option key={index} value={item.id_admin}>{item.nama_admin}</option>
                                                            ))}
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="id_desaWisata">Desa Wisata</label>
                                            <select
                                                className="form-control"
                                                id="id_desaWisata"
                                                name="id_desaWisata"
                                                style={{ width: '100%' }}
                                                value={formData.id_desaWisata}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">select</option>

                                                {formData.id_admin && (
                                                    <>
                                                        {DataDesaWisataOption.map((item, index) => (
                                                            <option key={index} value={item.id_desaWisata}>{item.nama_desaWisata}</option>
                                                        ))}
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_admin_pengelola">User Pengelola</label>
                                            <select
                                                className="form-control"
                                                id="id_admin_pengelola"
                                                name="id_admin_pengelola"
                                                style={{ width: '100%' }}
                                                value={formData.id_admin_pengelola}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">select</option>

                                                {formData.id_admin && (
                                                    <>
                                                        {DataAdminPengelolaOption.map((item, index) => (
                                                            <option key={index} value={item.id_admin}>{item.nama_admin}</option>
                                                        ))}
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                        {(formData.id_admin && formData.id_admin_pengelola) && (
                                            <div className="form-group">
                                                <label htmlFor="name">NPWP Pengelola/Admin</label>
                                                <input
                                                    type="text"
                                                    name="npwp_pemilik_destinasi"
                                                    value={formData.npwp_pemilik_destinasi}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="name">Nama Wisata</label>
                                            <input
                                                type="text"
                                                name="nama_destinasi"
                                                value={formData.nama_destinasi}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">NIB Wisata</label>
                                            <input
                                                type="text"
                                                name="nib_destinasi"
                                                value={formData.nib_destinasi}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">KBLI Wisata</label>
                                            <input
                                                type="text"
                                                name="kbli_destinasi"
                                                value={formData.kbli_destinasi}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Alamat Wisata</label>
                                            <input
                                                type="text"
                                                name="alamat_destinasi"
                                                value={formData.alamat_destinasi}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status_wisata">Status Wisata</label>
                                            <select
                                                className="form-control"
                                                name="status_wisata"
                                                style={{ width: '100%' }}
                                                value={formData.status_wisata}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">--- Pilih Status Kempemilikan ---</option>
                                                <option value="Pribadi">Pribadi</option>
                                                <option value="Bumdes">Bumdes</option>
                                                <option value="Pemda">Pemda</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">NPWP Wisata</label>
                                            <input
                                                type="text"
                                                name="npwp_destinasi"
                                                value={formData.npwp_destinasi}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="desk_desaWisata">Deskripsi Wisata</label>
                                            <textarea
                                                name="desk_destinasi"
                                                value={formData.desk_destinasi}
                                                onChange={handleInputChange}
                                                rows="5"
                                                style={{ width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga_tiket">Harga Tiket Wisata</label>
                                            <input
                                                type="text"
                                                name="harga_tiket"
                                                value={formData.harga_tiket}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status_jalan">Kondisi Jalan Destinasi</label>
                                            <select
                                                className="form-control"
                                                name="status_jalan"
                                                style={{ width: '100%' }}
                                                value={formData.status_jalan}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">--- Pilih Kondisi Jalan ---</option>
                                                <option value="1">Layak</option>
                                                <option value="2">Rusak Sedang</option>
                                                <option value="3">Rusak</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="jenis_kendaraan">Kendaraan Yang Bisa Masuk</label>
                                            <select
                                                className="form-control"
                                                name="jenis_kendaraan"
                                                style={{ width: '100%' }}
                                                value={formData.jenis_kendaraan}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">--- Pilih Jenis Kendaraan ---</option>
                                                <option value="1">Roda empat dan roda dua</option>
                                                <option value="2">Roda dua saja</option>
                                                <option value="3">Kendaraan tidak dapat masuk</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="kontak_person_destinasi">No. telp Wisata</label>
                                            <input
                                                type="text"
                                                name="kontak_person_destinasi"
                                                value={formData.kontak_person_destinasi}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar">Upload Sampul</label>
                                            <button type="button" className="btn btn-outline-secondary btn-icon-text" onClick={handleUploadClick}>
                                                <i className="ti-upload btn-icon-prepend"></i>
                                                Upload
                                            </button>
                                            <input
                                                type="file"
                                                id="avatar"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            id="submit"
                                            style={{ display: 'none' }}
                                        />
                                        {showCropper && (
                                            <div className="cropper-container">
                                                <Cropper
                                                    image={avatar}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    aspect={1}
                                                    onCropChange={setCrop}
                                                    onZoomChange={setZoom}
                                                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
                                                />
                                                <div className="crop-button-container">
                                                    <button className='crop' type="button" onClick={onCropComplete}><FontAwesomeIcon icon={faCheck} /></button>
                                                    <button className='cancel mt-3' type="button" onClick={handleCancelCropping}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            </div>
                                        )}
                                        {croppedImage && (
                                            <div className="form-group avatar-preview-container">
                                                <img src={croppedImage} alt="Selected Avatar" className="avatar-preview" />
                                                <button type="button" className="cancel-avatar" onClick={handleCancelAvatar}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="avatar2">Upload Foto Ruang</label>
                                            <button type="button" className="btn btn-outline-secondary btn-icon-text" onClick={handleUploadClick2}>
                                                <i className="ti-upload btn-icon-prepend"></i>
                                                Upload
                                            </button>
                                            <input
                                                type="file"
                                                id="avatar2"
                                                accept="image/*"
                                                onChange={handleAvatarChange2}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                        {showCropper2 && (
                                            <div className="cropper-container">
                                                <Cropper
                                                    image={avatar2}
                                                    crop={crop2}
                                                    zoom={zoom2}
                                                    aspect={1}
                                                    onCropChange={setCrop2}
                                                    onZoomChange={setZoom2}
                                                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedArea2(croppedAreaPixels)}
                                                />
                                                <div className="crop-button-container">
                                                    <button className='crop' type="button" onClick={onCropComplete2}><FontAwesomeIcon icon={faCheck} /></button>
                                                    <button className='cancel mt-3' type="button" onClick={handleCancelCropping2}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            </div>
                                        )}
                                        {croppedImage2 && (
                                            <div className="form-group avatar-preview-container">
                                                <img src={croppedImage2} alt="Selected Avatar" className="avatar-preview" />
                                                <button type="button" className="cancel-avatar" onClick={handleCancelAvatar2}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="button good" onClick={ButtonhandleSubmit} >Save</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showModalEdit && (
                        <div className={`modal ${isClosingEdit ? 'closing' : ''}`}>
                            <div className="modal-content slideDown" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>Form Edit</h3>
                                    <div>
                                        <span className="close" onClick={closeModalEdit}>&times;</span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form className="modal-form" onSubmit={handleSubmitUpdate}>
                                        {(role === "admin" || role === "dinas" || role === "admin pengelola") && (
                                            <>

                                                <div className="form-group">
                                                    <label htmlFor="id_desaWisata">Desa Wisata</label>
                                                    <select
                                                        className="form-control"
                                                        id="id_desaWisata_edit"
                                                        name="id_desaWisata"
                                                        style={{ width: '100%' }}
                                                        value={formDataEdit.id_desaWisata}
                                                        required
                                                    >
                                                        <option value="">select</option>

                                                        {formDataEdit.id_admin && (
                                                            <>
                                                                {DataDesaWisataOption.map((item, index) => (
                                                                    <option key={index} value={item.id_desaWisata}>{item.nama_desaWisata}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_admin_pengelola">User Pengelola</label>
                                                    <select
                                                        className="form-control"
                                                        id="id_admin_pengelola_edit"
                                                        name="id_admin_pengelola"
                                                        style={{ width: '100%' }}
                                                        value={formDataEdit.id_admin_pengelola}
                                                        required
                                                    >
                                                        <option value="">select</option>

                                                        {formDataEdit.id_admin && (
                                                            <>
                                                                {DataAdminPengelolaOption.map((item, index) => (
                                                                    <option key={index} value={item.id_admin}>{item.nama_admin}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="name">NPWP Pengelola/Admin</label>
                                            <input
                                                type="text"
                                                name="npwp_pemilik_destinasi"
                                                value={formDataEdit.npwp_pemilik_destinasi}
                                                onChange={handleInputChangeEdit}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Nama Wisata</label>
                                            <input
                                                type="text"
                                                name="nama_destinasi"
                                                value={formDataEdit.nama_destinasi}
                                                onChange={handleInputChangeEdit}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">NIB Wisata</label>
                                            <input
                                                type="text"
                                                name="nib_destinasi"
                                                value={formDataEdit.nib_destinasi}
                                                onChange={handleInputChangeEdit}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">KBLI Wisata</label>
                                            <input
                                                type="text"
                                                name="kbli_destinasi"
                                                value={formDataEdit.kbli_destinasi}
                                                onChange={handleInputChangeEdit}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Alamat Wisata</label>
                                            <input
                                                type="text"
                                                name="alamat_destinasi"
                                                value={formDataEdit.alamat_destinasi}
                                                onChange={handleInputChangeEdit}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status_wisata">Status Wisata</label>
                                            <select
                                                className="form-control"
                                                name="status_wisata"
                                                style={{ width: '100%' }}
                                                value={formDataEdit.status_wisata}
                                                onChange={handleInputChangeEdit}
                                                required
                                            >
                                                <option value="">--- Pilih Status Kempemilikan ---</option>
                                                <option value="Pribadi">Pribadi</option>
                                                <option value="Bumdes">Bumdes</option>
                                                <option value="Pemda">Pemda</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">NPWP Wisata</label>
                                            <input
                                                type="text"
                                                name="npwp_destinasi"
                                                value={formDataEdit.npwp_destinasi}
                                                onChange={handleInputChangeEdit}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="desk_desaWisata">Deskripsi Wisata</label>
                                            <textarea
                                                name="desk_destinasi"
                                                value={formDataEdit.desk_destinasi}
                                                onChange={handleInputChangeEdit}
                                                rows="5"
                                                style={{ width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="harga_tiket">Harga Tiket Wisata</label>
                                            <input
                                                type="text"
                                                name="harga_tiket"
                                                value={formDataEdit.harga_tiket}
                                                onChange={handleInputChangeEdit}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status_jalan">Kondisi Jalan Destinasi</label>
                                            <select
                                                className="form-control"
                                                name="status_jalan"
                                                style={{ width: '100%' }}
                                                value={formDataEdit.status_jalan}
                                                onChange={handleInputChangeEdit}
                                                required
                                            >
                                                <option value="">--- Pilih Kondisi Jalan ---</option>
                                                <option value="1">Layak</option>
                                                <option value="2">Rusak Sedang</option>
                                                <option value="3">Rusak</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="jenis_kendaraan">Kendaraan Yang Bisa Masuk</label>
                                            <select
                                                className="form-control"
                                                name="jenis_kendaraan"
                                                style={{ width: '100%' }}
                                                value={formDataEdit.jenis_kendaraan}
                                                onChange={handleInputChangeEdit}
                                                required
                                            >
                                                <option value="">--- Pilih Jenis Kendaraan ---</option>
                                                <option value="1">Roda empat dan roda dua</option>
                                                <option value="2">Roda dua saja</option>
                                                <option value="3">Kendaraan tidak dapat masuk</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="kontak_person_destinasi">No. telp Wisata</label>
                                            <input
                                                type="text"
                                                name="kontak_person_destinasi"
                                                value={formDataEdit.kontak_person_destinasi}
                                                onChange={handleInputChangeEdit}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar">Ubah Foto Sampul</label>
                                            <div>
                                                <img src={`${formDataEdit.sampul_destinasi}`} alt={formDataEdit.sampul_destinasi} style={{ width: '150px' }} />
                                            </div>
                                            <button type="button" className="mt-3 btn btn-outline-secondary btn-icon-text" onClick={handleUploadClick}>
                                                <i className="ti-upload btn-icon-prepend"></i>
                                                Upload
                                            </button>
                                            <input
                                                type="file"
                                                id="avatar"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            id="submitEdit"
                                            style={{ display: 'none' }}
                                        />
                                        {showCropper && (
                                            <div className="cropper-container">
                                                <Cropper
                                                    image={avatar}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    aspect={1}
                                                    onCropChange={setCrop}
                                                    onZoomChange={setZoom}
                                                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
                                                />
                                                <div className="crop-button-container">
                                                    <button className='crop' type="button" onClick={onCropComplete}><FontAwesomeIcon icon={faCheck} /></button>
                                                    <button className='cancel mt-3' type="button" onClick={handleCancelCropping}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            </div>
                                        )}
                                        {croppedImage && (
                                            <div className="form-group avatar-preview-container">
                                                <img src={croppedImage} alt="Selected Avatar" className="avatar-preview" />
                                                <button type="button" className="cancel-avatar" onClick={handleCancelAvatar}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="avatar2">Ubah Foto Ruang</label>
                                            <div>
                                                {formDataEdit.ruang_destinasi ? (
                                                    <img src={`${formDataEdit.ruang_destinasi}`} alt={formDataEdit.ruang_destinasi} style={{ width: '150px' }} />
                                                ) : (
                                                    <span className='text-danger'>Belum diunggah</span>
                                                )}
                                            </div>
                                            <button type="button" className="mt-3 btn btn-outline-secondary btn-icon-text" onClick={handleUploadClick2}>
                                                <i className="ti-upload btn-icon-prepend"></i>
                                                Upload
                                            </button>
                                            <input
                                                type="file"
                                                id="avatar2"
                                                accept="image/*"
                                                onChange={handleAvatarChange2}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                        {showCropper2 && (
                                            <div className="cropper-container">
                                                <Cropper
                                                    image={avatar2}
                                                    crop={crop2}
                                                    zoom={zoom2}
                                                    aspect={1}
                                                    onCropChange={setCrop2}
                                                    onZoomChange={setZoom2}
                                                    onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedArea2(croppedAreaPixels)}
                                                />
                                                <div className="crop-button-container">
                                                    <button className='crop' type="button" onClick={onCropComplete2}><FontAwesomeIcon icon={faCheck} /></button>
                                                    <button className='cancel mt-3' type="button" onClick={handleCancelCropping2}><FontAwesomeIcon icon={faTimes} /></button>
                                                </div>
                                            </div>
                                        )}
                                        {croppedImage2 && (
                                            <div className="form-group avatar-preview-container">
                                                <img src={croppedImage2} alt="Selected Avatar" className="avatar-preview" />
                                                <button type="button" className="cancel-avatar" onClick={handleCancelAvatar2}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button good" onClick={ButtonhandleSubmitUpdate}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showModalDelete && (
                        <div className={`modal ${isClosingDelete ? 'closing' : ''}`} onClick={closeModalDelete}>
                            <div className="modal-content slideDown" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>Konfirmasi</h3>
                                    <div>
                                        <span className="close" onClick={closeModalDelete}>&times;</span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form className="modal-form" onSubmit={handleSubmitDelete}>
                                        <div className="form-group">
                                            <label htmlFor="namepick">Apakah Anda yakin untuk menghapus data ini?</label>
                                            <div className="detail-item flex-column">
                                                <img className='mt-2' src={`${DataDelete.sampul_desawisata}`} alt={DataDelete.sampul_desawisata} style={{ height: '150px' }} />
                                                <div className='mt-3'>
                                                    <strong> {DataDelete.name}</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="submit"
                                            id="submitDelete"
                                            style={{ display: 'none' }}
                                        />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button good" onClick={closeModalDelete}>Batal</button>
                                    <button type="button" className="button danger" onClick={ButtonhandleSubmitDelete}>Hapus</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showModalDetailAdmin && (
                        <div className={`modal ${isClosingDetailAdmin ? 'closing' : ''}`} onClick={closeModalDetailAdmin}>
                            <div className="modal-content slideDown" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>Detail {DataDetailAdmin.jenis_detail === "admin" ? "Admin Desa Wisata" : DataDetailAdmin.jenis_detail === "author" ? "Admin Author" : "Admin Verifikator"}</h3>
                                    <div>
                                        <span className="close" onClick={closeModalDetailAdmin}>&times;</span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="detail-item">
                                        <img src={`${process.env.REACT_APP_BACKEND_API_URL}/uploads/img/profile/${DataDetailAdmin.sampul_admin}`} alt={DataDetailAdmin.sampul_admin} style={{ width: '100px' }} />
                                        <div className='ml-3'>
                                            <p><strong>Username:</strong> {DataDetailAdmin.username}</p>
                                            <p><strong>Nama Lengkap:</strong> {DataDetailAdmin.nama_lengkap}</p>
                                            <p><strong>Role:</strong> Admin {DataDetailAdmin.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button good" onClick={closeModalDetailAdmin}>Tutup</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showModalFormVerifikasi && (
                        <div className={`modal ${isClosingFormVerifikasi ? 'closing' : ''}`} onClick={closeModalFormVerifikasi}>
                            <div className="modal-content slideDown" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>Verifikasi Destinasi Wisata</h3>
                                    <div>
                                        <span className="close" onClick={closeModalFormVerifikasi}>&times;</span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    {role === 'admin' && (
                                        <>
                                            <form className="modal-form" onSubmit={handleSubmitUpdateVerifikasi}>
                                                <div className="form-group">
                                                    <label htmlFor="id_admin_verif">Admin Dinas</label>
                                                    <select
                                                        className="form-control"
                                                        id="id_admin_verif"
                                                        name="id_admin"
                                                        style={{ width: '100%' }}
                                                        value={DataFormVerifikasi.id_admin}
                                                        required
                                                    >
                                                        <option value="">select</option>

                                                        {DataAdminDinasOption.length !== 0 && (
                                                            <>
                                                                {DataAdminDinasOption.map((item, index) => (
                                                                    <option key={index} value={item.id_admin}>{item.nama_admin}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="form-group">

                                                    {loading1 ? (
                                                        <>
                                                            <svg className="spinner black" viewBox="0 0 50 50">
                                                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                                            </svg> Loading
                                                        </>
                                                    ) : (
                                                        <>
                                                            {DataDetailAdminVerifikator.length !== 0 && (
                                                                <>
                                                                    <label>Detail Admin Dinas</label>

                                                                    {DataDetailAdminVerifikator.map((item, index) => (
                                                                        <div className="detail-item">
                                                                            <img src={`${process.env.REACT_APP_BACKEND_API_URL}/uploads/img/profile/${item.sampul_admin}`} alt={item.sampul_admin} style={{ width: '100px' }} />
                                                                            <div className='ml-3'>
                                                                                <p><strong>Username:</strong> {item.nama_admin}</p>
                                                                                <p><strong>Nama Lengkap:</strong> {item.namaLengkap_admin}</p>
                                                                                <p><strong>Role:</strong> Admin dinas</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                </div>

                                                {DataFormVerifikasi.id_admin && (
                                                    <div className="form-group">
                                                        <label htmlFor="status_verifikasi">Status Verifikasi</label>
                                                        <select
                                                            className="form-control"
                                                            id="status_verifikasi"
                                                            name="status_verifikasi"
                                                            style={{ width: '100%' }}
                                                            value={DataFormVerifikasi.status_verifikasi}
                                                            onChange={handleInputChangeFormVerifikasi}
                                                            required
                                                        >
                                                            <option value="verified">Verifikasi</option>
                                                            <option value="unverified">Belum Terverifikasi</option>

                                                        </select>
                                                    </div>
                                                )}
                                                <input
                                                    type="submit"
                                                    id="submitVerifikasi"
                                                    style={{ display: 'none' }}
                                                />
                                            </form>
                                        </>
                                    )}
                                    {role === 'dinas' && (
                                        <>
                                            <form className="modal-form" onSubmit={handleSubmitUpdateVerifikasi}>

                                                <div className="form-group">

                                                    {loading1 ? (
                                                        <>
                                                            <svg className="spinner black" viewBox="0 0 50 50">
                                                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                                            </svg> Loading
                                                        </>
                                                    ) : (
                                                        <>
                                                            {DataDetailAdminVerifikator.length !== 0 && (
                                                                <>
                                                                    <label>Detail Admin Dinas</label>

                                                                    {DataDetailAdminVerifikator.map((item, index) => (
                                                                        <div className="detail-item">
                                                                            <img src={`${process.env.REACT_APP_BACKEND_API_URL}/uploads/img/profile/${item.sampul_admin}`} alt={item.sampul_admin} style={{ width: '100px' }} />
                                                                            <div className='ml-3'>
                                                                                <p><strong>Username:</strong> {item.nama_admin}</p>
                                                                                <p><strong>Nama Lengkap:</strong> {item.namaLengkap_admin}</p>
                                                                                <p><strong>Role:</strong> Admin dinas</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                </div>

                                                {DataFormVerifikasi.id_admin && (
                                                    <div className="form-group">
                                                        <label htmlFor="status_verifikasi">Status Verifikasi</label>
                                                        <select
                                                            className="form-control"
                                                            id="status_verifikasi"
                                                            name="status_verifikasi"
                                                            style={{ width: '100%' }}
                                                            value={DataFormVerifikasi.status_verifikasi}
                                                            onChange={handleInputChangeFormVerifikasi}
                                                            required
                                                        >
                                                            <option value="verified">Verifikasi</option>
                                                            <option value="unverified">Belum Terverifikasi</option>

                                                        </select>
                                                    </div>
                                                )}
                                                <input
                                                    type="submit"
                                                    id="submitVerifikasi"
                                                    style={{ display: 'none' }}
                                                />
                                            </form>
                                        </>
                                    )}
                                    {(role === 'admin pengelola' || role === 'user pengelola') && (
                                        <div className="modal-body">
                                            <div className="detail-item mt-0">
                                                <div className='ml-3'>
                                                    <p>Hanya admin dinas yang dapat melakukan verifikasi</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button danger" onClick={closeModalFormVerifikasi}>Tutup</button>
                                    {(role === 'admin' || role === 'dinas') && (
                                        <button type="button" className="button good" onClick={ButtonhandleSubmitVerifikasi}>Save Changes</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-lg-12 grid-margin stretch-card mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Tabel Data Destinasi Wisata</h4>
                                {responseMessage && (
                                    <div className={`alert ${responseMessageStatus === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                                        {responseMessage}
                                    </div>
                                )}
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={searchKeyword}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Destinasi Wisata</th>
                                                <th>Desa Wisata</th>
                                                <th>Pemilik Wisata</th>
                                                <th>Pengelola</th>
                                                <th>NPWP</th>
                                                <th>Status Verified</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPageData.length === 0 ? (
                                                <>
                                                    {loading ? (
                                                        <>
                                                            <tr className='under-line'>
                                                                <td>
                                                                    <svg className="spinner black" viewBox="0 0 50 50">
                                                                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                                                    </svg> Loading</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </>
                                                    ) : (

                                                        <tr className='under-line'>
                                                            <td>Data tidak ditemukan</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    )}
                                                </>

                                            ) : (
                                                <>
                                                    {currentPageData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.nama_destinasi}</td>
                                                            <td className={item.detail_desa_wisata ? "text-dark" : "text-danger"} >{item.detail_desa_wisata ? item.detail_desa_wisata.nama_desaWisata : 'Undifined'}</td>
                                                            <td>Milik {item.status_wisata}</td>
                                                            <td className={item.detail_admin_pengelola ? "text-dark" : "text-danger"} onClick={() => openModalDetailAdmin("admin", item.detail_admin_pengelola.nama_admin, item.detail_admin_pengelola.namaLengkap_admin, item.detail_admin_pengelola.role, item.detail_admin_pengelola.sampul_admin)}>{item.detail_admin_pengelola ? item.detail_admin_pengelola.nama_admin : "Undifined"}</td>
                                                            <td className={item.npwp_destinasi ? "text-dark" : "text-danger"}>{item.npwp_destinasi ? item.npwp_destinasi : "Undifined"}</td>
                                                            {item.detail_admin_verified ? (
                                                                <td><label className={`badge ${item.status_verifikasi === "verified" ? " badge-success" : " badge-danger"}`}
                                                                    onClick={(role === "admin pengelola" || role === "user pengelola") ? 
                                                                        () => openModalDetailAdmin("verifikator", item.detail_admin_verified.nama_admin, item.detail_admin_verified.namaLengkap_admin, item.detail_admin_verified.role, item.detail_admin_verified.sampul_admin)
                                                                    :   () => openModalFormVerifikasi(item.id_wisata, item.status_verifikasi, item.detail_admin_verified.id_admin)}
                                                                >
                                                                    {item.status_verifikasi === "verified" ? "Sudah diverifikasi" : "Tidak diverifikasi"}
                                                                </label>
                                                                </td>
                                                            ) : (
                                                                <td><label className={`badge badge-warning`}
                                                                    onClick={() => openModalFormVerifikasi(item.id_wisata, item.status_verifikasi, item.detail_admin_verified ? item.detail_admin_verified.id_admin : 2)}
                                                                >Belum diverifikasi</label></td>
                                                            )}
                                                            <td><Link to={`/wisata/${item.id_wisata}`}>Lihat detail</Link>
                                                                <FontAwesomeIcon className='mx-2' icon={faEdit} onClick={() => openModalEdit(
                                                                    item.detail_admin.id_admin,
                                                                    item.id_wisata,
                                                                    item.detail_desa_wisata ? item.detail_desa_wisata.id_desaWisata : '',
                                                                    item.detail_admin_pengelola ? item.detail_admin_pengelola.id_admin : '',
                                                                    item.nama_destinasi ? item.nama_destinasi : '',
                                                                    item.nib_destinasi ? item.nib_destinasi : '',
                                                                    item.kbli_destinasi ? item.kbli_destinasi : '',
                                                                    item.alamat_destinasi ? item.alamat_destinasi : '',
                                                                    item.status_wisata ? item.status_wisata : '',
                                                                    item.npwp_pemilik_destinasi ? item.npwp_pemilik_destinasi : '',
                                                                    item.npwp_destinasi ? item.npwp_destinasi : '',
                                                                    item.desk_destinasi ? item.desk_destinasi : '',
                                                                    item.harga_tiket ? item.harga_tiket : '',
                                                                    item.status_jalan ? item.status_jalan : '', 
                                                                    item.jenis_kendaraan ? item.jenis_kendaraan : '', 
                                                                    item.kontak_person_destinasi ? item.kontak_person_destinasi : '',
                                                                    item.sampul_destinasi,
                                                                    item.ruang_destinasi,
                                                                )} />
                                                                <FontAwesomeIcon icon={faTrash} onClick={() => openModalDelete(item.id_wisata, item.nama_destinasi, item.sampul_destinasi)} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-5'>
                                    <ReactPaginate
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                                        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        activeClassName={"active"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TableWisata;
