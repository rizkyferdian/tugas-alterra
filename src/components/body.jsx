import React, { useState, useEffect } from 'react'
import axios from 'axios';


function Body() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [freshness, setFreshness] = useState('');
    const [price, setPrice] = useState('');
    const [productId, setProductId] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://642f10e28ca0fe3352df8a01.mockapi.io/products');
            setData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const editProduct = async (id) => {
        try {
            const response = await axios.get(`https://642f10e28ca0fe3352df8a01.mockapi.io/products/${id}`);
            setName(response.data.name);
            setCategory(response.data.category);
            setFreshness(response.data.freshness);
            setPrice(response.data.price);
            setProductId(response.data.id);
        } catch (error) {
            console.log(error.message);
        }
    }

    const submitProduct = async (e) => {
        e.preventDefault();

        try {
            if (productId === '') {
                const response = await axios.post('https://642f10e28ca0fe3352df8a01.mockapi.io/products', {
                    name,
                    category,
                    freshness,
                    price
                });
                setData([...data, response.data]);
                setName('');
                setCategory('');
                setFreshness('');
                setPrice('');
                alert('Data Berhasil Ditambahkan')
            } else {
                await axios.put(`https://642f10e28ca0fe3352df8a01.mockapi.io/products/${productId}`, {
                    name,
                    category,
                    freshness,
                    price
                });
                const updatedData = data.map(product => {
                    if (product.id === productId) {
                        return {
                            ...product,
                            name,
                            category,
                            freshness,
                            price
                        };
                    }
                    return product;
                });
                setData(updatedData);
                setName('');
                setCategory('');
                setFreshness('');
                setPrice('');
                setProductId('');
                alert('Data Berhasil Diupdate');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://642f10e28ca0fe3352df8a01.mockapi.io/products/${id}`);
            const filteredData = data.filter(product => product.id !== id);
            setData(filteredData);
            alert('Data Berhasil Dihapus');
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            <div className="container d-grid col-5 mt-5">
                <form onSubmit={submitProduct}>
                    <div className=" row">
                        <div className="col">
                            <h3 className="fw-semibold">Detail Form</h3>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className="row">
                        <div className="col-6">
                            <label className="fw-semibold">Product Name:</label>
                            <input type="text" required className="form-control" id="productName" value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Product Category */}
                    <div className="row mt-3">
                        <label className="fw-semibold">Product Category:</label>
                        <div className="col-5">
                            <select required id="productCategory" className='form-control' value={category} name="productCategory" onChange={(e) => setCategory(e.target.value)} >
                                <option value="">Choose</option>
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                                <option value="Baju">Baju</option>
                            </select>
                        </div>
                    </div>

                    {/* product Image */}
                    {/* <div className="row mt-3">
                        <div className="col-5">
                            <label className="form-label fw-semibold">Image of product</label>
                            <input
                                type="file"
                                className="form-control"
                                id="uploadFile"
                                onChange={handleProductImageChange}
                            />
                            {!isImageValid && <div className="error-message text-danger">Product Image tidak boleh kosong</div>}

                        </div>
                    </div> */}

                    {/* Product Freshness */}
                    <div className="mt-3">
                        <label className="fw-semibold">Product Freshness:</label><br />
                        <input type="radio"
                            id="brandNew"
                            name="productFreshness"
                            value="Brand New"
                            checked={freshness === 'Brand New'}
                            onChange={(e) => setFreshness(e.target.value)}
                        />
                        <label>Brand New</label><br />
                        <input type="radio"
                            id="secondHand"
                            name="productFreshness"
                            value="Second Hand"
                            checked={freshness === 'Second Hand'}
                            onChange={(e) => setFreshness(e.target.value)}
                        />
                        <label>Second Hand</label><br />
                        <input type="radio"
                            id="Refufbished"
                            name="productFreshness"
                            value="Refufbished"
                            checked={freshness === 'Refufbished'}
                            onChange={(e) => setFreshness(e.target.value)}
                        />
                        <label>Refufbished</label>
                    </div>

                    {/* Additional Description */}
                    {/* <div className="form-group mt-3">
                        <label className="fw-semibold">Additional Description:</label><br />
                        <textarea
                            className={!isDescriptionValid ? "form-control border border-danger" : "form-control"}
                            id="productDescription"
                            name="productDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                        {!isDescriptionValid && <div className="error-message text-danger">Deskripsi tidak boleh kosong</div>}
                    </div> */}

                    {/* Product Price */}
                    <div className="form-outline mx-auto mt-3">
                        <label className="fw-semibold">Product Price:</label>
                        <input
                            type="text"
                            id="productPrice"
                            name="productPrice"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="d-grid p-4 mt-5 mx-auto">
                        <button type="submit" className="btn btn-primary">{productId === '' ? 'Create Product' : 'Update Product'}</button>
                    </div>

                </form>
            </div >

            <div className="container">
                <table className="table" id="tableProduct">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            {/* <th>Product Image</th> */}
                            <th>Product Name</th>
                            <th>Product Category</th>
                            <th>Product Freshness</th>
                            {/* <th>Product Description</th> */}
                            <th>Product Price</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.freshness}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button className='btn btn-success me-3 text-white' onClick={() => editProduct(product.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteProduct(product.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Body