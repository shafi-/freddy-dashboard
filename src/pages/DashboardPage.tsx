import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap'
import AppLayout from '../comps/layout/App'
import * as DashboardApi from '../utils/api/dashboard';
import BarChart from 'react-bar-chart';

interface SalesNode {
  total: number,
  orders: number,
}

interface InfoCardProps extends SalesNode {
  header: string
}

type ChartType = 7 | 30;

function InfoCard({ header, total, orders } : InfoCardProps) {
  return (
    <Card className='border border-2 rounded p-3'>
      <h4>{header}</h4>
      <span>${total} / {orders}</span>
    </Card>
  )
}

function DashboardPage() {
  const [bestSellers, setBestSellers] = useState([]);
  const [salesOfWeek, setSalesOfWeek] = useState(null);
  const [salesOfYear, setSalesOfYear] = useState(null);
  const [chartType, setChartType] = useState<ChartType>(7);

  useEffect(() => {
    DashboardApi.getData().then(res => {
      if (res.ok) {
        setBestSellers(res.data.dashboard.bestsellers);
        setSalesOfWeek(res.data.dashboard.sales_over_time_week);
        setSalesOfYear(res.data.dashboard.sales_over_time_year);
      } else {
        console.error(res.err);
      }
    })
  }, []);

  function getTodayInfo() : SalesNode {
    if (salesOfWeek) {
      const total = salesOfWeek['1'].total;
      const orders = salesOfWeek['1'].orders;
      return { total, orders };
    } else {
      return { total: 0, orders: 0 };
    }
  }

  function getTotal(salesNodes: SalesNode[]) : SalesNode {
    if (salesNodes) {
      const total : number = Object.values(salesNodes)
        .reduce((pv: number, cv: SalesNode) => pv + cv.total, 0);
      const orders : number = Object.values(salesNodes)
        .reduce((pv: number, cv: SalesNode) => pv + cv.orders, 0);

      return { total, orders };
    } else {
      return { total: 0, orders: 0 };
    }
  }

  function getChartData() {
    if (chartType === 7) {
      if (salesOfWeek) {
        return Object.entries(salesOfWeek).map((entry) => {
          const [key, value] = entry;
          // @ts-ignore
          return { text: 'Day ' + key, value: value.total };
        })
      } else {
        return [];
      }
    } else {
      if (salesOfYear) {
        return Object.entries(salesOfYear).map((entry) => {
          const [key, value] = entry;
          // @ts-ignore
          return { text: 'Month ' + key, value: value.total };
        })
      } else {
        return [];
      }
    }
  }

  return (
    <AppLayout ref='root-container'>
      <h3 className='pb-3'>Dashbaord</h3>
      <Row>
        <Col md='3'>
          <InfoCard header='Today' {...getTodayInfo()} />
        </Col>
        <Col md='3'>
          <InfoCard header='Today' {...getTotal(salesOfWeek)} />
        </Col>
        <Col md='3'>
          <InfoCard header='Today' {...getTotal(salesOfYear)} />
        </Col>
      </Row>
      <Row className='mt-4 pb-2'>
        <Col>
          <h3>Revenue</h3>
        </Col>
        <Col className='d-flex justify-content-around'>
          <Form>
            <Form.Check
              type="switch"
              id="day-range-switch"
              onClick={() => {
                if (chartType === 7) setChartType(30);
                else setChartType(7);
              }}
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <BarChart ylabel='Revenue'
          width={750}
          height={500}
          margin={{top: 20, right: 20, bottom: 30, left: 40}}
          data={getChartData()}
          onBarClick={console.log}/>
      </Row>
      <Row className='mt-4 pb-2'>
        <h3>Bestsellers</h3>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th># Unit Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((bestSeller, index) => (
                <tr key={index}>
                  <td>{bestSeller.product.name}</td>
                  <td>{bestSeller.revenue / bestSeller.units}</td>
                  <td>{bestSeller.units}</td>
                  <td>{bestSeller.revenue}</td>
                </tr>)
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>

      </Row>
    </AppLayout>
  )
}

export default DashboardPage
