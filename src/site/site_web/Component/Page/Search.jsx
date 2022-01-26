import { useParams } from "react-router-dom";
import { PageHeader, Input, Select, Pagination } from 'antd';
import BreadCrumb from '../../../component/BreadCrumb';
import '../../css/search.css';
import PostSumary from "../Post/PostSumary";

export default function Search() {
    const breadCrumbRoutes = [{
        path: 'sinh_nhat_nhan_vat_anime',
        name: 'Tìm kiếm'
    }];
    const { Option } = Select;
    const { q } = useParams();
    const pageSize = [12, 24, 36];
    const pageIndexChange = (page, pageSize) => {
    }
    return (
        <>
            <BreadCrumb create={breadCrumbRoutes} />
            <PageHeader className='searchTitle' title='Tìm kiếm với' subTitle={q} style={{ padding: 0 }} />
            <div className="searchFilter">
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
            </div>

            <div className="containerSearch">
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                    <PostSumary />
                <div className="pageNumber" style={{ gridColumn: '1 / 4', margin: '10px auto' }}>
                    <Pagination defaultCurrent={1} total={99} pageSizeOptions={pageSize} defaultPageSize={12} onChange={pageIndexChange} />
                </div>
            </div>

        </>
    );
}