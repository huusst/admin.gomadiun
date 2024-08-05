import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const TableKuliner = () => {
    const data = [
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
        { name: 'Sekar Wilis', desa_wisata: 'Desa Wisata Kare', status_wisata: 'Pribadi', pengelola: 'Haasstt', npwp: null, status_verifikasi: 'Verified', statusclassName: 'badge badge-success' },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Tentukan jumlah item per halaman
    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className='d-flex justify-content-center align-items-center' style={{height: 430}}>
                                    <span>In Process Develope</span>
                                </div>
                                {/* <h4 className="card-title">Tabel Industri Kuliner</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Kuliner</th>
                                                <th>Desa Wisata</th>
                                                <th>Pemilik Kuliner</th>
                                                <th>Pengelola</th>
                                                <th>NPWP</th>
                                                <th>Status Verified</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPageData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.desa_wisata}</td>
                                                    <td>{item.status_wisata}</td>
                                                    <td>{item.pengelola}</td>
                                                    <td>{item.npwp}</td>
                                                    <td><label className={item.statusclassName}>{item.status_verifikasi}</label></td>
                                                    <td><FontAwesomeIcon icon={faEdit} />
                                                        <FontAwesomeIcon className='mx-2' icon={faTrash} />
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <hr/>
                                <div className='my-5'>
                                    <ReactPaginate
                                        containerclassName={"pagination"}
                                        subContainerclassName={"pages pagination"}
                                        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
                                        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
                                        breakLabel={"..."}
                                        breakclassName={"break-me"}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        activeclassName={"active"}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TableKuliner;
