const home = { template: '<div>home</div>' }
const saved = { template: '<div>saved</div>' }

const routes = [
    { path: '/home', component: home },
    { path: '/saved', component: saved }
]

const router = new VueRouter({
    routes: routes
})

const App = new Vue({
    el: '#app',
    router
    //data: {}
}).$mount('#app')

App.AvStackAccessKey = '';
App.AvStackUrl = 'https//api.aviationstack.com/v1/';

App.fetchFlights = function (parameters) {
    $.ajax({
        url: App.AvStackUrl + 'flights',
        data: {
            access_key: App.AvStackAccessKey,
            flight_number: parameters.flightNumber
        },
        dataType: 'json',
        success: function (apiResponse) {
            if (Array.isArray(apiResponse['results'])) {
                apiResponse['results'].forEach(flight => {
                    if (!flight['live']['is_ground']) {
                        console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                            `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                            `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
                    }
                });
            }
        }
    });
};

App.init = () => {

};

$(document).ready(() => {
    App.init();
});