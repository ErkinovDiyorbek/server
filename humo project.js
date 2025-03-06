document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.nav-menu .nav-link')
	const menuOpenButton = document.querySelector('#menu-open-button')
	const menuCloseButton = document.querySelector('#menu-close-button')
	const mobileMenu = document.body // 'show-mobile-menu' klassi bodyga qo'shiladi

	// Menyu ochish
	menuOpenButton.addEventListener('click', () => {
		mobileMenu.classList.toggle('show-mobile-menu') // Menyu ko'rsatiladi yoki yashiriladi
	})

	// Menyu yopish (close button bosilganda)
	menuCloseButton.addEventListener('click', () => {
		mobileMenu.classList.remove('show-mobile-menu') // Menyu yopiladi
	})

	// Menyu tashqarisiga bosganda ham menyu yopilishi kerak
	document.addEventListener('click', event => {
		if (
			!event.target.closest('.nav-menu') &&
			!event.target.closest('#menu-open-button') &&
			mobileMenu.classList.contains('show-mobile-menu')
		) {
			mobileMenu.classList.remove('show-mobile-menu') // Menyu yopiladi
		}
	})

	// Menyu havolalarini bosganda ham menyu yopilsin
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenu.classList.remove('show-mobile-menu') // Menyu yopiladi
		})
	})
})

const swiper = new Swiper('.swiper', {
	slidesPerView: 1,
	spaceBetween: 10,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		640: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
	},
})
