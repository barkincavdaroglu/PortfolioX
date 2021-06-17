import Navbar from '../../components/header';
import "../home/styles.css";
import Panel from '../../components/dashboard/panel';

export default function Home() {
    return (
        <div className="bg-color-bg bg-height bg-dashboard-mobile md:bg-dashboard" >
            <div className="pb-20">
                <Navbar />
                <Panel />
            </div>
        
        </div>
    )
}