async function loadOptions() {
    try {
        const response = await fetch('https://localhost:7045/api/TransferType');
        const data = await response.json();

        const select = document.getElementById('types');
        select.innerHTML = '<option value="">Selecciona un tipo</option>'

        data.forEach(transferType => {
            const option = document.createElement('option');
            option.value = transferType.transferTypeId;
            option.textContent = transferType.name;
            select.appendChild(option);

        });
    } catch (error) {
        console.error('Error al cargar las opciones:', error);
    }
}
window.onload = loadOptions;