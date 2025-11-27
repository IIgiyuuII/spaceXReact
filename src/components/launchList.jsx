function LaunchList({ launches, launchpads, setHoveredPadId, onSelectLaunch }) {

    function getLaunchpadStatus(id) {
        const pad = launchpads.find(lp => lp.id === id);
        if (!pad) return "Unknown";
        return pad.status === "active" ? "Active" : "Inactive";
    }

    function formatDate(dateString) {
        if (!dateString) return "No date";
        const d = new Date(dateString);
        return d.toISOString().split("T")[0]; // YYYY-MM-DD
    }

    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer">
                <ul>
                    {launches.map(launch => {
                        const status = getLaunchpadStatus(launch.launchpad);
                        const date = formatDate(launch.date_utc);

                        return (
                            <li
                                key={launch.id}
                                
                                onMouseEnter={() => setHoveredPadId && setHoveredPadId(launch.launchpad)}
                                onMouseLeave={() => setHoveredPadId && setHoveredPadId(null)}
                                
                                onClick={() => onSelectLaunch && onSelectLaunch(launch.id)}
                                className="launch-item"
                                data-launchpad-id={launch.launchpad}
                            >
                                <strong>{launch.name}</strong><br/>
                                <span className="launch-info">
                                    {date} • {status}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    )
}

export {LaunchList}
