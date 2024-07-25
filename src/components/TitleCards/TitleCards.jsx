import React, { useEffect, useRef, useState } from 'react';
import Cards_Data from '../../assets/cards/Cards_data'
import './TitleCards.css'
import { Link } from 'react-router-dom';
import { getMoviesListApi } from '../../apis';

const TitleCards = ({ title, category }) => {
    const [moviesList, setMoviesList] = useState([])
    const cardsRef = useRef();

    function handleWheel(e) {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    }


    async function getMoviesList() {
        const res = await getMoviesListApi(category);
        setMoviesList(res);
    }

    useEffect(() => {
        getMoviesList()
    }, [])

    useEffect(() => {
        cardsRef.current.addEventListener("wheel", handleWheel)
    }, [])
    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {moviesList.map((card, idx) => {
                    return <Link to={`/player/${card.id}`}>
                        <div className="card" key={idx}>
                            <img src={"https://image.tmdb.org/t/p/w500" + card.backdrop_path} />
                            <p>{card.original_title}</p>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards