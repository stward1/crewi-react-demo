import React, { useEffect, useState } from 'react'

const Widget = (props) => {
    //these happen once no matter what; they will not run again
    const [username, setUsername] = useState("");
    const [token, setToken] = useState(props.token);
    const [status, setStatus] = useState("loading");

    //this runs the first time, and then again whenever token is changed 
    useEffect(async () => {

        // function success(position) {
        //     const latitude  = position.coords.latitude;
        //     const longitude = position.coords.longitude;
        //     console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
        // }
        
        // function error() {
        //     console.log('Unable to retrieve your location');
        // }
    
        // if(!navigator.geolocation) {
        //     console.log('Geolocation is not supported by your browser');
        // }
        // else {
        //     console.log('Locating…');
        //     navigator.geolocation.getCurrentPosition(success, error);
        // }

        //about 90% sure this will force location to happen before the fetch request
        const promise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        
        let result = await promise;
        
        var requestOptions = {
            method: 'GET',
          };
         
          
        //this should wait on the resolution of the geolocation
        //then it'll get the address
        //then it'll call the other API (not related, just for testing purposes)
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${result.coords.latitude}&lon=${result.coords.longitude}&apiKey=a9868a78354f43f0a3574acd600e2ceb`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result.features[0].properties))
          .then(() => {
            fetch('https://randomuser.me/api')
            .then(response => {/*console.log(result);*/ return response.json();})
            .then(data => {
                setUsername(data.results[0].name.first);
                // setStatus("done");
                testFunction();
            }).catch(error => {
                console.log(error);
                setStatus("failed");
            })
          })
        .catch(error => console.log('error', error));

        console.log(result);

    }, [token])

    const testAsync = async function() {
        await setTimeout(() => {console.log('done'); return "done";}, 5000);
    }

    const testFunction = () => {
        setStatus("done");
    }

    //this runs whenever state or props are updated; it updates token so that the useEffect above will run
    //props are updated when the button is clicked bc it will update the main state, etc.
    useEffect(() => {
        setToken(props.token);
    })

    if (status == "loading"){
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    else if (status == "no-time")
    {
        return(
            <div>
                
            </div>
        )
    }

    else if (status == "done")
    {
        return(
            <div>
                <span>{token}, {status}</span>
                <h1>{username}</h1>
            </div>
        )
    }
    else if (status == "failed")
    {
        return(
            <div>
                <span>{token}, {status}</span>
                <h1>FAILED</h1>
            </div>
        )
    }
}

export default Widget;