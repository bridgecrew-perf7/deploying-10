import axios from 'axios';
import { useRef } from 'react';
import { config } from '../../Constants';
import classes from './AddProduct.module.css';

const AddProduct = (props) =>
{
    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const imageFileRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('image', imageFileRef.current.files[0]);
        axios({
            method: 'POST',
            url: `${config.url.productsApi}/product`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response.data);
            alert(response.data.message);
            titleRef.current.value = null;
            priceRef.current.value = null;
            imageFileRef.current.value = null;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' id='title' ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='price'>Price</label>
                <input type='number' name='price' id='price' ref={priceRef} min="0"/>
            </div>
            <div className={classes.control}>
                <label htmlFor='image'>Image</label>
                <input type='file' name='image' id='image' ref={imageFileRef} min="0"/>
            </div>
            <button>Add Product</button>
        </form>
    );
}
export default AddProduct;