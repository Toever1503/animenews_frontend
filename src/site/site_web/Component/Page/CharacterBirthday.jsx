import { PageHeader, Card, Pagination, Input, Select } from 'antd';
import BreadCrumb from '../../../component/BreadCrumb';
import { useState, useEffect } from 'react';

export default function CharacterBirthday() {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [days, setDays] = useState([]);

    const breadCrumbRoutes = [{
        path: 'sinh_nhat_nhan_vat_anime',
        name: 'Sinh Nhật Nhân Vật Anime'
    }];

    const { Meta } = Card;
    const { Option } = Select;
    const pageSize = [21, 28, 42];

    const pageIndexChange = (page, pageSize) => {
    }
    const moveAnimeDetail = (e) => {
        console.log(e.target)
    }

    const [currentDayMonth, updateCurrentDayMonth] = useState({
        day: 1,
        month: 1
    });

    const gridStyle = {
        width: '8.33%',
        textAlign: 'center',
        cursor: 'pointer',
        height: '35px',
        padding: '10px'
    };

    const changeMonth = (e) => {
        const mo = Number(e.target.getAttribute('data-key'));
        if (mo === 2)
            initialDayList(29);
        else if (mo === 1 || mo === 3 || mo === 5 || mo === 7 || mo === 9 || mo === 11)
            initialDayList(30);
        else
            initialDayList(31);
    }

    const initialDayList = (total) => {
        let ds = [];
        for (let i = 1; i <= total; ++i) {
            ds.push(i);
        }
        setDays(ds);
    }

    const changeDay = (e) => {
    }

    useEffect(()=>{
        initialDayList(31);
    },[]);
    
    return (
        <>
            <BreadCrumb create={breadCrumbRoutes} />
            <PageHeader title='Anime Trending' subTitle='Top anime trending' style={{ padding: 0 }} />
            <Card style={{ marginBottom: '10px' }}>
                {month.map(m => (
                    <Card.Grid key={'month' + m} data-key={m} style={gridStyle} onClick={changeMonth}>Tháng {m}</Card.Grid>
                ))}
            </Card>
            <div className="chooseDayOfMonth">
                <Input.Group compact className='d-block' style={{ margin: '5px auto', width: '100px' }}  >
                    <Select defaultValue="Ngày 1 " >
                        {days.map(d => (
                            <Option key={'day' + d} value={d}>Ngày {d}</Option>
                        ))}
                    </Select>
                </Input.Group>
            </div>
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
                <Card hoverable onClick={moveAnimeDetail}
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