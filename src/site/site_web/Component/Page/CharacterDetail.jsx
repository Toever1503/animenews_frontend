import { useParams } from "react-router-dom";
import { Card, PageHeader } from 'antd';
import BreadCrumb
    from "../../../component/BreadCrumb";
import '../../css/anime.css';

export default function CharacterDetail() {
    const { id, character_name } = useParams();
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
        name: 'Nhân Vật Anime'
    },
    {
        path: null,
        name: character_name
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
                        <span>Takahashi Ichimonji is a character from the eroge Muv-Luv.</span>
                    </div>
                    <div className="stats">
                        <p className="title">Tiếng Anh:
                            <p>fafas</p>
                        </p>

                        <p className="title">Tiếng Nhật:
                            <p>fadfa</p>
                        </p>

                        <p className="title">Sinh Nhật:
                            <p>fadfa</p>
                        </p>

                        <p className="title">Tuổi:
                            <p>fgafa</p>
                        </p>
                        <p className="title">Giới Tính:
                            <p>fagfa</p>
                        </p>
                        <p className="title">Nhóm Máu:
                            <p>fafsa</p>
                        </p>
                        <p className="title">Yêu thích:
                            <p>fafa2</p>
                        </p>

                    </div>
                </div>
                <div className="animeInfo">
                    <div className="animeDesctiption">
                        <h1 className='text-center animeName'>Takahashi Ichimonji </h1>
                        <div className="description">
                            đang cập nhật
                        </div>
                    </div>

                    <div className="relatedCharacter">
                        <PageHeader title='Nhân vật liên quan'style={{ padding: 0 }} />
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
                        <PageHeader title='Anime liên quan'style={{ padding: 0 }} />

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