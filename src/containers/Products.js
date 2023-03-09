import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import Input from '../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../actions';
import NewModal from '../components/UI/Modal';
import './style.css';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { generatePubliUrl } from '../urlConfig';

export default function Products() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('')
    const [productPicture, setProductPicture] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [show, setShow] = useState('')
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null);
    const [ editProduct, setEditProduct] = useState(false);
    const [editProductDetails, setEditProductDetails] = useState(null);

    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)

    const dispatch = useDispatch();

    const handleClick = () => {
        const form = new FormData();
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', categoryId)
        for (let pic of productPicture) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form));
        console.log(form)
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, option)
            }
        }
        return option;
    }

    const handleProductImage = (e) => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ])
    }
    const renderProduct = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Show</th>
                        <th>Edit</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0 ?
                        product.products.map(product =>
                            <tr>
                                <td><VisibilityIcon onClick={() => showProductDetailsModal(product)}
                                    key={product._id} /></td>
                                <td><EditIcon onClick={() => showEditProduct(product)} /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                            </tr>) : null
                    }
                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
            <NewModal
                show={show}
                handleClose={handleClose}
                handleClick={handleClick}
                modalTitle={'Add New Product'}>
                <Input
                    label="Name"
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={'Price'}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => setDescription(e.target.value)}
                /><br />
                <select className='form-control'
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                {
                    productPicture.length > 0 ?
                        productPicture.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <Input type="file" name="ProductPicture" onChange={handleProductImage} /><br />
            </NewModal>
        )
    }

    const renderEditProductModal = (product) => { 
        const update = (e) => {
            console.log(setEditProductDetails(e.target.value))
        }
        if (!editProductDetails) {
            return null;
        }
        return (
            <NewModal
                show={editProduct}
                handleClose={handleCloseEditProduct}
                handleClick={handleClick}
                modalTitle={'Edit Product'}>
                <Input
                    label="Name"
                    value={editProductDetails.name}
                    placeholder={'Product Name'}
                    onChange={update}
                />
                <Input
                    label="Quantity"
                    value={editProductDetails.quantity}
                    placeholder={'Quantity'}
                    onChange={(e) => setEditProductDetails(e.target.value)}
                />
                <Input
                    label="Price"
                    value={editProductDetails.price}
                    placeholder={'Price'}
                    onChange={(e) => setEditProductDetails(e.target.value)}
                />
                <Input
                    label="Description"
                    value={editProductDetails.description}
                    placeholder={'Description'}
                    onChange={(e) => setEditProductDetails(e.target.value)} 
                    />
            </NewModal>
        )
    }


    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false)
    }

    const showProductDetailsModal = (product) => {
        setProductDetailModal(true)
        setProductDetails(product)
        console.log(product)
    }

    const handleCloseEditProduct = () => {
        setEditProduct(false)
    }

    const showEditProduct = (product) => {
        setEditProduct(true)
        setEditProductDetails(product)
    }
    // const editProductDetailsModal = (product) => {
    //     setProductDetailModal(true)
    //     console.log(product)
    // }

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <NewModal
                show={productDetailModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={'Product Details'}
                size='lg'>
                <Row>
                    <Col md="6">
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className='key'>Product Picture</label>
                        <div style={{ display: 'flex' }}>
                            <p className='value'>{productDetails.productPictures.map(pic =>
                                <div className='productImgContainer'>
                                    <img src={generatePubliUrl(pic.img)} />
                                </div>)}
                            </p>
                        </div>
                    </Col>
                </Row>
            </NewModal>
        )
    }


    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Product</h2>
                                <Button onClick={handleShow}>Add</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {renderProduct()}
                        </Col>
                    </Row>
                </Container>
                {renderAddProductModal()}
                {renderProductDetailsModal()}
                {renderEditProductModal()}
            </Layout>
        </div>
    )
}
