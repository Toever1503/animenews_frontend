import { Carousel } from 'antd';
import '../../css/home.css';
import PostCarousel from '../carousel/PostCarousel';
import PostBox from '../Post/PostBox';
import BreadCrumb from '../../../component/BreadCrumb';
import AnimeItem from '../Post/AnimeItem';
import PostSumary from '../Post/PostSumary';
import React, { useEffect } from 'react';
import { getPostCarousels, getPosts } from '../../../../axios/common_api/post_api';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function Home() {

    const [carousel1, setCarousel1] = React.useState([]);
    const [carousel2, setCarousel2] = React.useState([]);
    const [carousel3, setCarousel3] = React.useState([]);
    const [carousel4, setCarousel4] = React.useState([]);
    // const [carousel5, setCarousel5] = React.useState([]);

    const [newsLatestPost, setNewsLatestPost] = React.useState([]);
    const [mangaLatestPost, setMangaLatestPost] = React.useState([]);
    const [gameLatestPost, setGameLatestPost] = React.useState([]);

    const viewMoreLinkCss = { float: 'right', right: '40px' };

    useEffect(() => {
        getPostCarousels([2, 3, 4])
            .then(res => {
                const { data } = res;
                setCarousel1(data[0]);
                setCarousel2(data[1]);
                setCarousel3(data[2]);
            })
            .catch(err => console.log(err));

        // get post by news term with id= 2
        getPosts(2, 0, 7).then(res => {
            const { data } = res;
            setNewsLatestPost(data.content);
        })
            .catch(err => console.log(err));

        // get post by manga term with id= 11
        getPosts(3, 0, 7).then(res => {
            const { data } = res;
            setMangaLatestPost(data.content);
        }).catch(err => console.log(err));

        // get post by game term with id= 208
        getPosts(4, 0, 7).then(res => {
            const { data } = res;
            setGameLatestPost(data.content);
        })
            .catch(err => console.log(err));

        return () => { };
    }, []);

    return (
        <>
            <BreadCrumb />
            <div id='carouselHome' className='d-flex'>
                <div className="carouselHomeLeft h-100" style={{ paddingRight: '5px' }}>
                    <div className="h-100 position-relative" >
                        <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                            {
                                carousel1.length !== 0 && carousel1.map(item => (<PostCarousel key={'carousel1_' + item.id} data={item} />))
                            }
                        </Carousel>
                    </div>
                </div>
                <div className="carouselHomeRight h-100">
                    <div className="h-100 position-relative" >
                        <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                            {
                                carousel2.length !== 0 && carousel2.map(item => (<PostCarousel key={'carousel2_' + item.id} data={item} />))
                            }
                        </Carousel>
                    </div>
                    <div className="h-100 position-relative" >
                        <Carousel dotPosition={'top'}  autoplay='true' className='h-100 pr-2'>
                            {
                                carousel3.length !== 0 && carousel3.map(item => (<PostCarousel key={'carousel3_' + item.id} data={item} />))
                            }
                        </Carousel>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div>
                    <div className="secondCategory">
                        <h3 className='title'>Tin anime
                            <Button type="link" style={viewMoreLinkCss} size='small'>
                                <Link to='/news'>Xem thêm</Link>
                            </Button>
                        </h3>
                        <div className="boxCategory">
                            {
                                newsLatestPost.length !== 0 &&
                                (
                                    <>
                                        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                            <PostBox key={'newPost'} height='245px' data={newsLatestPost[0]} />
                                        </div>
                                        <PostBox key={'newPost_' + newsLatestPost[1].id} height='120px' data={newsLatestPost[1]} />
                                        <PostBox key={'newPost_' + newsLatestPost[2].id} height='120px' data={newsLatestPost[2]} />
                                        <PostBox key={'newPost_' + newsLatestPost[3].id} height='120px' data={newsLatestPost[3]} />
                                        <PostBox key={'newPost_' + newsLatestPost[4].id} height='120px' data={newsLatestPost[4]} />
                                        <PostBox key={'newPost_' + newsLatestPost[5].id} height='120px' data={newsLatestPost[5]} />
                                        <PostBox key={'newPost_' + newsLatestPost[6].id} height='120px' data={newsLatestPost[6]} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="secondCategory">
                        <h3 className='title'>Manga
                            <Button type="link" style={viewMoreLinkCss} size='small'>
                            <Link to='/manga'>Xem thêm</Link>
                            </Button>
                        </h3>
                        <div className="boxCategory">
                            {
                                mangaLatestPost.length !== 0 && (
                                    <>
                                        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                            <PostBox key={'mangaPost'} height='245px' data={mangaLatestPost[0]} />
                                        </div>
                                        <PostBox key={'mangaPost_' + mangaLatestPost[1].id} height='120px' data={mangaLatestPost[1]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[2].id} height='120px' data={mangaLatestPost[2]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[3].id} height='120px' data={mangaLatestPost[3]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[4].id} height='120px' data={mangaLatestPost[4]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[5].id} height='120px' data={mangaLatestPost[5]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[6].id} height='120px' data={mangaLatestPost[6]} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="topCategory">
                        <h3 className='title'>Tin Game Anime mới
                            <Button type="link" style={viewMoreLinkCss} size='small'>
                            <Link to='/game'>Xem thêm</Link>
                            </Button>
                        </h3>
                        <div className="boxCategory">
                            {
                                gameLatestPost.length !== 0 && (
                                    <>
                                        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                            <PostBox key={'mangaPost'} height='245px' data={gameLatestPost[0]} />
                                        </div>
                                        <PostBox key={'mangaPost_' + gameLatestPost[1].id} height='120px' data={gameLatestPost[1]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[2].id} height='120px' data={gameLatestPost[2]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[3].id} height='120px' data={gameLatestPost[3]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[4].id} height='120px' data={gameLatestPost[4]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[5].id} height='120px' data={gameLatestPost[5]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[6].id} height='120px' data={gameLatestPost[6]} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <article>
                    <div className="adsContent ads-2">
                    </div>
                    {/* <div className="popularAnime">
                        <h3 className="title">Top anime tuần</h3>
                        <div className="animeContainer">
                            <AnimeItem />
                            <AnimeItem />
                            <AnimeItem />
                            <AnimeItem />
                            <AnimeItem />
                        </div>
                    </div> */}
                    <div className="suggestPost">
                        <h3 className="title">Bài viết đề xuất</h3>
                        <div className="suggestPostContainer">
                            {/* <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary />
                            <PostSumary /> */}
                        </div>
                    </div>
                </article>
            </div>

        </>
    );
}