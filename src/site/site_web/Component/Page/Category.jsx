import { useParams } from "react-router-dom";
import BreadCrumb from '../../../component/BreadCrumb';
import PostBox from "../Post/PostBox";
// import PostSumary from "../Post/PostSumary";
import { PageHeader, Pagination } from 'antd';
import '../../css/pageCategory.css';
import React, { useEffect, useState } from "react";
import { getTerm } from "../../../../axios/common_api/term_api";
import { getPosts } from "../../../../axios/common_api/post_api";

export default function Categoryzz() {
    const { category } = useParams();
    const breadCrumbRoutes = [{
        name: 'news'
    }];

    const [catId, setCatId] = useState(null);
    const [posts, setPosts] = React.useState([]);

    // 
    breadCrumbRoutes.push(category);

    const pageSizes = [12, 16, 20];
    const pageIndexChange = (page, pageSize) => {
        console.log(page + "-" + pageSize)
        getPosts(catId, page - 1, pageSize)
            .then(res => {
                const { data } = res;
                setPosts(data.content);
                console.log(data)
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        getTerm(category)
            .then(res => {
                if (res.data === '') { }
                else {
                    setCatId(res.data.id);
                    getPosts(res.data.id, 0, pageSizes[0])
                        .then(res => {
                            const { data } = res;
                            setPosts(data.content);
                            console.log(data)
                        }).catch(err => console.log(err));
                }

            })
            .catch(err => console.log(err));
    }, [category]);

    return posts.length !== 0 && (
        <>
            <div className="main-content pageCategory">
                <div className="categoryInfo">
                    <BreadCrumb create={breadCrumbRoutes} />
                </div>
                <div className="boxContainer">

                    {posts.length > 0 && posts.map(post => (
                        <>
                            <PostBox key={'newPost_' + post.id} height='180px' data={post} />
                        </>
                    ))}

                </div>
                <div className="pageNumber d-flex justify-content-center" style={{ margin: '10px auto' }}>
                    <Pagination defaultCurrent={1} total={99} pageSizeOptions={pageSizes} defaultPageSize={12} onChange={pageIndexChange} />
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