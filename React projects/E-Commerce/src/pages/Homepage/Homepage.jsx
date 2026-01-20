import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import './Homepage.css';
import { ProductGrid } from './ProductGrid.jsx';

export default function Homepage({cart}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data)
            })
    }, []);

    return (
        <>
            <title>Homepage</title>
            <link rel='icon' href='/home.png' />

            <Header cart={cart} />

            <div className="home-page">
                <ProductGrid products={products} />
            </div>
        </>
    );
}