import PanelTop from './panel-top';
import '../../components/styles.css';
import PanelPortfolios from './panel-portfolios';
import NewsPanel from './news';
import WatchList from './watchlist';

export default function Panel() {
    return (
        <div className="dashboard-bg mt-12 max-w-8xl mx-auto sm:px-6 lg:px-8">
            <PanelTop />
            <div class="grid md:grid-cols-dashboard">
                <PanelPortfolios />
                <WatchList />
                <NewsPanel />
            </div>
            
        </div>
    )
}