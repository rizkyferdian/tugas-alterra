import React from 'react'
import Navbar from '../components/navbar'
import './style.css'
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import { Link } from "react-router-dom";


const GET_PRODUCT_QUERY = gql`
    query GET_PRODUCT_QUERY {
        products {
            id
            name
            category
            freshness
            additional_description
            price
        }
    } 
`;

const DELETE_PRODUCT_MUTATION = gql`
mutation MyMutation($id: Int!) {
    delete_products_by_pk(id: $id) {
      id
    }
  }
`;

const COMMENTS_SUBSCRIPTION = gql`
subscription MySubscription {
    products {
      id
      name
      category
      freshness
      additional_description
      price
    }
  }
`;



function LandingPage() {
    // const { loading, error, data } = useQuery(GET_PRODUCT_QUERY);
    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, { refetchQueries: [GET_PRODUCT_QUERY] });
    const { data, error, loading } = useSubscription(
        COMMENTS_SUBSCRIPTION
    );
    const handleDelete = (id) => {
        if (window.confirm('Apa anda yakin ingin menghapus?')) {
            deleteProduct({ variables: { id: id } }).catch((err) => alert(err.message));
        }
    };

    return (
        <>
            <Navbar />

            <div className="">
                <div className="header">
                    <div className="left-content">
                        <div>
                            <h1 className="text-header">Better Solutions For Your <br /> Business</h1>
                            <p className="text-header">We are team of talented designers making websites with <br /> Bootstrap</p>
                        </div>
                        <div>
                            <button id="btn-cta" type="submit">Get Started</button>
                            <Link to="/">
                                <button className='ms-3 btn btn-success'>Menuju Halaman Create Product</button>
                            </Link>
                        </div>
                    </div>
                    <div className="right-content">
                        <img src="hero-img.png" alt="images" />
                    </div>
                </div>
                <h1 className='container mt-4'>
                    List Product
                </h1>
                {loading && <div>Loading ...</div>}
                {error && <p>Error : {error.message}</p>}
                <div className="container product-list d-flex flex-row">
                    {data && data.products.map(product =>
                        <div className="card ms-3 mt-3 mb-5" style={{ width: "18rem" }} key={product.id}>
                            <div className="card-body">
                                <h2 >{product.name}</h2>
                                <p className="card-title mb-4 text-secondary">{product.category}</p>
                                <p className="card-text text-secondary">{product.additional_description}</p>
                                <div className='d-flex justify-content-between'>
                                    <h3>Rp.{product.price}</h3>
                                    <p>{product.freshness}</p>
                                </div>
                                <button className='btn btn-primary' onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="content-join">
                    <div>
                        <h2 className="title-body">Join Our Newsletter</h2>
                        <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                        <div className="subcribe">
                            <input type="text" className='input-join' name="join" id="join" />
                            <button className="btn-subcribe" type="submit">Get Started</button>

                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="grid-container" >
                    <div>
                        <h1 className="title-footer">Arsha</h1>
                        <div className="sub-content">
                            <p>A108 Adam Street <br /> New York, NY 535022 <br /> United States</p>

                            <p> Phone: +1 5589 55488 55</p>
                            <p>Email: info@example.com </p>
                        </div>
                    </div>
                    <div>
                        <h3>Useful Links</h3>
                        <div className="sub-content">
                            <p>Home</p>
                            <p>About Us</p>
                            <p>Services</p>
                            <p>Terms of Services</p>
                            <p>Privacy policy</p>
                        </div>
                    </div>
                    <div>
                        <h3> Our Services</h3>
                        <div className="sub-content">
                            <p>Web Design</p>
                            <p>Web Development</p>
                            <p>Product Management</p>
                            <p>Marketing</p>
                            <p>Graphic Design</p>
                        </div>
                    </div>
                    <div>
                        <h3> Our Social Network</h3>
                        <div className="sub-content">
                            <p>Cras fermentum odio eu feugiat lide par <br /> naso tierra videa magna derita valies</p>
                        </div>
                        <div className="circle-group">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>

                <div className="copyright">
                    <p>© Copyright Arsha. All Rights Reserved</p>
                    <p>Designed by BootstrapMade</p>
                </div>
            </footer>
        </>
    )
}

export default LandingPage