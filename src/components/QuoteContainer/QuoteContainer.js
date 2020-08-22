import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './QuoteContainer.css'
import axios from 'axios';
import Loader from '../Loader/Loader'

function QuoteContainer() {

    const [data, setData] = useState({quoteText:"", quoteAuthor: ""})
    const [isLoaderVisible, setLoaderVisibility] = useState(false);
    const getQuote = async () => {
        setLoaderVisibility(true);
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"
        const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
        try {
            const response = await axios.get(proxyUrl + apiUrl);
            setData({...data, quoteText: response.data.quoteText, quoteAuthor: response.data.quoteAuthor});
            setLoaderVisibility(false);           
        } 
        catch (err) { 
            if (err.toString().includes("Unexpected token ' in JSON at position")) {
                getQuote();
            } else {
            console.log("Unexpected token error form API");
            }   
        }            
    }
    
    useEffect(() => {               
        getQuote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const generateNewQuote = () => {
        getQuote();
    }

    const tweetQuote = () => {
        const author = data.quoteText;
        const quote = data.quoteAuthor;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, "_blank");
    }

    return (
        <div>
            {
                isLoaderVisible
                ? <Loader/>
                : <div className="quote-container">
                        {
                            data.quoteText.length > 120
                            ?
                            <div className="long-quote-text">
                                <FontAwesomeIcon icon={faQuoteLeft} />      
                                <span> {data.quoteText} </span>           
                            </div>
                            :
                            <div className="quote-text">
                                <FontAwesomeIcon icon={faQuoteLeft} />      
                                <span> {data.quoteText} </span>           
                            </div>
                        }
                        <div className="quote-author">
                            {
                                data.quoteAuthor === ""
                                ? <span>Unknown</span>
                                : <span>{data.quoteAuthor}</span>   
                            }
                            
                        </div>
                        <div className="button-container">
                            <button className="twitter-button">
                                <FontAwesomeIcon onClick={tweetQuote} icon={faTwitter} />
                            </button>
                            <button onClick = {generateNewQuote}>New Qoute</button>
                        </div>       
                    </div>    
            }                    
        </div>
    )
}

export default QuoteContainer
