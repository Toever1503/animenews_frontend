import { Carousel } from 'antd';
import '../../css/home.css';
import PostCarousel from '../carousel/PostCarousel';
import PostBox from '../Post/PostBox';
import BreadCrumb from '../../../component/BreadCrumb';
import AnimeItem from '../Post/AnimeItem';
import PostSumary from '../Post/PostSumary';
import React, { useEffect } from 'react';
import { getPostCarousels, getPosts } from '../../../../axios/common_api/post_api';
import {Button} from 'antd';

export default function Home() {

    const [carousel1, setCarousel1] = React.useState([]);
    const [carousel2, setCarousel2] = React.useState([]);
    const [carousel3, setCarousel3] = React.useState([]);
    const [carousel4, setCarousel4] = React.useState([]);
    // const [carousel5, setCarousel5] = React.useState([]);

    const [newsLatestPost, setNewsLatestPost] = React.useState([]);
    const [mangaLatestPost, setMangaLatestPost] = React.useState([]);
    const [gameLatestPost, setGameLatestPost] = React.useState([]);

    const viewMoreLinkCss = {float: 'right', right: '40px'};

    useEffect( () => {
        getPostCarousels([1, 2, 3, 208, 588])
            .then(res => {
                const { data } = res;
                setCarousel1(data[0]);
                setCarousel2(data[1]);
                setCarousel3(data[2]);
                setCarousel4(data[3]);
                setCarousel4(data[4]);
            })
            .catch(err => console.log(err));

        // get post by news term with id= 2
        getPosts(2, 0, 7).then(res => {
            const { data } = res;
            setNewsLatestPost(data.content);
        })
            .catch(err => console.log(err));

        // get post by manga term with id= 11
        getPosts(11, 0, 7).then(res => {
            const { data } = res;
            setMangaLatestPost(data.content);
            console.log('manga post size: ', data.content.length);
            console.log(data.content)
        }).catch(err => console.log(err));

        // get post by game term with id= 208
        getPosts(208, 0, 7).then(res => {
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
                <div className="carouselHomeRight h-100 position-relative">
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        {
                            carousel1.length !== 0 && carousel1.map(item => (<PostCarousel key={'carousel2_' + item.id} data={item} />))
                        }
                    </Carousel>
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        {
                            carousel1.length !== 0 && carousel2.map(item => (<PostCarousel key={'carousel3_' + item.id} data={item} />))
                        }
                    </Carousel>
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        {
                            carousel1.length !== 0 && carousel3.map(item => (<PostCarousel key={'carousel4_' + item.id} data={item} />))
                        }
                    </Carousel>
                    <Carousel dotPosition={'top'} autoplay='true' className='h-100 pr-2'>
                        {
                            carousel1.length !== 0 && carousel4.map(item => (<PostCarousel key={'carousel5_' + item.id} data={item} />))
                        }
                    </Carousel>
                </div>
            </div>

            <div className="main-content">
                <div>
                    <div className="secondCategory">
                        <h3 className='title'>Tin anime
                            <Button type="link" style={viewMoreLinkCss} size='small'>
                                Xem thêm
                            </Button>
                        </h3>
                        <div className="boxCategory">
                            {
                                newsLatestPost.length !== 0 &&
                                (
                                    <>
                                        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                            <PostBox key={'newPost'} data={newsLatestPost[0]} />
                                        </div>
                                        <PostBox key={'newPost_' + newsLatestPost[1].id} data={newsLatestPost[1]} />
                                        <PostBox key={'newPost_' + newsLatestPost[2].id} data={newsLatestPost[2]} />
                                        <PostBox key={'newPost_' + newsLatestPost[3].id} data={newsLatestPost[3]} />
                                        <PostBox key={'newPost_' + newsLatestPost[4].id} data={newsLatestPost[4]} />
                                        <PostBox key={'newPost_' + newsLatestPost[5].id} data={newsLatestPost[5]} />
                                        <PostBox key={'newPost_' + newsLatestPost[6].id} data={newsLatestPost[6]} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="secondCategory">
                        <h3 className='title'>Manga
                            <Button type="link" style={viewMoreLinkCss} size='small'>
                                Xem thêm
                            </Button>
                        </h3>
                        <div className="boxCategory">
                            {
                                mangaLatestPost.length !== 0 && (
                                    <>
                                        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                            <PostBox key={'mangaPost'} data={mangaLatestPost[0]} />
                                        </div>
                                        <PostBox key={'mangaPost_' + mangaLatestPost[1].id} data={mangaLatestPost[1]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[2].id} data={mangaLatestPost[2]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[3].id} data={mangaLatestPost[3]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[4].id} data={mangaLatestPost[4]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[5].id} data={mangaLatestPost[5]} />
                                        <PostBox key={'mangaPost_' + mangaLatestPost[6].id} data={mangaLatestPost[6]} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="topCategory">
                        <h3 className='title'>Tin Game Anime mới
                            <Button type="link" style={viewMoreLinkCss}  size='small'>
                                Xem thêm
                            </Button>
                        </h3>
                        <div className="boxCategory">
                            {
                                gameLatestPost.length !== 0 && (
                                    <>
                                        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                                            <PostBox key={'mangaPost'} data={gameLatestPost[0]} />
                                        </div>
                                        <PostBox key={'mangaPost_' + gameLatestPost[1].id} data={gameLatestPost[1]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[2].id} data={gameLatestPost[2]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[3].id} data={gameLatestPost[3]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[4].id} data={gameLatestPost[4]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[5].id} data={gameLatestPost[5]} />
                                        <PostBox key={'mangaPost_' + gameLatestPost[6].id} data={gameLatestPost[6]} />
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