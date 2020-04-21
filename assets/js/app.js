var buttons = document.querySelectorAll('.button')

buttons.forEach(buttonElement => {
    buttonElement.addEventListener("mousedown", () => {
        buttonElement.classList.add('active')
    })
    buttonElement.addEventListener("mouseup", () => {
        buttonElement.classList.remove('active')
    })
})