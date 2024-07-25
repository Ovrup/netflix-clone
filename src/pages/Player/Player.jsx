import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { Link, useParams } from 'react-router-dom';
import { getYoutubeVideoApi } from '../../apis';

const Player = () => {
    const { id } = useParams();
    const [video, setVideo] = useState({
        name: '',
        key: '',
        type: '',
        published_at: ''
    });
    const MONTHS = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
    }

    async function getYoutubeVideo() {
        const video = await getYoutubeVideoApi(id);
        setVideo(video);
    }

    useEffect(() => {
        getYoutubeVideo()
    }, []);

    function getPublishDate(publishDate) {
        const date = new Date(publishDate);

        return MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    }

    return (
        <div className='player'>
            <Link to='/'>
                <img src={back_arrow_icon} />
            </Link>

            <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${video.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
            <div className="player-info">
                <p>{getPublishDate(video.published_at)}</p>
                <p>{video.name}</p>
                <p>{video.type}</p>
            </div>
        </div>
    )
}

export default Player