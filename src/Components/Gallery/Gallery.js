import axios from 'axios';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './Gallery.css'


const Gallery = ({ data }) => {

    const [datas, setDatas] = useState([[], [], []]);
    const [pageIndex, setPageIndex] = useState(1);
    const [searchState, setSearchState] = useState('random');

    const API_PUBLIC_KEY = process.env.REACT_APP_API_KEY
    const API_SECRET_KEY = process.env.REACT_APP_SECRET_KEY

    useEffect(() => {
        const clearData = [[], [], []]
        setDatas(clearData)
        setSearchState(data)
    }, [data]);


    useEffect(() => {
        axios.get(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=${API_PUBLIC_KEY}`)
            .then(response => {

                const imgData = []

                response.data.results.forEach(element => {
                    imgData.push(element.urls.regular)
                });


                const newDatas = [
                    [...datas[0]],
                    [...datas[1]],
                    [...datas[2]],
                ]

                let index = 0
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 10; j++) {
                        newDatas[i].push(imgData[index])
                        index++
                    }
                }

                setDatas(newDatas)
            })
            .catch(error => console.log(error))
    }, [pageIndex, searchState]);



    useEffect(() => {
        document.addEventListener('scroll', infiniteScroll)
        return () => {
            document.removeEventListener('scroll', infiniteScroll)
        };
    }, []);


    const infiniteScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollHeight - scrollTop === clientHeight) {
            setPageIndex(pageIndex => pageIndex + 1)
        }
    }

    return (
        <div className='card-list'>
            <div className="col">
                {datas[0].map(data => {
                    return <img key={uuid()} src={data} alt="" />
                })}
            </div>
            <div className="col">
                {datas[1].map(data => {
                    return <img key={uuid()} src={data} alt="" />
                })}
            </div>
            <div className="col">
                {datas[2].map(data => {
                    return <img key={uuid()} src={data} alt="" />
                })}
            </div>
        </div>
    );
};

export default Gallery;