import { Layout, Menu, Dropdown } from 'antd';
import {
    TwitterCircleFilled,
    YoutubeFilled,
    FacebookFilled,
    InstagramFilled,
    DownOutlined
} from '@ant-design/icons';
import './css/footer.css';

export default function SiteFooter() {
    const { Footer } = Layout;

    return (
        <Footer style={{ background: 'black' }}>
            <div className="container footer-content">
                <div className="footerSibar">
                    <div>
                        <h3 className='title position-relative'>Animenews</h3>
                        <span>Tin tức nổi bật mới</span>
                    </div>
                    <div className="followMe">
                        <div >
                            <h3 className="title position-relative">Follow us</h3>
                            <div className="footerSidebar-content">
                                <FacebookFilled />
                                <TwitterCircleFilled />
                                <YoutubeFilled />
                                <InstagramFilled />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footerSibar">
                    <div className="footerSidebar-content">
                        <h3 className='title position-relative'>Các posts trước đó</h3>

                        <div className="footerSidebar-content">
                            <div className="siteYear">
                                <Dropdown placement='bottomCenter' overlay={createMenu}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        2022 <DownOutlined />
                                    </a>
                                </Dropdown>
                                <Dropdown placement='bottomCenter' overlay={createMenu}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        2021 <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footerSibar">
                    <div className="footerSidebar-content">
                        <p>Mọi ý kiến đóng góp, báo lỗi xin gửi mail về shiki@animenews.life</p>
                        <p>Thanks so much - ありがとうございます。</p>
                        <p><a href="https://animenews.life/anime-api-sharing-only-in-viet-nam/">API Sharing! click here</a> </p>
                    </div>
                </div>

            </div>
            <div className="copyright container">
                <div style={{ marginRight: '10px' }}>
                    <p className='m-0'>© 2021-2022&nbsp;Animenews</p> 
                    <p>Powered by WordPress&nbsp;-&nbsp;
                        <a href='https://www.facebook.com/AnimePhims' title="Hamgamweb" target='_blank'>Follow Anime News</a>
                    </p>
                </div>
                <div>
                    <p className='text-white'>Lượt truy cập hôm nay: <span id="anvst">20</span></p>
                </div>
            </div>
        </Footer>
    );
}

function createMenu(menuList) {
    return (
        <Menu>
            <Menu.Item key="va1">1st menu item</Menu.Item>
            <Menu.Item key="2vs">2nd menu item</Menu.Item>
            <Menu.Item key="3gs">3rd menu item</Menu.Item>
        </Menu>
    );
}