import Navbar from '../../components/header';
import "../home/styles.css";
import Panel from '../../components/dashboard/panel';

export default function Home() {
    return (
        <div class="bg-color-bg bg-height bg-dashboard-mobile md:bg-dashboard" >
            <div class="">
                <Navbar />
                <Panel />
            </div>
        
        </div>
    )
}

const Welcome = () => {	
    const userName = "Barkin"
    return (
        <div className="mt-12 max-w-8xl mx-auto sm:px-6 lg:px-8">
            <h1 className="font-bold font-sans text-4xl text-white">Welcome to your Dashboard, {userName}</h1>
        </div>
    )
}