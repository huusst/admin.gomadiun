import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import $ from 'jquery';
import ChartMin from 'chart.js/Chart.min';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ name, role }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [maxDesaWisata, setMaxDesaWisata] = useState(0);
  const [maxWisata, setMaxWisata] = useState(false);
  const [dataWisata, setDataWisata] = useState([]);
  const [labelWisata, setLabelWisata] = useState([]);
  const [dataDesaWisata, setDataDesaWisata] = useState([]);
  const [labelDesaWisata, setLabelDesaWisata] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {

      const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/admin/dashboard`;

      const response = await axios.get(url);

      if (response) {
        const maxDesaWisata = response.data.data_desawisata_terbanyak + 5;
        setMaxDesaWisata(maxDesaWisata);

        const desawisatalabel = response.data.data_desawisata.map((item) => item.nama_desaWisata);
        setLabelDesaWisata(desawisatalabel);

        const desawisata = response.data.data_desawisata.map((item) => item.total_pengunjung);
        setDataDesaWisata(desawisata);

        const maxWisata = response.data.data_wisata_terbanyak + 10;
        setMaxWisata(maxWisata);

        const wisatalabel = response.data.data_wisata.map((item) => item.nama_destinasi);
        setLabelWisata(wisatalabel);

        const wisata = response.data.data_wisata.map((item) => item.total_pengunjung_destinasi);
        setDataWisata(wisata);

        console.log(response.data)
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

  useEffect(() => {
    getData();

    var SalesChartCanvas = $("#sales-chart").get(0).getContext("2d");
    var SalesChart = new ChartMin(SalesChartCanvas, {
      type: 'bar',
      data: {
        labels: labelDesaWisata,
        datasets: [{
          label: 'Data Pengunjung',
          data: dataDesaWisata,
          backgroundColor: '#4B49AC'
        }
        ]
      },
      options: {
        cornerRadius: 5,
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              drawBorder: false,
              color: "#F2F2F2"
            },
            ticks: {
              display: true,
              min: 0,
              max: maxDesaWisata? maxDesaWisata : 0,
              autoSkip: true,
              maxTicksLimit: 10,
              fontColor: "#6C7383"
            }
          }],
          xAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
              fontColor: "#6C7383"
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false
            },
            barPercentage: 1
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
    });
    document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();

    var SalesChartCanva = $("#sales-charts").get(0).getContext("2d");
    var SalesCharts = new ChartMin(SalesChartCanva, {
      type: 'bar',
      data: {
        labels: labelWisata,
        datasets: [
          {
            label: 'Data Pengunjung',
            data: dataWisata,
            backgroundColor: '#98BDFF'
          }
        ]
      },
      options: {
        cornerRadius: 5,
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              drawBorder: false,
              color: "#F2F2F2"
            },
            ticks: {
              display: true,
              min: 0,
              max: maxWisata? maxWisata : 0,
              autoSkip: true,
              maxTicksLimit: 10,
              fontColor: "#6C7383"
            }
          }],
          xAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
              fontColor: "#6C7383"
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false
            },
            barPercentage: 1
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
    });
    document.getElementById('sales-legends').innerHTML = SalesCharts.generateLegend();
  }, [maxDesaWisata, maxWisata]);


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
        <div class="row">
          <div class="col-md-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="card-title">Pengunjung Desa Wisata</p>
                </div>
                <div id="sales-legend" class="chartjs-legend mt-4 mb-2"></div>
                <canvas id="sales-chart"></canvas>
              </div>
            </div>
          </div>
          <div class="col-md-6 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="card-title">Pengunjung Destinasi Wisata</p>
                </div>
                <div id="sales-legends" class="chartjs-legend mt-4 mb-2"></div>
                <canvas id="sales-charts"></canvas>
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
