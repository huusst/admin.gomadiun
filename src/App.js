import { React, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import TableAdmin from './pages/Users/Admin';
import TableIndustri from './pages/Users/Industri';
import TablePengelola from './pages/Users/Pengelola';
import TableDinas from './pages/Users/Dinas';
import TableWisata from './pages/Destinasi/Wisata';
import TableKuliner from './pages/Destinasi/Kuliner';
import TablePenginapan from './pages/Destinasi/Penginapan';
import QrCodePage from './pages/scanQrCode';
import LoginPage from './pages/loginPage';
import TableUsersPengelola from './pages/Users/UsersPengelola';
import TableDesaWisata from './pages/Destinasi/DesaWisata';
import TableDetailDesaWisata from './pages/Destinasi/DetailDesawisata';
import TableDetailWisata from './pages/Destinasi/DetailWisata';
import TablePengumuman from './pages/Pengumuman';

function App() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [profile, setProfile] = useState('');
  const [role, setRole] = useState('');
  const [id_admin_login, setIdAdminLogin] = useState('');

  const [statusLogin, setStatusLogin] = useState('');

  const getMe = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/admin/me`)
      if (response) {
        setStatusLogin("login");
        setname(response.data.user_admin.nama_admin);
        setProfile(response.data.user_admin.sampul_admin);
        setRole(response.data.user_admin.role);
        setIdAdminLogin(response.data.user_admin.id_admin);
        Navigate('/dashboard')
      }
    } catch (error) {
      if (error.response.status === 401) {
        setStatusLogin("belum_login");
        Navigate('/login')
      }
    }
  }

  const Navigate = (href) => {
    navigate(`${href}`);
  };

  useEffect(() => {
    getMe();
  }, [])

  return (
    <div className="container-scroller">
      <Navbar profile={profile} statusLogin={statusLogin} />
      <div className="container-fluid page-body-wrapper">
        {statusLogin === "login" && (
          <Sidebar role={role} />
        )}
        <Routes>
          <Route path="/dashboard" element={<Dashboard name={name} role={role} />} />
          <Route path="/admin" element={<TableAdmin />} />
          <Route path="/dinas" element={<TableDinas />} />
          <Route path="/industri" element={<TableIndustri />} />
          <Route path="/pengelola" element={<TablePengelola />} />
          <Route path="/users-pengelola" element={<TableUsersPengelola role={role} id_admin_login={id_admin_login}/>} />
          <Route path="/desawisata" element={<TableDesaWisata role={role} id_admin_login={id_admin_login}/>} />
          <Route path="/desawisata/:id_desawisata" element={<TableDetailDesaWisata role={role} id_admin_login={id_admin_login}/>} />
          <Route path="/wisata/:id_wisata" element={<TableDetailWisata role={role} id_admin_login={id_admin_login}/>} />
          <Route path="/wisata" element={<TableWisata role={role} id_admin_login={id_admin_login}/>} />
          <Route path="/kuliner" element={<TableKuliner />} />
          <Route path="/penginapan" element={<TablePenginapan />} />
          <Route path="/pengumuman" element={<TablePengumuman />} />
          <Route path="/qrcode-scan" element={<QrCodePage />} />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
