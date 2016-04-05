$(".search").on("click", function() {
	var stockCode = $("#stockCode").val();

	var data = {stockCode: stockCode};

	$.ajax({
        type : "POST",
        url : "/sentiment/query/" + stockCode,
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            updateData();
        }
    });	

	console.log(data);
});

$(".clear").on("click", function() {
	$.ajax({
        type : "POST",
        url : "/sentiment/clear",
        data: JSON.stringify(""),
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
        	updateData();
        }
    });	
});