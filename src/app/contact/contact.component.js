import ContactModel from "./contact.model";
import {contactTemplate} from "./contact.template";


const ContactComponent = {
    init() {
        this.element = document.querySelector('.page');
        this.render();
        window.initMap = function () {
            // Styles a map in night mode.
            let mapOptions = {
                center: new google.maps.LatLng(-8.063088,-34.871278),
                zoom: 3.5,
                disableDefaultUI: true
            };
            let map = new google.maps.Map(document.getElementById('map'),mapOptions);
            let styles = [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#26220b"
                }, {
                    "weight": 0.8
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "labels",
                "stylers": [{
                    "color": "#26220b"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#0c0000"
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#26220b"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#26220b"
                }]
            }, {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#26220b"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#F9C22E"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "color": "#F9C22E"
                }, {
                    "lightness": -7
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [{
                    "color": "#F9C22E"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "weight": 0.3
                }, {
                    "lightness": 10
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#8a7505"
                }, {
                    "lightness": "-7"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#F9C22E"
                }, {
                    "visibility": "on"
                }, {
                    "lightness": -15
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#F9C22E"
                }, {
                    "lightness": "7"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#F9C22E"
                }, {
                    "lightness": -34
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#242331"
                }]
            }];
            map.setOptions({
                styles: styles
            });

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(-8.063088,-34.871278),
                animation: google.maps.Animation.DROP,
            });
            marker.setMap(map);
        };
    },



    render() {
        this.element.innerHTML = contactTemplate(ContactModel);
        this.afterRender();
    },

    afterRender() {
        // const twitterScript = document.createElement('script');
        // twitterScript.src = "https://platform.twitter.com/widgets.js";
        // twitterScript.type = 'text/javascript';

        const mapsScript = document.createElement('script');
        mapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCP1p--Jnx4nVaNkfpnOkrQb3it9GOCUNE&callback=initMap";
        mapsScript.type = 'text/javascript';




        document.body.appendChild(mapsScript);
        // document.body.appendChild(twitterScript);
    }
};

export default ContactComponent;