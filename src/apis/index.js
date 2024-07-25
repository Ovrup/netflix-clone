const REACT_APP_BASE_URL = "https://api.themoviedb.org/3/movie/";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTI2ZWJkYWJmYzhlNTk5NGVkZWUyMDY3NzE0ODM1MiIsIm5iZiI6MTcyMTg5Mjg3MC45NzUxLCJzdWIiOiI2NmExZjhjZTI3YzQyNGE4ODk4MGYzZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iTlD2lNXNzby_s9zZMXDsHXJoXuZ7jcjbscqKYUlnWY'
    }
};

export const getMoviesListApi = async (category) => {
    const response = await fetch(`${REACT_APP_BASE_URL}${category ? category : "now_playing"}?language=en-US&page=1`, options);
    const moviesList = await response.json();

    return moviesList.results;
}

export const getYoutubeVideoApi = async (id) => {
    const response = await fetch(`${REACT_APP_BASE_URL}${id}/videos?language=en-US`, options);
    const data = await response.json();
    const trailer = data.results.find((movie) => movie.type === "Trailer");
    const video = {
        name: trailer.name,
        key: trailer.key,
        type: trailer.type,
        published_at: trailer.published_at
    };
    return video
}