import { useState } from 'react';
import {ReactMediaLibrary} from 'react-media-library';

export default function MediaModal(){

    const [showMedia, setShowMedia] = useState(false);

    return (
        <>
            medias
            <ReactMediaLibrary show={showMedia} onHide={()=>setShowMedia(false)}/>

            <p></p>
            <span onClick={()=>{
                setShowMedia(true)
            }}>Show media</span>
        </>
    );
}