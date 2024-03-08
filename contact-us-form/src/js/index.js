const $stepOne = $('.step.one')
const $stepTwo = $('.step.two')
const $stepThree = $('.step.three')
const $stepText = $('#step-text')
const $stepDescription = $('#step-description')
const $inputName = $('#nome')
const $inputLastName = $('#sobrenome')
const $inputBirthDate = $('#dataNascimento')
const $inputEmail = $('#email')
const $inputMinibio = $('#minibio')
const $btnFormOne = $('#btnFormOne')
const $containerBtnFormOne = $('#containerBtnFormOne')

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let validName = false
let validLastName = false
let validEmail = false
let validBirthDate = false

function validateInput(element, minLength, maxLength, regex) {
    const closest = $(element).closest('.input-data')
    if (!element.value
        || (minLength && element.value.trim().length < minLength)
        || (maxLength && element.value.trim().length > maxLength)
        || (regex && !element.value.toLowerCase().match(regex))) {
        closest.addClass('error')
        return false
    }
    closest.removeClass('error')
    return true
}

function validateForm() {
    if(validName && validLastName && validEmail && validBirthDate) {
        $containerBtnFormOne.removeClass('disabled')
        $btnFormOne.removeClass('disabled')
    }
    else {
        $containerBtnFormOne.addClass('disabled')
        $btnFormOne.addClass('disabled')
    }
}

function init() {
    $stepTwo.hide();
    $stepThree.hide();
    $stepText.text('Step 1 of 3 - Pessoal Data')
    $stepDescription.text('Describe your details for we can meet you better.').css('font-size', '12px')

    $inputName.keyup(function () {
        validName = validateInput(this, 3, 25)
        validateForm();
    })
    $inputLastName.keyup(function () {
        validLastName = validateInput(this, 5, 50)
        validateForm();
    })

    $inputEmail.keyup(function() {
        validEmail = validateInput(this, 2, 50, emailRegex)
        validateForm();
    })

    $inputBirthDate.keyup(function () {
        validBirthDate = validateInput(this)
        validateForm();
    })
    $inputBirthDate.change(function () {
        validBirthDate = validateInput(this)
        validateForm();
    })

    $inputBirthDate.focus(function () {
        this.type = 'date'
    })

    $inputBirthDate.focusout(function () {
        if (!this.value) {
            this.type = 'text'
        }
    })

    $inputMinibio.keyup(function() {
        validateForm();
    })

    
}

init();