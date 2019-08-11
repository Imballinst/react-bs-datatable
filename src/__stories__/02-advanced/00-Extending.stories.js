/**
 * This is a story for an extended table.
 * If you want to personally customize how the table looks, like the positioning of filters/pagination, you can do it here.
 * You will need to import the components and apply them in the render function.
 */
import React from 'react'; // Import React
import { storiesOf } from '@storybook/react';
import { categoryName } from './_base';

import moment from 'moment'; // Example for onSort prop
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

// In your setup, replace "../../" with "react-bs-datatable"
import {
  Pagination,
  PaginationOpts,
  TableHeader,
  TableBody,
  Filter,
  useDatatableLifecycle
} from '../../';

function CustomTable(props) {
  const {
    data,
    labels,
    onChangeFilter,
    onPageNavigate,
    onRowsPerPageChange,
    onSortChange,
    rowsPerPageOption,
    state,
    tableBody,
    tableClass,
    tableHeaders
  } = useDatatableLifecycle(props);

  return (
    <>
      <Row>
        <Col xs="12">
          <Filter
            tableHeaders={tableHeaders}
            placeholder={labels.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={state.filterText}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Table className={tableClass}>
            <TableHeader
              tableHeaders={tableHeaders}
              sortedProp={state.sortedProp}
              onSortChange={onSortChange}
            />
            <TableBody
              tableHeaders={tableHeaders}
              labels={labels}
              data={data}
            />
          </Table>
        </Col>
      </Row>
      <Row className="controlRow">
        <Col xs={12} md={4} />
        <Col xs={12} md={4}>
          <PaginationOpts
            labels={labels}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={state.rowsPerPage}
            rowsPerPageOption={rowsPerPageOption}
          />
        </Col>
        <Col xs={12} md={4}>
          <Pagination
            data={tableBody}
            rowsPerPage={state.rowsPerPage}
            currentPage={state.currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
          />
        </Col>
      </Row>
    </>
  );
}

const header = [
  {
    title: 'Username (filterable)',
    prop: 'username',
    sortable: true,
    filterable: true
  },
  { title: 'Name', prop: 'realname', sortable: true },
  {
    title: 'Name Uppercased',
    prop: 'realnameuppercase',
    cell: row => row.realname.toUpperCase()
  },
  { title: 'Location', prop: 'location' },
  { title: 'Last Updated', prop: 'date', sortable: true }
];

const body = Array.from(new Array(57), () => {
  const rd = (Math.random() * 10).toFixed(1);

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd}`,
      location: 'Mars',
      date: moment()
        .subtract(1, 'days')
        .format('Do MMMM YYYY')
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd}`,
    location: 'Saturn',
    date: moment()
      .subtract(2, 'days')
      .format('Do MMMM YYYY')
  };
});

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  }
};

const customLabels = {
  first: '<<',
  last: '>>',
  prev: '<',
  next: '>',
  show: 'Display',
  entries: 'rows',
  noResults: 'There are no data to be displayed'
};

storiesOf(categoryName, module).add('Extending the Table', () => (
  <CustomTable
    tableHeaders={header}
    tableBody={body}
    tableClass="striped hover responsive"
    rowsPerPage={5}
    rowsPerPageOption={[5, 10, 15, 20]}
    initialSort={{ prop: 'username', isAscending: true }}
    onSort={onSortFunction}
    labels={customLabels}
  />
));
