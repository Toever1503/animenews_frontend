import '../../css/MediaLibrary.css';
import { Button, Tabs } from 'antd';
import UploadFile from './UploadFile.jsx';
import LibraryList from './LibraryList.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {closeMediaLibrary} from '../../../../reducers/mediaLibraryReducer';
export default function MediaLibrary() {
    const [dislayMediaLibrary, setDislayMediaLibrary] = useState(false);
    const activeMediaLibrary =   useSelector(state=> state.mediaLibrary.open);  
    const dispatch = useDispatch();

    const closeLibrary = () => {
        dispatch(closeMediaLibrary());
    }

    useEffect(() => {
        setDislayMediaLibrary(activeMediaLibrary);
    },[activeMediaLibrary]);

    return (
        <>
            <div id="mediaLibrary" className={dislayMediaLibrary === true ? '' : 'd-none'}>
                <div className='mediaLibrary_content p-2'>
                    <div className='mediaLibrary_content_header'>
                        <div className='mediaLibrary_content_header_title'>
                            <h3>Add Media</h3>
                            <Button onClick={closeLibrary} type="primary" style={{ position: 'absolute', top: 2, right: 2 }}>X</Button>
                        </div>
                    </div>

                    <div className='mediaLibrary_content_body'>
                        <Tabs defaultActiveKey="mediaUploadImage">
                            <Tabs.TabPane tab="Upload files" key="mediaUploadImage">
                                <UploadFile />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Media Library" key="mediaLoadImages">
                                <LibraryList />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}