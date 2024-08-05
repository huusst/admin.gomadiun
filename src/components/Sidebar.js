import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQrcode } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ role }) => {
    const location = useLocation();
    const [isAuthExpanded, setIsAuthExpanded] = useState(false);
    const [isAuthExpandedDestinasi, setIsAuthExpandedDestinasi] = useState(false);

    useEffect(() => {
        if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dinas') || location.pathname.startsWith('/industri') || location.pathname.startsWith('/pengelola') || location.pathname.startsWith('/users-pengelola')) {
            setIsAuthExpanded(true);
            setIsAuthExpandedDestinasi(false);
        } else {
            setIsAuthExpanded(false);
        }
        if (location.pathname.startsWith('/desawisata') || location.pathname.startsWith('/wisata') || location.pathname.startsWith('/kuliner') || location.pathname.startsWith('/penginapan')) {
            setIsAuthExpandedDestinasi(true);
            setIsAuthExpanded(false);
        } else {
            setIsAuthExpandedDestinasi(false);
        }
    }, [location.pathname]);

    const handleAuthClick = () => {
        setIsAuthExpandedDestinasi(false);
        if (isAuthExpanded) {
            setIsAuthExpanded(!isAuthExpanded);
        }
    };

    const handleAuthClickDestinasi = () => {
        setIsAuthExpanded(false);
        if (isAuthExpandedDestinasi) {
            setIsAuthExpandedDestinasi(!isAuthExpandedDestinasi);
        }
    };

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">

                <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/dashboard">
                        <i className="menu-icon">  <FontAwesomeIcon icon={faHome} /></i>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>

                {role === 'admin' && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${isAuthExpanded ? 'expanded' : ''}`}
                            data-toggle="collapse"
                            href="#auth"
                            aria-expanded={isAuthExpanded}
                            aria-controls="auth"
                            onClick={handleAuthClick}
                        >
                            <i className="icon-head menu-icon"></i>
                            <span className="menu-title">Users</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className={`collapse ${isAuthExpanded ? 'show' : ''}`} id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/admin">Admin</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/dinas' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/dinas">Admin Dinas</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/pengelola' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/pengelola">Admin Pengelola</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/industri' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/industri">Admin Industri</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/users-pengelola' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/users-pengelola">Users Pengelola</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}


                {(role === 'admin pengelola' || role === 'admin industri') && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${isAuthExpanded ? 'expanded' : ''}`}
                            data-toggle="collapse"
                            href="#auth"
                            aria-expanded={isAuthExpanded}
                            aria-controls="auth"
                            onClick={handleAuthClick}
                        >
                            <i className="icon-head menu-icon"></i>
                            <span className="menu-title">Users</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className={`collapse ${isAuthExpanded ? 'show' : ''}`} id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === '/users-pengelola' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/users-pengelola">Users Pengelola</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}


                {(role === 'admin' || role === 'dinas') && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${isAuthExpandedDestinasi ? 'expanded' : ''}`}
                            data-toggle="collapse"
                            href="#destinasi"
                            aria-expanded={isAuthExpandedDestinasi}
                            aria-controls="auth"
                            onClick={handleAuthClickDestinasi}
                        >
                            <i className="icon-layout menu-icon"></i>
                            <span className="menu-title">Destinasi</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className={`collapse ${isAuthExpandedDestinasi ? 'show' : ''}`} id="destinasi">
                            <ul className="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === '/desawisata' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/desawisata">Desa Wisata</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/wisata' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/wisata">Wisata</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/kuliner' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/kuliner">Kuliner</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/penginapan' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/penginapan">Penginapan</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}


                {(role === 'admin pengelola') && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${isAuthExpandedDestinasi ? 'expanded' : ''}`}
                            data-toggle="collapse"
                            href="#destinasi"
                            aria-expanded={isAuthExpandedDestinasi}
                            aria-controls="auth"
                            onClick={handleAuthClickDestinasi}
                        >
                            <i className="icon-layout menu-icon"></i>
                            <span className="menu-title">Destinasi</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className={`collapse ${isAuthExpandedDestinasi ? 'show' : ''}`} id="destinasi">
                            <ul className="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === '/desawisata' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/desawisata">Desa Wisata</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/wisata' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/wisata">Wisata</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}


                {(role === 'user pengelola') && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${isAuthExpandedDestinasi ? 'expanded' : ''}`}
                            data-toggle="collapse"
                            href="#destinasi"
                            aria-expanded={isAuthExpandedDestinasi}
                            aria-controls="auth"
                            onClick={handleAuthClickDestinasi}
                        >
                            <i className="icon-layout menu-icon"></i>
                            <span className="menu-title">Destinasi</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className={`collapse ${isAuthExpandedDestinasi ? 'show' : ''}`} id="destinasi">
                            <ul className="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === '/wisata' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/wisata">Wisata</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}

                {(role === 'admin industri' || role === 'user industri') && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${isAuthExpandedDestinasi ? 'expanded' : ''}`}
                            data-toggle="collapse"
                            href="#destinasi"
                            aria-expanded={isAuthExpandedDestinasi}
                            aria-controls="auth"
                            onClick={handleAuthClickDestinasi}
                        >
                            <i className="icon-layout menu-icon"></i>
                            <span className="menu-title">Destinasi</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className={`collapse ${isAuthExpandedDestinasi ? 'show' : ''}`} id="destinasi">
                            <ul className="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === '/kuliner' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/kuliner">Kuliner</Link>
                                </li>
                                <li className={`nav-item ${location.pathname === '/penginapan' ? 'active' : ''}`}>
                                    <Link className="nav-link" to="/penginapan">Penginapan</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}


                {(role === 'admin pengelola' || role === 'admin industri' || role === 'user pengelola' || role === 'user industri') && (

                    <li className={`nav-item ${location.pathname === '/qrcode-scan' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/qrcode-scan">
                            <i className="menu-icon"> <FontAwesomeIcon icon={faQrcode} /> </i>

                            <span className="menu-title">Scan QRcode</span>
                        </Link>
                    </li>
                )}

            </ul>
        </nav>
    );
}

export default Sidebar;
