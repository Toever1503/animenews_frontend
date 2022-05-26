import { useParams } from "react-router-dom";
import { PageHeader, Input, Select, Pagination } from 'antd';
import BreadCrumb from '../../../component/BreadCrumb';
import '../../css/search.css';
import PostSumary from "../Post/PostSumary";
import React, { useEffect } from "react";
import { searchPosts } from "../../../../axios/common_api/post_api";
export default function Search() {
    const { q } = useParams();
    const breadCrumbRoutes = [{
        path: 'sinh_nhat_nhan_vat_anime',
        name: 'Tìm kiếm'
    }, {
        name: q
    }];

    const [posts, updatePosts] = React.useState([]);
    // const { Option } = Select;

    const pageSizes = [16, 20, 36];
    const pageIndexChange = (page, pageSize) => {
        searchPosts(q, page, pageSize)
            .then(res => {
                const data = res.data;
                updatePosts(data.content);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        searchPosts(q, 0, pageSizes[0])
            .then(res => {
                const data = res.data;
                updatePosts(data.content);
            })
            .catch(err => console.log(err));
    }, [q]);

    return (
        <>
            <div style={{ minHeight: '700px' }}>
                <BreadCrumb create={breadCrumbRoutes} />
                <PageHeader className='searchTitle' title='Tìm kiếm với' subTitle={q} style={{ padding: 0 }} />
                {/* <div className="searchFilter">
                <p className="title">Lọc theo</p>
                <div className="filterContainer">
                    <div className="filterItem text-center">Bài Viết</div>
                    <div className="filterItem text-center">Anime</div>
                    <div className="filterItem text-center">Nhân vật anime</div>
                    <div className="filterItem text-center">Mới Nhất</div>
                    <div className="filterItem text-center">Nhiều Lượt Xem Nhất</div>
                    <div className="filterItem text-center">
                        <Input.Group compact className='d-block' style={{ margin: '5px auto', width: '100px' }}  >
                            <Select defaultValue='' >
                                <Option value=''>Sắp Xếp</Option>
                                <Option value='asc'>Tăng Dần</Option>
                                <Option value='desc'>Giảm Dần</Option>
                            </Select>
                        </Input.Group>
                    </div>
                </div>
            </div> */}
                {
                    posts.length === 0 ?
                        <h3 class='text-center mt-2 bg-waning'>Not found any posts</h3>
                        :
                        <div className="containerSearch">
                            {
                                posts.map((post) => (
                                    <PostSumary data={post} />
                                ))
                            }
                            <div className="pageNumber" style={{ gridColumn: '1 / 4', margin: '10px auto' }}>
                                <Pagination defaultCurrent={1} total={99} pageSizeOptions={pageSizes} defaultPageSize={pageSizes[0]} onChange={pageIndexChange} />
                            </div>
                        </div>
                }
            </div>

        </>
    );
}