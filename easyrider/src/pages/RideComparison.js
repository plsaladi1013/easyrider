import React from "react";
import weather from 'openweather-apis';
import axios from 'axios';

class GeoLocation extends React.Component {
    state = {
        userWeather: "",
        formattedAddress: "",
        customerDestination: "",
        customerCurrentLocation: "",
        address: "",
        estimatedLyftCosts: "",
        uberData: [],
        searching: false,
        renderLyft: false,
        renderUber: false
    }
    componentDidMount() {
        let currentTemp = localStorage.getItem("currentTemp");
        this.setState({ userWeather: currentTemp })
        
        let head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');        
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';
        //link.media = 'all';
        head.appendChild(link);
        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        
    };


    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let Latitude = position.coords.latitude;
                let Longitude = position.coords.longitude;
                var APIKey = "166a433c57516f51dfab1f7edaed8413";
                let customerCurrentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                // LocalStorage: currentLocation
                localStorage.setItem('customerCurrentLocation', JSON.stringify(customerCurrentLocation));
                weather.setAPPID(APIKey);
                weather.setUnits('imperial');
                weather.setCoordinate(Latitude, Longitude);
                weather.getTemperature(function (err, temp) {
                    localStorage.setItem('currentTemp', temp);
                })
            });
        } else {
            let incompatiable = "Geolocation is not supported by this browser.";
            console.log("incompatible" + incompatiable);
        }
    };
    comparePrices = (e) => {
        e.preventDefault();
        if (!this.state.address == "") {
            const destinationUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.address + "&key=AIzaSyCA7fHKImyZG52ysE_z6vx0IAoNnBc7PqM";
            //Get lat and long from address
            // get address        
            this.setState({
                searching: true
            })
            axios(destinationUrl).then(response => {
                var formattedAddress = response.data.results[0].formatted_address;
                //console.log(response.data.results[0]);
                let customerDestination = {
                    latitude: response.data.results[0].geometry.location.lat,
                    longitude: response.data.results[0].geometry.location.lng
                }
                this.setState({
                    customerDestination: customerDestination
                }, () => {
                    //2. Get customer current lat and lng  
                    let currentTemp = localStorage.getItem("currentTemp");
                    let customerCurrentLocation = localStorage.getItem("customerCurrentLocation");
                    customerCurrentLocation = JSON.parse(customerCurrentLocation);

                    this.setState({
                        customerCurrentLocation: customerCurrentLocation,
                        userWeather: currentTemp
                    }, () => {
                        console.log(this.state)
                        //3. Get customer estimate for the ride
                        let startLat = this.state.customerCurrentLocation.latitude;
                        let startLng = this.state.customerCurrentLocation.longitude;
                        let endLat = this.state.customerDestination.latitude;
                        let endLng = this.state.customerDestination.longitude;

                        let lyfturl = "https://api.lyft.com/v1/cost?ride_type=lyft&start_lat=" + startLat + "&start_lng=" + startLng + "&end_lat=" + endLat + "&end_lng=" + endLng;

                        axios(lyfturl, {
                            method: 'GET',
                            contentType: 'application/json',
                            dataType: 'jsonp',
                            responseType: 'application/json',
                        }).then(data => {
                            console.log(data);
                            var estimatedCostMax = data.data.cost_estimates[0].estimated_cost_cents_max / 100;
                            var estimatedCostMin = data.data.cost_estimates[0].estimated_cost_cents_min / 100;
                            var estimatedDurationSeconds = data.data.cost_estimates[0].estimated_duration_seconds / 60;
                            var estimatedLyftCosts = {
                                min: estimatedCostMin,
                                max: estimatedCostMax,
                                duration: estimatedDurationSeconds
                            }
                            this.setState({
                                estimatedLyftCosts,
                                renderLyft: true
                            })
                            console.log(estimatedCostMax);
                            console.log(estimatedCostMin);
                        });


                        let uberUrl = "https://api.uber.com/v1.2/estimates/price?start_latitude=" + startLat + "&start_longitude=" + startLng + "&end_latitude=" + endLat + "&end_longitude=" + endLng;

                        axios(uberUrl, {
                            method: 'GET',
                            "Access-Control-Allow-Origin": "*",
                            headers: {
                                'Authorization': 'Token tXoIQP8qEyk8X79mxvMOp3zJ1vfeae-YV2r4Znxt',
                                'Accept-Language': 'en_US',
                                'Content-Type': 'application/json'
                            }
                        }).then(data => {
                            console.log(data);
                            console.log(data.data.prices);
                            this.setState({
                                uberData: data.data.prices,
                                searching: false,
                                renderUber: true
                            });
                            // let uberRide = "https://login.uber.com/oauth/v2/authorize?client_id=jXjS0Z2p5GQyxIeJlr99Z13NUu8ZK14E&response_type=code&scope=profile";
                            // axios(uberRide, {
                            //     method: 'GET',
                            //     "Access-Control-Allow-Origin": "*",
                            //     headers: {
                            //         'Authorization': 'Token tXoIQP8qEyk8X79mxvMOp3zJ1vfeae-YV2r4Znxt',
                            //         'Accept-Language': 'en_US',
                            //         'Content-Type': 'application/json',

                            //     }
                            // }).then(data => {
                            //     console.log("Uber Ride Data" + data);
                            // })
                        });
                    })
                })
            })

        }
        else {
            alert("Please enter the destination address");
        }

    }


    renderLyftComparison = () => {
        console.log("Calling Render Lyft")

        return (


            <div className="col s12 m6">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="assets/images/lyft_im.jpg" />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Lyft<i className="material-icons right">more_vert</i></span>
                        <p style={{
                            fontSize: "2em",
                            color: "#D20085",

                        }}>USD ${this.state.estimatedLyftCosts.min}-{this.state.estimatedLyftCosts.max}<a href="https://account.lyft.com/auth?next=https%3A%2F%2Fwww.lyft.com%2Flogin%2Fjump" style={{ color: "#D20085" }}><i className="material-icons right">thumb_up</i></a></p>
                        <p>Click on ... to see more ride types information</p>
                        <p>Estimated Duration: <b>{Math.floor(this.state.estimatedLyftCosts.duration)}</b> minutes</p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Additional information<i className="material-icons right">close</i></span>
                        <p>There is no additional information</p>
                    </div>
                </div>
            </div>
        )

    }
    renderUberComparison = () => {
        console.log("Calling Render Lyft")

        return (


            <div className="col s12 m6">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="assets/images/uber_im.jpg" />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Uber<i className="material-icons right">more_vert</i></span>
                        <p style={{
                            fontSize: "2em",
                            color: "#0B0A1C"
                        }}>USD {this.state.uberData[this.state.uberData.length - 1].estimate}<a href="https://m.uber.com/ul/?client_id=jXjS0Z2p5GQyxIeJlr99Z13NUu8ZK14E" style={{ color: "#0B0A1C" }}><i className="material-icons right">thumb_up</i></a></p>
                        <p>Click on ... to see more ride types information</p>
                        <p>Estimated duration: <b>{Math.floor(this.state.uberData[this.state.uberData.length - 1].duration) / 60} minutes</b></p>
                    </div>
                    <div className="card-reveal">

                        <span className="card-title grey-text text-darken-4">Additional Information<i className="material-icons right">close</i></span>
                        {this.state.uberData.map(e => (
                            <div>
                                <p key={e.product_id}> {e.localized_display_name}: USD {e.estimate} <a href="https://m.uber.com/ul/?client_id=jXjS0Z2p5GQyxIeJlr99Z13NUu8ZK14E" style={{ color: "#0B0A1C" }}><i className="material-icons right">thumb_up</i></a></p>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        )

    }
    onChange = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    render() {
        return (
            <div className="container" style={{ backgroundColor: 'white' }}>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <h3 className="center-align">Compare Prices</h3>
                        {
                            this.state.userWeather && <p className="center-align">It is currently <b>{this.state.userWeather}</b> F</p>
                        }
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">place</i>
                                    <input type="text" name="destinationAddress" required value={this.state.address} onChange={this.onChange} />
                                    <label>Enter your destination </label>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

                <div className="row center-align">
                    <div className="col s12">
                        {
                            this.state.searching &&
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                        }
                        {
                            this.state.searching ||
                            <a href="#!" className="btn waves-effect waves-light compare" value="Compare Prices" onClick={this.comparePrices} ><i className="material-icons right">attach_money</i>Compare</a>
                        }
                    </div>
                </div>
                <div className="row">
                    {/* Render Lyft */}
                    {this.state.renderLyft && this.renderLyftComparison()}
                    {/* Render Uber */}
                    {this.state.renderUber && this.renderUberComparison()}
                </div>

            </div>
        )
    }
}

export default GeoLocation;