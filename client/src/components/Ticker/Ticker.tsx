import React, { useCallback } from 'react';
import { setDeleteTicker } from '../../features/UserTickersSlice';
import { Ticker } from '../../types/Ticker';
import classNames from 'classnames';
import { useAppDispatch } from '../../appStore/hooks';
import { usePreviousPrice } from '../../features/usePreviousPrice';

type Props = {
  ticker: Ticker,
};

export const TickerRow: React.FC<Props> = ({
  ticker
}) => {
  const dispatch = useAppDispatch();
  const deleteTicker = useCallback((ticker: string) => {
    dispatch(setDeleteTicker(ticker))
  }, [dispatch]);
  const {
    ticker: tickerName, 
    exchange,
    price, 
    change, 
    change_percent,
    dividend,
    last_trade_time
  } = ticker;

  const prevPrice =  usePreviousPrice(price);

  return (
   <>
    <tr className="tr">
      <td className="td">{tickerName}</td>
      <td className="td">{exchange}</td>
      <td className={classNames(
        "td", "has-text-success",
        {
          "has-text-danger": !prevPrice,
        }
      )}
      >
        {price}
      </td>
      <td className="td">{change}</td>
      <td className="td">
        {change_percent}
      </td>
      <td className="td">{dividend}</td>
      <td className="td">
        {last_trade_time}
      </td>
      <td className="td">
        <button 
          type="button"
          onClick={() => deleteTicker(tickerName)}
          className="myButton button is-danger is-rounded is-small"
        >
          X
        </button>
      </td>
    </tr>
   </>
  )
}