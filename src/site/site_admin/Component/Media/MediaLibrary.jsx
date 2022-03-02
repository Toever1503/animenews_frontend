import '../../css/MediaLibrary.css';
import { Input, Button, Select, PageHeader } from 'antd';
import UploadFile from './UploadFile.jsx';
import LibraryList from './LibraryList.jsx';

export default function MediaLibrary() {
    const { Search } = Input;
    const { Option } = Select;


    const onSearchImage = keyword => {
        console.log(keyword);
    }
    return (
        <>
            <div id="mediaLibrary">
                <div className='mediaLibrary_content p-2'>
                    <div className='mediaLibrary_content_header'>
                        <div className='mediaLibrary_content_header_title'>
                            <h3>Add Media</h3>
                        </div>
                        <div className='mediaLibrary_content_header_bottom'>
                            <Button size='default'>Upload files</Button>
                            <Button size='default'>Media Library</Button>
                        </div>
                    </div>

                    <div className='mediaLibrary_content_body'>
                        <div className='mediaLibrary_content_body_upload'>
                            <div className='mediaLibrary_content_body_upload_title d-none'>
                                <UploadFile />
                            </div>
                        </div>
                        <div className='mediaLibrary_content_body_mediaLibrary'>
                            <div className="mediaLibrary_content_body_mediaLibrary_left">
                                <div className='mediaLibrary_content_body_mediaLibrary_left_title d-flex'>
                                    <div className="mediaLibrary_content_body_mediaLibrary_left_title_filter">
                                        <p className='m-0'><b>Filter</b></p>
                                        <Select defaultValue="">
                                            <Option value="">All media items</Option>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                        </Select>
                                        <Select defaultValue="">
                                            <Option value="">All dates</Option>
                                        </Select>
                                    </div>
                                    <div className="mediaLibrary_content_body_mediaLibrary_left_title_search">
                                        <p className='m-0'><b>Search Image</b></p>
                                        <Search
                                            placeholder="Image searching..."
                                            allowClear
                                            onSearch={onSearchImage}
                                        />
                                    </div>
                                </div>
                                <div className='mediaLibrary_content_body_mediaLibrary_left_content'>
                                    <LibraryList />
                                </div>
                            </div>
                            <div className="mediaLibrary_content_body_mediaLibrary_right">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}