import { Carousel } from 'antd';
import '../../css/home.css';
import PostCarousel from '../carousel/PostCarousel';
import PostBox from '../Post/PostBox';
import BreadCrumb from '../../../component/BreadCrumb';
import AnimeItem from '../Post/AnimeItem';
import PostSumary from '../Post/PostSumary';

export default function Home() {
    return (
        <>
            <BreadCrumb />
            <div id='carouselHome' className='d-flex'>
                <div className="carouselHomeLeft h-100" style={{ paddingRight: '5px' }}>
                    <div className="h-100 position-relative" >
                        <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                            <PostCarousel />
                            <PostCarousel />
                            <PostCarousel />
                        </Carousel>
                    </div>
                </div>
                <div className="carouselHomeRight h-100 position-relative">
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        <PostCarousel />
                        <PostCarousel />
                        <PostCarousel />
                    </Carousel>
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        <PostCarousel />
                        <PostCarousel />
                        <PostCarousel />
                    </Carousel>
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        <PostCarousel />
                        <PostCarousel />
                        <PostCarousel />
                    </Carousel>
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        <PostCarousel />
                        <PostCarousel />
                        <PostCarousel />
                    </Carousel>
                </div>
            </div>

            <div className="main-content">
                <div>
                    <div className="secondCategory">
                        <h3 className='title'>Tin anime</h3>
                        <div className="boxCategory">
                            <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                <PostBox />
                            </div>
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                        </div>
                    </div>
                    <div className="secondCategory">
                        <h3 className='title'>Manga</h3>
                        <div className="boxCategory">
                            <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                <PostBox />
                            </div>
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                        </div>
                    </div>
                    <div className="topCategory">
                        <h3 className='title'>Tin Anime mới</h3>
                        <div className="boxCategory">
                            <PostBox />
                            <PostBox />
                            <PostBox />
                            <PostBox />
                        </div>
                    </div>
                </div>
                <article>
                    <div className="adsContent ads-2">
                    </div>
                    <div className="popularAnime">
                        <h3 className="title">Top anime tuần</h3>
                        <div className="animeContainer">
                            <AnimeItem />
                            <AnimeItem />
                            <AnimeItem />
                            <AnimeItem />
                            <AnimeItem />
                        </div>
                    </div>
                    <div className="suggestPost">
                        <h3 className="title">Bài viết đề xuất</h3>
                        <div className="suggestPostContainer">
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                        </div>
                    </div>
                </article>
            </div>

        </>
    );
}