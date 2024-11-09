import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
} from '@mui/material';

const moviesData = [
  { image: 'image-url-1', title: 'Girl At The Window', status: 'published', provider: 'provider1', releaseYear: 2024 },
  { image: 'image-url-2', title: 'Get Out', status: 'published', provider: 'provider1', releaseYear: 2024 },
];

const Movies = () => {
  return (
    <>
      <Typography 
          sx={{
            fontSize: '37px',
            padding: 4,
            letterSpacing: '0.03em', 
            color: '#e6e7e7',
            // textShadow: '0px 0px 10px rgba(255,255,255,0.4)' 
          }}
        >
          Movies
      </Typography>
    <TableContainer component={Paper} style={{ backgroundColor: '#222222', color: '#fff' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Checkbox /></TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Provider Name</TableCell>
            <TableCell>Release Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {moviesData.map((movie, index) => (
            <TableRow key={index}>
              <TableCell><Checkbox /></TableCell>
              <TableCell><img src={movie.image} alt={movie.title} style={{ width: '50px' }} /></TableCell>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.status}</TableCell>
              <TableCell>{movie.provider}</TableCell>
              <TableCell>{movie.releaseYear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Movies;
