import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BookList = ()=>{
    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Book List</h2>
            <table className='table table-bordered table-hover'>
                <thead className='table-primary'>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mern stack book</td>
                        <td>abcd efg</td>
                        <td>2000</td>
                        <td>900</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BookList;