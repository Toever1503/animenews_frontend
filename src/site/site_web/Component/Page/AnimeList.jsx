import { PageHeader, Pagination, Card } from 'antd';
import BreadCrumb from '../../../component/BreadCrumb';
import '../../css/anime.css';
import React from 'react';
export default function AnimeList() {
    const breadCrumbRoutes = [{
        path: 'anime_trending',
        name: 'Anime Trending'
    }];

    const { Meta } = Card;
    const pageSize = [21, 28, 42];

    const pageIndexChange = (page, pageSize)=>{
    }

    const moveAnimeDetail = (e) => {
        console.log(e.target)
    }

    return (
        <>
            <BreadCrumb create={breadCrumbRoutes} />
            <PageHeader title='Anime Trending' subTitle='Top anime trending' style={{ padding: 0 }} />
            <div className="animeCharacterContainer">
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <Card hoverable onClick={moveAnimeDetail}
                    style={{ width: 170 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                    <Meta title="Europe Street beat" style={{ padding: '3px' }} />
                </Card>
                <div className="pageNumber" style={{ gridColumn: '1 / 8', margin: '10px auto' }}>
                    <Pagination defaultCurrent={1} total={99} pageSizeOptions={pageSize} defaultPageSize={21} onChange={pageIndexChange} />
                </div>
            </div>
        </>
    );
}