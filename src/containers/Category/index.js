import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/UI/Input';
import { addCategory } from '../../actions/category.actions';
import NewModal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


export default function Category() {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    const handleClick = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form))
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const renderCategories = (categories) => {

    //     // const nodes = [{
    //     //     label : category.name,
    //     //     value : category.children.length > 0,
    //     //     children : category.children
    //     // }]

    //     let myCategories = [];
    //     for (let category of categories) {
    //         myCategories.push(
    //             <li key={category.name}>
    //                 {category.name}
    //                 {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
    //             </li>
    //         )
    //     }
    //     return myCategories;
    // }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }


    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Category</h2>
                                <Button onClick={handleShow}>Add</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </Col>
                        {/* <Col>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ul>
                                    {renderCategories(category.categories)}
                                </ul>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
                <NewModal
                    show={show}
                    handleClose={handleClose}
                    handleClick={handleClick}
                    modalTitle={'Add New Category'}
                >
                    <Input type="text" name="category name" placeholder="Category Name" value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)} /><br />
                    <select className='form-control'
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                    <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </NewModal>
            </Layout>
        </div>
    )
}
