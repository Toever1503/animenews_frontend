import '../../css/animeItem.css';
import { HeartFilled } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import React from 'react';
export default function AnimeItem() {
    return (
        <>
            <div className="animeItem">
                <div className="animeCover" style={{ backgroundImage: "url('http://localhost:3000/logo512.png')" }}></div>
                <div className="animeInfo">
                    <b className='text-center d-block '><Link to='#'>Yumina Takanashi</Link></b>
                    <span className='d-block'># </span>
                    <span className='d-block'><HeartFilled /></span>
                </div>
            </div>
        </>
    );
}