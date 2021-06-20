export default function About() {

    return (
        <div className="bg-color-bg min-h-screen flex justify-center items-start">
            <div className="pt-32 px-48 max-w-8xl">
                <h1 className="text-4xl text-gray-700 font-semibold">About</h1>
                <p className="text-xl pt-10 text-gray-600">
                    I created this app purely for educational purposes and also to 
                    showcase my skills. Since the APIs I used have limits
                    on how many calls can be made from their respective tokens, 
                    I had to devise various ways to make sure regardless of how many
                    people use this app, that limit is not breached. When user adds a stock to 
                    their portfolios, the app caches the stock's data in a database and 
                    updates in intervals (currently set to 15 minutes), instead of fetching
                    most current data from the APIs every time the user makes such request.
                    At midnight, the app deletes all stocks that are no longer in use (i.e.
                    it is not linked to any portfolio). Top stocks are fetched daily, 
                    and news are fetched every 6 hours. Users may notice that they usually
                    have to wait around 3 seconds to see stocks they have added appear in
                    their portfolios. This is due to the fact that the app utilizes several
                    APIs to fetch data, however, once the data has been cached, the data 
                    is returned instantly.

                </p>
            </div>
        </div>
    )
}