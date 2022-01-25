import '../../css/postSumary.css';

export default function PostSumary() {
    return (
        <>
            <div className="postSumary">
                <div className="postCover" style={{ backgroundImage: "url('http://localhost:3000/wp-content/uploads/visual.jpg')" }}></div>
                <div className="postTitle">
                    <h3>Kadokawa phát hành series light novel Higehiro, I’m Quitting Heroing, The Insipid Prince’s Furtive Grab for the Throne</h3>
                    <span className="postedTime"> Tháng Một 12, 2022  Shiki</span>
                </div>
            </div>
        </>
    );
}