const burgerOpen = document.querySelector('.header_navbar__burger')
const burgerClose = document.querySelector('.header_navbar__burger-close')
const menu = document.querySelector('.header_navbar__menu')

const mediaQuery = window.matchMedia('(max-width: 480px)')
if (mediaQuery.matches){
       burgerOpen.addEventListener('click', function (){
           menu.classList.add('header_navbar__menu-active')
            this.style.display = 'none'
            burgerClose.style.display = 'block'
           // console.log(document.documentElement.clientWidth)
           // if(!mediaQuery.matches){
           //     burgerClose.style.display = 'none'
           // }
            })

    burgerClose.addEventListener('click', function () {
        this.style.display = 'none'
        burgerOpen.style.display = 'flex'
        menu.classList.remove('header_navbar__menu-active')

    })
}
// const mediaQueryMiddle = window.matchMedia('(min-width:481px)')
// if (mediaQueryMiddle.matches){
//  burgerClose.style.display = 'none'
//  burgerClose.style.display = 'none'
// }
