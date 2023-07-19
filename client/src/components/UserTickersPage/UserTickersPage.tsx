import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../appStore/hooks";
import { availableTickers, userTickers } from "../../appStore/selectors";
import { Ticker } from "../../types/Ticker";
import { TickerRow } from "../Ticker/Ticker";
import { socket } from "../../socket/socket";
import { setAvailableTicker } from "../../features/TickersSlice";

const UserTickersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: tickersList } = useAppSelector(availableTickers);
  const selectedTickers: Ticker[] = useAppSelector(userTickers).items;
  const tickersListToRender: Ticker[] = tickersList
    .filter((ticker: Ticker) => selectedTickers
    .some(tick => tick.ticker === ticker.ticker));
  
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
  }, [dispatch])

  return (
    <>
      {tickersListToRender.length > 0 ? (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead className="thead">
            <tr className="tr">
              <th className="th">Symbol</th>
              <th className="th">
                Exchange
              </th>
              <th className="th">Price</th>
              <th className="th">Change</th>
              <th className="th">
                % Change
              </th>
              <th className="th">
                Dividend
              </th>
              <th className="th">
                Last trade time
              </th>
              <th className="th">
                Delete from favorites
              </th>
            </tr>
          </thead>
   
          <tbody className="tbody">
            {tickersListToRender
              .map((ticker) => (
              <TickerRow
                key={ticker.ticker}
                ticker={ticker}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          Tickers are not selected. Please select a ticker...
        </p>
      )}
    </>
  )
}

export default UserTickersPage;
