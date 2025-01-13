import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import {incrementByAmount} from "../CartFeature/countSlice.js";
import {useDispatch} from "react-redux";


const productList = [
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio14.jpg",
        title:
            "ABUK Home Appliance Surge Protector Voltage Brownout Plug Outlet Power Strip Surge Protector With Pass Button",
        price: "158",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio20.jpg",
        title:
            "Forsining 3d Logo Design Hollow Engraving Black Gold Case Leather Skeleton Mechanical Watches Men Luxury Brand Heren Horloge",
        price: "7,390",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg",
        title:
            "Factory Brand Wholesale 5# Zinc Accessories Custom Hook Slider Metal #5 For Clothing garment jacket",
        price: "21,452",
        qty: 2,
    },
    {
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg",
        title:
            "Factory Direct Sales Stainless Steel Heat Resistant Custom Compression Spring Manufacturer Spring Steel",
        price: "17,652",
        qty: 2,
    },
];

const SideBar = () => (
    <div className="card shadow-sm p-4">
        <h5 className="card-title">Order Summary</h5>
        <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
                <span>Sub total</span>
                <strong>$2099</strong>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <span>Shipping Fee</span>
                <strong>$99</strong>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <strong>$168</strong>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <span className="fs-5 fw-bold">Total</span>
                <strong>$2238</strong>
            </div>
            <button className="btn btn-primary w-100 mt-3">BUY (13)</button>
        </div>
    </div>
);

const QtyField = ({ name, value, onChange }) => {
    const dispatch = useDispatch();
    const qtyControl = (qty) =>
        onChange({
            target: {
                name,
                type: "radio",
                value: qty < 1 ? 1 : qty,
            },
        });

    return (
        <div className="input-group">
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                    qtyControl(parseInt(value) - 1);
                    dispatch(incrementByAmount(-1));
                }}
            >
                -
            </button>
            <input
                type="number"
                className="form-control text-center"
                value={value}
                onChange={(e) => qtyControl(e.target.value)}
            />
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => qtyControl(parseInt(value) + 1)}
            >
                +
            </button>
        </div>
    );
};

QtyField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
};

const ProductItem = ({ item, index, onChange }) => {
    const { img, title, price, qty } = item;
    return (
        <div className="card mb-3 shadow-sm">
            <div className="row g-0">
                <div className="col-md-3">
                    <img
                        src={img}
                        alt={title}
                        className="img-fluid rounded-start"
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Rs. {price}</h6>
                        <QtyField
                            name={`ezy__epcart2-qty-${index}`}
                            value={qty}
                            onChange={(e) => onChange(e, index)}
                        />
                    </div>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Epcart2 = () => {
    const [products, setProducts] = useState([...productList]);

    const onChange = (e, index) => {
        const { value } = e.target;

        setProducts([
            ...products.slice(0, index),
            {
                ...products[index],
                qty: value,
            },
            ...products.slice(index + 1),
        ]);
    };

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row g-4">
                    {/* Products */}
                    <div className="col-lg-8">
                        {products.map((item, i) => (
                            <ProductItem
                                item={item}
                                index={i}
                                onChange={onChange}
                                key={i}
                            />
                        ))}
                    </div>
                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <SideBar />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Epcart2;
