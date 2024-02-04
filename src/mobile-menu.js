function openModal() {
	document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
	document.getElementById('myModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('mobile-menu').addEventListener('click', function () {
		openModal();
	});
	document.getElementById('closeModal').addEventListener('click', function () {
		closeModal();
	});
});
