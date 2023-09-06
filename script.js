const data = null;

const xhr = new XMLHttpRequest();



// Add an event listener to the Search button
document.getElementById('searchButton').addEventListener('click', function () {
    const cityName = document.getElementById('cityInput').value.trim();
    
    if (cityName) {
        // Construct the API URL with the user's input city name
    const apiUrl = `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${cityName}`;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const info = JSON.parse(this.responseText);
            console.log(info);
        
        if (info.error === "Could not find city.") {
            alert('This City is not in our Data,Please Try Another City');
        }else{
        const resultContainer = document.querySelector(".result");
         resultContainer.innerHTML = ''; // Clear previous content

        // Create containers for the parameter groups
        const parameterRow = document.createElement('div');
        parameterRow.classList.add('parameter-row');

        const parameterGroupLeft = document.createElement('div');
        parameterGroupLeft.classList.add('parameter-group', 'left');

        const parameterGroupRight = document.createElement('div');
        parameterGroupRight.classList.add('parameter-group', 'right');

        // Create a container for overall_aqi
        const overallAqiContainer = document.createElement('div');
        overallAqiContainer.classList.add('overall-aqi', 'right'); // Place overall_aqi on the right

        for (const parameter in info) {
            const data = info[parameter];
            const Concentration = data.concentration;
            const Aqi = data.aqi;

            // Check if both Concentration and Aqi are defined
            if (Concentration !== undefined && Aqi !== undefined) {
                const parameterInfo = `
                    <h2>${parameter}:</h2>
                    <p>Concentration: ${Concentration}</p>
                    <p>AQI: ${Aqi}</p>
                `;

                if (parameter === 'CO' || parameter === 'NO2' || parameter === 'O3') {
                    // Append to the left parameter group
                    parameterGroupLeft.innerHTML += parameterInfo;
                } else if (parameter === 'SO2' || parameter === 'PM2.5' || parameter === 'PM10') {
                    // Append to the right parameter group
                    parameterGroupRight.innerHTML += parameterInfo;
                }
            }
        }

        // Append the parameter groups and overall_aqi to the result container
        parameterRow.appendChild(parameterGroupLeft);
        parameterRow.appendChild(parameterGroupRight);
        resultContainer.appendChild(parameterRow);
        resultContainer.appendChild(overallAqiContainer);

        // Display overall_aqi on the right side of the second column
        const overallAqi = info.overall_aqi;
        if (overallAqi !== undefined) {
            overallAqiContainer.innerHTML = `
                <h2>OverallAQI:</h2>
                <p>${overallAqi}</p>
            `;
        }
    }
    }
});

xhr.open('GET', 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city='+cityName , true);
xhr.setRequestHeader('X-RapidAPI-Key', 'fb67aa0783msh616b0fc357774abp16af06jsn95a9fb7b01a7');
xhr.setRequestHeader('X-RapidAPI-Host', 'air-quality-by-api-ninjas.p.rapidapi.com');

xhr.send(data);

}else{
    alert('Please enter a city name.');
}
});
