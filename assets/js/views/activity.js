import activity from "../components/transfers.js";
import sidebar from "../components/sidebar.js";
import TransferApi from "../services/transferApi.js";

async function fetchTransfers(offset) {
    const pageSize = 6;
    let card = document.getElementById("transferences-list");
    card.innerHTML = '';
    let paginationParamas = new URLSearchParams();
    paginationParamas.append('offset',offset);
    paginationParamas.append('size',pageSize);

    const response = await TransferApi.GetTransfersByAccountId(localStorage.getItem('accountId'),paginationParamas
    );

    card.innerHTML = await activity(response);

    const hasNextPage = response.length === pageSize;
    renderPaginationButtons(offset, hasNextPage);
}

function renderPaginationButtons(offset, hasNextPage) {
    const paginationContainer = document.getElementById('paginator');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = offset === 1;
    prevButton.onclick = () => fetchTransfers(offset - 1);
    paginationContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = !hasNextPage;
    nextButton.onclick = () => fetchTransfers(offset + 1);
    paginationContainer.appendChild(nextButton);
}

const render = async () => {
    let navbar = document.getElementById("sidebar");
    navbar.innerHTML = sidebar();
    await fetchTransfers(1);
};

window.onload = render;


