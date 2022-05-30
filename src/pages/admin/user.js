
import PageTitle from '../../components/Typography/PageTitle'
import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import axios from 'axios'



function User() {

    const [users, setUsers] = useState([]);
    const [pageTable2, setPageTable2] = useState(1)
    const [dataTable2, setDataTable2] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = users.length

  // pagination change control
    function onPageChangeTable2(p) {
    setPageTable2(p)
    }
  
    // dapetin data user lalu set ke state setUsers
    useEffect( async () => {
      const response = await axios.get("http://localhost:8000/api/admin/user");
      setUsers(response.data.data);
    }, [])

    // ketika ada perubahan di state user ,maka set data baru ke state setDataTable2
    useEffect(() => {
    if(users.length > 0){
      setDataTable2(users.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }
    }, [users])
  
    // ketika ada perubahan di state dataTable2, maka render data baru yang digunakan untuk pagination mapping
    useEffect(() => {
      setDataTable2(users.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }, [pageTable2])


  return (
    <>
 <PageTitle>Data User</PageTitle>
    <TableContainer className="mb-8">
    <Table>
      <TableHeader>
        <tr>
          <TableCell>Nama User</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        {dataTable2.map((user, i) => (
          <TableRow key={i}>

            <TableCell>
              <div className="flex items-center text-sm">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{user.email}</span>
            </TableCell>

            <TableCell>
              <div className="flex items-center space-x-4">
                <Button layout="link" size="icon" aria-label="Edit">
                  <EditIcon className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button layout="link" size="icon" aria-label="Delete">
                  <TrashIcon className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TableFooter>
      <Pagination
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onChange={onPageChangeTable2}
        label="Table navigation"
      />
    </TableFooter>
  </TableContainer>
  </>
  )
}

export default User