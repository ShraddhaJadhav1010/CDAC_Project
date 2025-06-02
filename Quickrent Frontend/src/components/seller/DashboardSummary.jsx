import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { formatCurrency } from '../../utils/currency';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardSummary = () => {
  const summaryData = {
    totalBookings: 150,
    totalRevenue: 25000,
    activeBookings: 45
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Revenue: ${formatCurrency(context.raw)}`;
          }
        }
      }
    }
  };

  return (
    <>
      <Row className="mb-4 g-3">
        <Col xs={12} sm={6} lg={4}>
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text className="h2 mb-0">{summaryData.totalBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text className="h2 mb-0">{formatCurrency(summaryData.totalRevenue)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={4}>
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title>Active Bookings</Card.Title>
              <Card.Text className="h2 mb-0">{summaryData.activeBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Revenue Overview</Card.Title>
              <div className="chart-container" style={{ minHeight: '300px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardSummary;