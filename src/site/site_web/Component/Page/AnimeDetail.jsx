import { useParams, Link } from "react-router-dom";
import { Card, PageHeader } from 'antd';
import { useEffect } from 'react';
import BreadCrumb
    from "../../../component/BreadCrumb";
import '../../css/anime.css';

export default function AnimeDetail() {
    const queryParams = new URLSearchParams(window.location.search);
    const ids = queryParams.get('id');
    const type = queryParams.get('type');

    console.log('url params');
    console.log('id->' + ids);
    console.log('type->' + type);


    useEffect(() => {
        console.log('change');
    }, [ids, type]);

    const { id, anime_name } = useParams();
    const { Meta } = Card;
    // check if id invalid
    // if(isNaN(id)){
    //     alert('not number');
    // }


    const moveAnimeDetail = (e) => {
        console.log(e.target)
    }
    const breadCrumbRoutes = [{
        path: 'character',
        name: 'Anime'
    },
    {
        path: null,
        name: anime_name
    }];

    return (
        <>
            <BreadCrumb create={breadCrumbRoutes} />
            character
            {id}

            <div className="animeDetail">
                <div className="animeStats">
                    <div className="animeImage">
                        <img src="https://animenews.life//uploads/chars/4758-556828177.jpg" alt="" />
                        <Link to='#' className="text-center">Xem phim tại đây.</Link>
                    </div>
                    <div className="stats">
                        <p className='title'>Tiếng Anh:
                            <span className='value'>fafas</span>
                        </p>

                        <p className='title'>Tiếng Nhật:
                            <span className='value'>fadfa</span>
                        </p>

                        <p className='title'>Tiếng Việt:
                            <span className='value'>fadfa</span>
                        </p>

                        <p className='title'>Điểm Trung Bình (Theo Anilist):
                            <span className='value'>fadfa</span>
                        </p>

                        <p className='title'>Trending:
                            <span className='value'>fgafa</span>
                        </p>

                        <p className='title'>Định Dạng:
                            <span className='value'>fagfa</span>
                        </p>

                        <p className='title'>Thể Loại:
                            <span className='value'>fafsa</span>
                        </p>

                        <p className='title'>Số Tập:
                            <span className='value'>fafa2</span>
                        </p>
                        <p className='title'>Thời Lượng( /1 Tập):
                            <span className='value'>fafa2</span>
                        </p>

                        <p className='title'>Chuyển Thể Từ:
                            <span className='value'>fafa2</span>
                        </p>

                        <p className='title'>Studios:
                            <span className='value'>fafa2</span>
                        </p>

                        <p className='title'>Season:
                            <span className='value'>fafa2</span>
                        </p>

                        <p className='title'>Tình Trạng:
                            <span className='value'>fafa2</span>
                        </p>

                    </div>
                </div>
                <div className="animeInfo">
                    <div className="animeDesctiption">
                        <h1 className='text-center animeName'>Takahashi Ichimonji </h1>
                        <div className="description">
                            Dựa trên cuốn tiểu thuyết kinh điển nổi tiếng Les Miserables.

                            Làm mẹ đơn thân là khó khăn vào đầu thế kỷ 19 ở Pháp. Khi Cosette trẻ tuổi đi du lịch cùng mẹ cố gắng tìm việc làm và một nơi để sống, họ luôn bị xa lánh vì rất ít nhà tuyển dụng thuê các bà mẹ đơn thân. Khi cô được hứa hẹn với sự thịnh vượng khi làm việc tại thành phố lớn, Cosette bị tách khỏi mẹ với hy vọng một người chăm sóc sẽ trông chừng cô trong khi mẹ cô kiếm được một số tiền. Thật không may, đây là một mánh khóe và người chăm sóc là một người đàn ông tham nhũng, người khiến Cosette trở thành người hầu của mình. Sau đó, thị trưởng tốt bụng của thị trấn mà Cosette làm cho ngôi nhà mới của mình thấy gió thay đổi gây bất lợi cho trẻ em và gia đình như thế nào, và quyết định làm điều gì đó về nó.

                            (Nguồn: Anime News Network)
                        </div>
                    </div>

                    <div className="adsContent ads-1">
                    </div>

                    <div className="relatedCharacter">
                        <PageHeader title='Nhân vật liên quan' style={{ padding: 0 }} />
                        <div className="animeCharacterContainer">
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                        </div>
                    </div>

                    <div className="relatedAnime">
                        <PageHeader title='Anime liên quan' style={{ padding: 0 }} />

                        <div className="animeCharacterContainer">
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                            <Card hoverable onClick={moveAnimeDetail}
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                                <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}