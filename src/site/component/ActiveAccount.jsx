import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { activeAccount } from '../../axios/common_api/account_api';


export default function ActiveAccount() {
    const query = new URLSearchParams(window.location.search);
    const navigate = new useNavigate();

    const account = query.get('account');
    const code = query.get('code');

    console.log(account);
    console.log(code);

    const [check, setCheck] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if ((account === null && code === null)) {
            setMessage('Invalid link, please try again!');
            navigate('/404');
        }
        else {
            activeAccount(account, code)
                .then(res => {
                    if (res.data === true) {
                        setCheck(true);
                        setMessage('Active account successfully!');
                    }
                    else
                        navigate('/404');
                }).catch(err => console.log(err));
        }
    }, []);

    return check !== false && (<>

        <p className="p-2 m-2 bg-waring">{message}</p>
        <Link to='/signin'>
            <Button>Login now</Button>
        </Link>

    </>);
}