export interface IMovieDetail {
    id:string;
    name:string;
    parent:string;
    is_dir:boolean;
    size:number;
    title:string;
    overview:string;
    popularity:number;
    release_date:string;
    runtime:number;
    vote_average:number;
    poster_path:string;
    backdrop_path:string;
    keywords:string[];
    genres:string[];
}