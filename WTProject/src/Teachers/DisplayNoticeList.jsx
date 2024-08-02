import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import img from '../Images/student1.jpeg';
import"./StudentList.css";
import { useNavigate } from 'react-router-dom';
const columns = [
  
  { id: 'id', label: 'Id'},
  { id: 'noticeTitle', label: 'Title'},
  {
    id: 'noticeContent',
    label: 'Content',
  },
  {
    id: 'noticeDate',
    label: 'Date',
  },
  {
    id: 'actions',
    label: 'Actions', 
  },
];

function createData(id, noticeTitle, noticeContent, noticeDate) {
  
  return { id, noticeTitle, noticeContent, noticeDate };
}

const rows = [
  createData('S0121212', '34', 'AAAA', 3),
  createData('S0121212', '43', 'AAAA', 9),
  createData('S0121212', '35', 'AAAA', 3),
  createData('S0121212', '23', 'AAAA', 2),
  createData('S0121212', '65', 'AAAA', 3),
  createData('S0121212', '54', 'AAAA', 2),
  createData('S0121212', '45', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '93', 'AAAA', 2),
  createData('S0121212', '1', 'AAAA', 2),
];
 function StickyHeadTable() {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.code);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, code) => {
  //   const selectedIndex = selected.indexOf(code);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, code);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleEdit = (row) => {
    console.log(`Edit row: ${row.name}`);
  };

  const handleDelete = (row) => {
    console.log(`Delete row: ${row.name}`);
  };

  return (
    <div id="NoticeList">
     <div className="student-info-container">
       <div className="student-navbar">
        <div className="student-details">
          <h2 className="student-name">John Doe</h2>
          <p className="student-reg-no">Reg No: 123456789</p>
          <p className="student-reg-no">Seventh - A</p>
        </div>
        <img src={img} alt="Student" className="student-photo" />
      </div>
      </div>
      {/* < div className="format"> */}
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/')}>
          <i className="fas fa-home"></i> Home
        </button>
      </div>
      <Paper sx={{ width: '100%', overflow:'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((row) => {
                  const isSelected = selected.indexOf(row.code)!== -1;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      selected={isSelected}
                    >
                    
                      {columns.map((column) => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button sx={{ color: 'green' }} onClick={() => handleEdit(row)}>Edit</Button>
                              <Button sx={{ color: 'red' }} onClick={() => handleDelete(row)}>Delete</Button>
                            </TableCell>
                          );
                        }
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                             ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default StickyHeadTable;