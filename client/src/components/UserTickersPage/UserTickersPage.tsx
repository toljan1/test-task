import { useAppSelector } from "../../appStore/hooks";
import { availableTickers, userTickers } from "../../appStore/selectors";
import { Ticker } from "../../types/Ticker";
import { TickerRow } from "../Ticker/Ticker";

const UserTickersPage: React.FC = () => {
  const { items: tickersList } = useAppSelector(availableTickers);
  const selectedTickers: Ticker[] = useAppSelector(userTickers).items;
  const tickersListToRender: Ticker[] = tickersList
    .filter((ticker: Ticker) => selectedTickers
    .some(tick => tick.ticker === ticker.ticker));

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
                {...ticker}
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
