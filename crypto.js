async function fetchPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,dogecoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        displayPrices(data);
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

function displayPrices(data) {
    const container = document.getElementById('crypto');
    
    const cryptos = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' }
    ];
    
    container.innerHTML = cryptos.map(crypto => {
        const price = data[crypto.id].usd;
        const change = data[crypto.id].usd_24h_change;
        const changeClass = change >= 0 ? 'positive' : 'negative';
        const arrow = change >= 0 ? '▲' : '▼';
        
        return `
            <div class="crypto-card">
                <h3>${crypto.name} (${crypto.symbol})</h3>
                <div class="price">$${price.toLocaleString()}</div>
                <div class="change ${changeClass}">
                    ${arrow} ${Math.abs(change).toFixed(2)}%
                </div>
            </div>
        `;
    }).join('');
}

fetchPrices();
setInterval(fetchPrices, 30000);
