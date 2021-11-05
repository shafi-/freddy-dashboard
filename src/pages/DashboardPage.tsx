import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap'
import AppLayout from '../comps/layout/App'
import * as DashboardApi from '../utils/api/dashboard';

const data = {
  "dashboard": {
      "sales_over_time_week": {
          "1": {
              "orders": 96,
              "total": 270240
          },
          "2": {
              "orders": 31,
              "total": 74121
          },
          "3": {
              "orders": 52,
              "total": 180284
          },
          "4": {
              "orders": 34,
              "total": 115600
          },
          "5": {
              "orders": 67,
              "total": 333325
          },
          "6": {
              "orders": 57,
              "total": 374262
          },
          "7": {
              "orders": 26,
              "total": 35672
          }
      },
      "sales_over_time_year": {
          "1": {
              "orders": 330,
              "total": 2952510
          },
          "10": {
              "orders": 746,
              "total": 2322298
          },
          "11": {
              "orders": 5424,
              "total": 16863216
          },
          "12": {
              "orders": 680,
              "total": 3198040
          },
          "2": {
              "orders": 745,
              "total": 7034290
          },
          "3": {
              "orders": 687,
              "total": 6486654
          },
          "4": {
              "orders": 311,
              "total": 1593253
          },
          "5": {
              "orders": 44,
              "total": 166452
          },
          "6": {
              "orders": 403,
              "total": 3514966
          },
          "7": {
              "orders": 342,
              "total": 1870398
          },
          "8": {
              "orders": 696,
              "total": 2628096
          },
          "9": {
              "orders": 279,
              "total": 1401138
          }
      }
  }
}

interface SalesNode {
  total: number,
  orders: number,
}

interface InfoCardProps extends SalesNode {
  header: string
}

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

  return (
    <AppLayout>
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
        <Col>
          <Form>
            <Form.Check
              type="switch"
              id="day-range-switch"
              label="Check this switch"
            />
          </Form>
        </Col>
      </Row>
      <Row>

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
