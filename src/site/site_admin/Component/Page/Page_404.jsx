import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function Page_404() {
    return (<>
        <div id="404">
            <img style={{ 'width': "600px" }} className='m-auto d-block' src='https://www.udacity.com/blog/wp-content/uploads/2021/02/img8.png.webp' />
            <div className='m-auto d-flex justify-content-center mb-2'>
                <Link to='/'>
                    <Button type="primary">Back home</Button>
                </Link>
            </div>
        </div>
    </>);
}