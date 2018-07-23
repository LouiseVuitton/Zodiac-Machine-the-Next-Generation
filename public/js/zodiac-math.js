//function triggered by button
function signs() {
	
	var day = document.getElementById("birthday").value;
	var month = document.getElementById("birthmonth").value;
	var symbol = day + month;
	var zodiac = symbol;

	let h3 = document.querySelector('#userBirthday');
	let h4 = document.querySelector('#userSign');

	h3.innerHTML = "Your Birthday: " + month + "/" + day;

		if (month == 1 && day >=20 || month == 2 && day <=18) {
			symbol = "Aquarius";
			document.getElementById("symbol").src = "img/Aquarius2.png";

		} else if (month == 2 && day >=19 || month == 3 && day <=20) {
			symbol = "Pisces";
			document.getElementById("symbol").src = "img/Pisces2.png";
		
		} else if (month == 3 && day >=21 || month == 4 && day <=19) {
			symbol = "Aries";
			document.getElementById("symbol").src = "img/Aries2.png";
			
		} else if (month == 4 && day >=20 || month == 5 && day <=20) {
			symbol = "Taurus";
			document.getElementById("symbol").src = "img/Taurus2.png";
			
		} else if (month == 5 && day >=21 || month == 6 && day <=21) {
			symbol = "Gemini";
			document.getElementById("symbol").src = "img/Gemini2.png";
		
		} else if (month == 6 && day >=22 || month == 7 && day <=22) {
			symbol = "Cancer";
			document.getElementById("symbol").src = "img/Cancer2.png";
			
		} else if (month == 7 && day >=23 || month == 8 && day <=22) {
			symbol = "Leo";
			document.getElementById("symbol").src = "img/Leo2.png";
			
		} else if (month == 8 && day >=23 || month == 9 && day <=22) {
			symbol = "Virgo";
			document.getElementById("symbol").src = "img/Virgo2.png";
			
		} else if (month == 9 && day >=23 || month == 10 && day <=22) {
			symbol = "Libra";
			document.getElementById("symbol").src = "img/Libra2.png";
			
		} else if (month == 10 && day >=23 || month == 11 && day <=21) {
			symbol = "Scorpio";
			document.getElementById("symbol").src = "img/Scorpio2.png";
			
		} else if (month == 11 && day >=22 || month == 12 && day <=21) {
			symbol = "Sagittarius";
			document.getElementById("symbol").src = "img/Sagittarius2.png";
			
		} else if (month == 12 && day >=22 || month == 1 && day <=19) {
			symbol = "Capricorn";
			document.getElementById("symbol").src = "img/Capricorn2.png";

		}

		zodiac = symbol;
		console.log(zodiac);
		h4.innerHTML = "Your sign is " + zodiac;

}