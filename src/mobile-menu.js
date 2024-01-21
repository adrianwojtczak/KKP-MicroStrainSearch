function openModal() {
	document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
	document.getElementById('myModal').style.display = 'none';
}

document.getElementById('mobile-menu').addEventListener('click', function () {
	openModal();
});
