import React, { useCallback } from 'react';
import { setDeleteTicker } from '../../features/UserTickersSlice';
import { Ticker } from '../../types/Ticker';
import classNames from 'classnames';
import { useAppDispatch } from '../../appStore/hooks';

type Props = Ticker;

export const TickerRow: React.FC<Props> = ({
    ticker, 
    exchange,
    price, 
    change, 
    change_percent,
    dividend,
    last_trade_time
}) => {
  const dispatch = useAppDispatch();
  const deleteTicker = useCallback((ticker: string) => {
    dispatch(setDeleteTicker(ticker))
  }, [])

  return (
   <>
    <tr className="tr">
      <td className="td">{ticker}</td>
      <td className="td">{exchange}</td>
      <td className={classNames(
        "td",
        "TickerRow__data--priceDown", 
        "TickerRow__data--currency",
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
          onClick={() => deleteTicker(ticker)}
          className="myButton button is-danger is-rounded is-small"
        >
          X
        </button>
      </td>
    </tr>
   </>
  )
}