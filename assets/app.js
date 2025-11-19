// WebMaps Info-Mémos - Script principal

// Charger et afficher les données
fetch('data/leads.json')
    .then(response => response.json())
    .then(data => {
        displayLeads(data.leads);
        updateStats(data.stats);
    })
    .catch(error => {
        console.log('Aucune donnée disponible (normal au premier lancement)');
    });

function displayLeads(leads) {
    const container = document.getElementById('leads-container');
    
    if (!leads || leads.length === 0) {
        return; // Garder l'empty state
    }
    
    container.innerHTML = '';
    
    leads.forEach(lead => {
        const card = document.createElement('div');
        card.className = 'lead-card';
        
        card.innerHTML = `
            <div class="lead-header">
                <h3>${lead.uuid}</h3>
                <span class="versions-badge">${lead.versions_count} version${lead.versions_count > 1 ? 's' : ''}</span>
            </div>
            <div class="lead-body">
                <p class="lead-location">📍 ${lead.city}</p>
                <p class="lead-area">📏 ${lead.area_ha.toFixed(1)} ha</p>
                <p class="lead-layers">🗂️ ${lead.layers_count} couches</p>
                <p class="lead-updated">🕐 Mis à jour le ${formatDate(lead.last_update)}</p>
            </div>
            <div class="lead-footer">
                <a href="leads/${lead.uuid}/index.html" class="btn btn-secondary">
                    📋 Voir les versions
                </a>
                <a href="leads/${lead.uuid}/${lead.latest_version}/map.html" class="btn btn-primary" target="_blank">
                    🗺️ Dernière version
                </a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function updateStats(stats) {
    if (stats) {
        document.getElementById('total-leads').textContent = stats.total_leads || 0;
        document.getElementById('total-webmaps').textContent = stats.total_webmaps || 0;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

