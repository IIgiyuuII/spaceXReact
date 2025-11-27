import {LaunchList} from "./launchList";
import {Map} from "./map";
import {useEffect, useState} from "react";
import {SpaceX} from "../api/spacex";

function App(){

    const [launches, setLaunches] = useState([]);
    const [launchpads, setLaunchpads] = useState([]);

    const [hoveredPadId, setHoveredPadId] = useState(null);

    const spacex = new SpaceX();

    useEffect(() => {
        spacex.launches().then(setLaunches);
        spacex.launchpads().then(setLaunchpads);
    }, []);

    return(
        <main className='main'>
            <LaunchList
                launches={launches}
                launchpads={launchpads}
                setHoveredPadId={setHoveredPadId}
            />

            <Map
                launches={launches}
                launchpads={launchpads}
                hoveredPadId={hoveredPadId}
                setHoveredPadId={setHoveredPadId}
            />
        </main>
    )
}

export {App};
