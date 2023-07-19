import React, { useCallback, useEffect } from 'react';
import { Ticker } from '../../types/Ticker';
import { availableTickers, userTickers }
  from '../../appStore/selectors';
import { setAvailableTicker } from '../../features/TickersSlice';
import { setAddTicker } from '../../features/UserTickersSlice';
import { socket } from '../../socket/socket';
import { useAppDispatch, useAppSelector } from '../../appStore/hooks';
import '../../App.scss';
import { infoForTicker } from '../../data/tickersInfo';

const TickersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: tickersList } = useAppSelector(availableTickers);
  const selectedTickers: Ticker[] = useAppSelector(userTickers).items;

  useEffect(() => {
    socket.connect();
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
  }, [dispatch]);

  const addTicker = useCallback((ticker: Ticker) => {
    dispatch(setAddTicker(ticker));
  }, [dispatch]);

  return (
    <>
      <div className='title is-1'>Our Tickers: </div>
      <ul>
      {tickersList.length > 0 ? (
        tickersList.map((ticker) => {
          const { imgUrl, text } = infoForTicker(ticker.ticker);
          const isDisabled = selectedTickers.map(tick => tick.ticker).includes(ticker.ticker);
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
                          disabled={isDisabled}
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
