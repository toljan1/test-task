import React, { useCallback, useEffect, useState } from 'react';
import { Ticker } from '../../types/Ticker';
import { availableTickers, userTickers }
  from '../../appStore/selectors';
import { setAvailableTicker } from '../../features/TickersSlice';
import { setAddTicker } from '../../features/UserTickersSlice';
import { socket } from '../../socket/socket';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../appStore/hooks';
import '../../App.scss';
import AppleIcon from '../../img/apple.png';
import AmazonIcon from '../../img/Amazon.png';
import TeslaIcon from '../../img/Tesla.png';
import GoogleIcon from '../../img/Google.png';
import MicrosoftIcon from '../../img/Microsoft.png';
import FacebookIcon from '../../img/Facebook.png';

const TickersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: tickersList } = useAppSelector(availableTickers);
  const selectedTickers: Ticker[] = useAppSelector(userTickers).items;
  const tickersListToRender: Ticker[] = tickersList
    .filter((ticker: Ticker) => selectedTickers
    .some(tick => tick.ticker === ticker.ticker));
  
  useEffect(() => {
    socket.emit('start');
    socket.on(
      'ticker',
      (response: Ticker[]) => {
        dispatch(setAvailableTicker(response));
      }
    );
    
    return () => {
      socket.close();
    }
  }, [dispatch])


  const addTicker = useCallback((ticker: Ticker) => {
    if (tickersListToRender.includes(ticker)) {
      return tickersListToRender;
    } else {
      dispatch(setAddTicker(ticker));
    }
  }, [dispatch])

  const infoForTicker = (tickerName: string) => {
    switch (tickerName) {
      case 'AAPL': 
        return {
          text: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world\'s largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the world\'s biggest company by market capitalization. As of June 2022, Apple is the fourth-largest personal computer vendor by unit sales and the second-largest mobile phone manufacturer in the world.',
          imgUrl: AppleIcon,
        };
      case 'GOOGL':
        return {
          text: 'Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries. Alphabet is the world\'s third-largest technology company by revenue and one of the world\'s most valuable companies.',
          imgUrl: GoogleIcon,
        };
      case 'MSFT':
        return {
          text: 'Microsoft Corporation is an American multinational technology corporation headquartered in Redmond, Washington. Microsoft\'s best-known software products are the Windows line of operating systems, the Microsoft 365 suite of productivity applications, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. ',
          imgUrl: MicrosoftIcon,
        };
      case 'AMZN':
        return {
          text: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It has been often referred to as "one of the most influential economic and cultural forces in the world," and is often regarded as one of the world\'s most valuable brands.',
          imgUrl: AmazonIcon,
        };
      case 'FB':
        return {
          text: 'Facebook is an online social media and social networking service owned by American technology giant Meta Platforms. Created in 2004 by Mark Zuckerberg with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes, its name derives from the face book directories often given to American university students.',
          imgUrl: FacebookIcon,
        };
      case 'TSLA':
        return {
          text: 'Tesla, Inc. is an American multinational automotive and clean energy company headquartered in Austin, Texas. Tesla designs and manufactures electric vehicles (cars and trucks), stationary battery energy storage devices from home to grid-scale, solar panels and solar roof tiles, and related products and services.',
          imgUrl: TeslaIcon,
        };
      default:
        return {
          text: 'Sorry, we doesn\'t have any information about this ticker',
          imgUrl: '#'
        };
    }
  }

  return (
    <>
      <ul>
      {tickersList.length > 0 ? (
        tickersList.map((ticker) => {
          const { imgUrl, text } = infoForTicker(ticker.ticker);
          return (
            <li
              key={ticker.ticker}
              {...ticker}
            >
              <div className="box">
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={imgUrl} alt={ticker.ticker} />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{ticker.ticker}</strong> <b className="has-text-primary">{ticker.price}$</b>
                        <button
                          onClick={() => addTicker(ticker)}
                          className='myButton button is-info is-rounded is-small'
                          disabled={selectedTickers.map(tick => tick.ticker).includes(ticker.ticker)}
                        >
                          +
                        </button>
                        <br />
                        {text}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </li>
          )
        })
      ) : (
        <span>Loading...</span>
      )}
      </ul>
    </>
  );
};

export default TickersPage;
