$( document ).ready(function() {
    var rating = parseInt($("#stampRating").attr('data-selected'));
    $("#stampRating").val(rating);
});

function remove_from_itinerary(stamp_id) {
    $.ajax({
        url: '/remove_stamp_itinerary/' + stamp_id,
        type: 'PUT',
        data: {id : stamp_id},
        success: function(result){
            window.location.replace("/stamp_itinerary");
        }
    })
}

function add_to_itinerary(stamp_id) {
    $.ajax({
        url: '/add_stamp_itinerary/' + stamp_id,
        type: 'PUT',
        data: {id : stamp_id},
        success: function(result){
            window.location.replace("/stamp_locations");
        }
    })
}

$("#stampUpdateForm").on("submit", function(event) {
    event.preventDefault();
    var form_data = $(this).serializeArray();
    console.log(form_data);
    var data = {};
    if (form_data[0].value === "0") {
        data.visited = 0;
    } else {
        data.visited = 1;
    }
    data.rating = parseInt(form_data[1].value);
    data.duration = parseFloat(form_data[2].value);
    data.user_comments = form_data[3].value;
    data.id = parseInt($("#stampUpdateForm").attr('data-id'));
    console.log(data);
    $.ajax({
        url: '/edit_stamp/',
        type: 'PUT',
        data: data,
        success: function(result){
            window.location.replace("/home");
        }
    })
});


