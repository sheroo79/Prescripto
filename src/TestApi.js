import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({onPageChange}) {
const handleChange = (_,value) =>{
  console.log(value)
  onPageChange(value)
}
  return (
    <Stack spacing={2} justifyContent='center'>
      <Pagination count={5} variant="outlined" shape="rounded" onChange={handleChange}/>
    </Stack>
  );
}
