const showLoader = () => {
    document.getElementById('loadingScreen').classList.remove('hidden');
}

const hideLoader = () => {
    document.getElementById('loadingScreen').classList.add('hidden');
};

const Loader = {
    Show : showLoader,
    Hidden : hideLoader
}
export default Loader;