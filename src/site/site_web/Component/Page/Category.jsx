import { useParams } from "react-router-dom";
import BreadCrumb from '../../../component/BreadCrumb';
import PostBox from "../Post/PostBox";
// import PostSumary from "../Post/PostSumary";
import { PageHeader, Pagination } from 'antd';
import '../../css/pageCategory.css';
import React from "react";

export default function Categoryzz() {
    const { category } = useParams();
    const breadCrumbRoutes = [];
    breadCrumbRoutes.push(category);

    const pageSize = [9, 12, 36];
    const pageIndexChange = (page, pageSize) => {
        console.log(page + "-" + pageSize)
    }

    return (
        <>
            <div className="main-content pageCategory">
                <div className="boxContainer">
                    <div className="categoryInfo" style={{ gridColumn: '1 / 10' }}>
                        <BreadCrumb create={breadCrumbRoutes} />
                        <PageHeader title='Category' subTitle='post category' style={{padding: 0}} />
                    </div>
                    {/* <PostBox />
                    <PostBox />
                    <PostBox />
                    <PostBox />
                    <PostBox />
                    
                    <PostBox />
                    <PostBox />
                    <PostBox />
                    <PostBox />
                    <PostBox /> */}
                    <div className="pageNumber" style={{ gridColumn: '1 / 10', margin: '10px auto' }}>
                        <Pagination defaultCurrent={1} total={99} pageSizeOptions={pageSize} defaultPageSize={12} onChange={pageIndexChange} />
                    </div>
                </div>
                {/* <article>
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
                </article> */}
            </div>
        </>
    );
}