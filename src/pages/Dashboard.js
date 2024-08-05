import React from 'react';

import images1 from './../assets/images/dashboard/people.svg'
import Footer from '../components/Footer';

const Dashboard = ({ name, role }) => {
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="row">
              <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                <h3 className="font-weight-bold">Welcome, {name}</h3>
                {role === 'admin' && (
                  <h6 className="font-weight-normal mb-0">Role Super Admin </h6>
                )}
                {role === 'dinas' && (
                  <h6 className="font-weight-normal mb-0">Role Admin Dinas </h6>
                )}
                {role === 'admin pengelola' && (
                  <h6 className="font-weight-normal mb-0">Role Admin Pengelola Wisata </h6>
                )}
                {role === 'admin industri' && (
                  <h6 className="font-weight-normal mb-0">Role Admin Industri Wisata </h6>
                )}
                {role === 'user pengelola' && (
                  <h6 className="font-weight-normal mb-0">Role User Pengelola Wisata </h6>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-9 grid-margin stretch-card">
            <div className="card tale-bg">
              <div className="card-people mt-auto">
                <img src={images1} alt="people" />
                <div className="weather-info">
                  <div className="d-flex">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
