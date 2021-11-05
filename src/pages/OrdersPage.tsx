import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom'
import AppLayout from '../comps/layout/App';
import TablePagination from '../comps/TablePagination';
import * as OrderApi from '../utils/api/order';
import searchIcon from '../comps/icons/search.svg';

const OrderPerPage = 50;

function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(parseInt(searchParams.get('page') || '1'));
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [orders, setOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return;

    setLoading(true);

    OrderApi.getList(pageNo, query).then((res) => {
      if (res.ok) {
        setOrders(res.data.orders);
        let pages = Math.ceil(res.data.total / OrderPerPage);
        setTotalPage(pages);
        if (pages < pageNo) { setPageNo(1); }
      } else {
        // TODO :: handle error in fetching orders
      }
    }).finally(() => setLoading(false));
    // return () => {
    //   stop the running api request
    // }
  }, [pageNo, query]);

  function formatDate(date) {
    try {
      return new Date(date).toDateString();
    } catch (err) {
      return '';
    }
  }

  function handleQueryChange(newQuery: string) {
    setSearchParams({ page: pageNo.toString(), q: newQuery });
    setQuery(newQuery);
  }

  function handlePageChange(newPageNo: number) {
    setSearchParams({ page: newPageNo.toString(), q: query });
    setPageNo(newPageNo);
  }

  return (
    <AppLayout>
      <Row>
        <Col sm='12' md='6'>
          <h2>Orders</h2>
        </Col>
        <Col sm='12' md='6'>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <img src={searchIcon} alt="Search icon" />
            </InputGroup.Text>
            <Form.Control
              value={query}
              onChange={e => handleQueryChange(e.target.value)} />
          </InputGroup>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            return (
              <tr key={order.id}>
                <td>{order.product.name}</td>
                <td>{formatDate(order.created_at)}</td>
                <td>{order.total} {order.currency}</td>
                <td className=''>{order.status}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <TablePagination
        currentPage={pageNo}
        totalPage={totalPage}
        onChange={handlePageChange}
      />
    </AppLayout>
  )
}

export default OrdersPage
