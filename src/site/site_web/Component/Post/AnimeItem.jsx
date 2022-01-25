import '../../css/animeItem.css';
import { HeartFilled } from '@ant-design/icons';

export default function AnimeItem() {
    return (
        <>
            <div className="animeItem">
                <div className="animeCover" style={{ backgroundImage: "url('http://localhost:3000/logo512.png')" }}></div>
                <div className="animeInfo">
                    <b className='text-center d-block '><a href="">Yumina Takanashi</a></b>
                    <span className='d-block'># </span>
                    <span className='d-block'><HeartFilled /></span>
                </div>
            </div>
        </>
    );
}