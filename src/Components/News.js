import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const News=(props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    const updateNews= async()=>{
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true);
        let data= await fetch(url)
        let parsedData=await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
      document.title=`${capitalizeFirstLetter(props.category)}- News Monkey`
      updateNews();
    }, [])
    const handlePrevClick=async ()=>{
        setPage(page-1)
        updateNews();
        
    }
    const handleNextClick=async ()=>{
        setPage(page+1)
        updateNews();
    }
    const fetchMoreData = async() => {
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data= await fetch(url)
        let parsedData=await data.json()
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
      }
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px',marginTop:'60px'}}>NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading===true && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
        return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title?element.title:"news"} description={element.description?element.description:"description"} imageUrl={element.urlToImage?element.urlToImage:"https://static.tnn.in/thumb/msid-111494105,thumbsize-106690,width-1280,height-720,resizemode-75/111494105.jpg?quality=100"} newsUrl={element.url} author={element.author?element.author:"Anonymous"} date={element.publishedAt} source={element.source.name}/>
                    </div>
        })}   
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    )
}
News.defaultProps={
    country:'in',
    pageSize:8,
    category:'science'
}
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
}

export default News