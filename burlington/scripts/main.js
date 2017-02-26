var Burlington = function() {
    this.CustomersList;
    this.Filtered;

    var that = this;

    this.Init = function() {

        that.GetCustomers();

    }

    that.Filter = function() {
        that.CountriesFilter = $('#Countries').val();
        that.CitiesFilter = $('#Cities').val();
        that.Query = $('#search').val();

        that.Filtered = [];

        for(I in that.CustomersList) {

            // Filter by Country
            for (C in that.CountriesFilter) {

                if(!(that.Filtered.indexOf(that.CustomersList[I]) > -1) && 
                    that.CountriesFilter[C] == that.CustomersList[I]['country']) {

                    that.Filtered.push(that.CustomersList[I]);

                }
            };

            

        };

        FilteredListHTML    = '<tr>'
                                + '<th>Customer ID</th>'
                                + '<th>Name</th>'
                                + '<th>Email</th>'
                                + '<th>City</th>'
                                + '<th>Country<th>'
                                + '<th>Phone<th>'
                                + '</tr>';

        // Filter by name / email
        for (F in that.Filtered) {

            if (!that.Filtered[F]['full_name'].toLowerCase().includes(that.Query.toLowerCase()) &&
                !that.Filtered[F]['email'].toLowerCase().includes(that.Query.toLowerCase()) ) {

                var index = that.Filtered.indexOf(that.Filtered[F]);

                if (index > -1) {
                    that.Filtered.splice(index, 1);
                }
            }
        }

        for (F in that.Filtered) {
            // Filter by City
            for (K in that.CitiesFilter) {

                if(that.CitiesFilter[K] != that.Filtered[F]['city']) {

                    var index = that.Filtered.indexOf(that.Filtered[F]);

                    if (index > -1) {
                        that.Filtered.splice(index, 1);
                    }

                }
            };
        }

        for (F in that.Filtered) {
            FilteredListHTML    += '<tr>'
                                + '<td>' + that.Filtered[F]['customer_id'] + '</td>'
                                + '<td>' + that.Filtered[F]['first_name'] + ' ' + that.Filtered[F]['last_name'] + '</td>'
                                + '<td>' + that.Filtered[F]['email'] + '</td>'
                                + '<td>' + that.Filtered[F]['city'] + '</td>'
                                + '<td>' + that.Filtered[F]['country'] + '<td>'
                                + '<td>' + that.Filtered[F]['phone'] + '<td>'
                                + '</tr>'
        }


        console.log(that.Filtered);

        $('.TableWrapper table').html(FilteredListHTML);

    };

    that.GetCustomers = function() {

        $.getJSON('scripts/customers.json', function(Data) {
            that.CustomersList = Data;

            CustomersListHTML = '<tr>'
                                + '<th>Customer ID</th>'
                                + '<th>Name</th>'
                                + '<th>Email</th>'
                                + '<th>City</th>'
                                + '<th>Country<th>'
                                + '<th>Phone<th>'
                                + '</tr>';

            that.LookupCountries = {};
            that.LookupCities = {};
            that.Countries = [];
            that.Cities = [];

            for(I in that.CustomersList) {

                that.CustomersList[I]['full_name'] = that.CustomersList[I]['first_name'] + ' ' + that.CustomersList[I]['last_name'];
                
                that.country = that.CustomersList[I]['country'];
                that.city = that.CustomersList[I]['city'];

                if (!(that.country in that.LookupCountries)) {
                    that.LookupCountries[that.country] = 1;
                    that.Countries.push(that.country);
                }

                if (!(that.city in that.LookupCities)) {
                    that.LookupCountries[that.city] = 1;
                    that.Cities.push(that.city);
                }

                CustomersListHTML += '<tr>'
                                + '<td>' + that.CustomersList[I]['customer_id'] + '</td>'
                                + '<td>' + that.CustomersList[I]['first_name'] + ' ' + that.CustomersList[I]['last_name'] + '</td>'
                                + '<td>' + that.CustomersList[I]['email'] + '</td>'
                                + '<td>' + that.CustomersList[I]['city'] + '</td>'
                                + '<td>' + that.CustomersList[I]['country'] + '<td>'
                                + '<td>' + that.CustomersList[I]['phone'] + '<td>'
                                + '</tr>'
            }

            CountriesHTML = '';

            for (C in that.Countries) {
                CountriesHTML += '<option value="' + that.Countries[C] + '">' + that.Countries[C] + '</option>'
            }

            CitiesHTML = '';

            for (S in that.Cities) {
                CitiesHTML += '<option value="' + that.Cities[S] + '">' + that.Cities[S] + '</option>'
            }

            $('#SelectCountry').after(CountriesHTML);

            $('#SelectCity').after(CitiesHTML);

            // Initialize Material Select
            $('select').material_select();

            $('.TableWrapper table').html(CustomersListHTML);

        });
    }
}

// Initialize
var BurlingtonTable;
$(window).on('load', function() {
    BurlingtonTable = new Burlington(window);

    BurlingtonTable.Init();
});