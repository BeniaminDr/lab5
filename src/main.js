import dayjs from 'dayjs'
import './style.css'

const form = document.querySelector('#birthdayForm')
const birthdayInput = document.querySelector('#birthday')
const dialog = document.querySelector('#resultDialog')
const resultText = document.querySelector('#resultText')
const closeDialog = document.querySelector('#closeDialog')

birthdayInput.max = dayjs().format('YYYY-MM-DD')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const birthday = dayjs(birthdayInput.value).startOf('day')
  const today = dayjs().startOf('day')

  const daysFromBirth = today.diff(birthday, 'days')

  const hasBirthdayToday =
    birthday.date() === today.date() &&
    birthday.month() === today.month()

  let message = `Od Twojej daty urodzenia minęło ${daysFromBirth} dni.`

  if (hasBirthdayToday) {
    message += '\nWszystkiego najlepszego!'
  } else {
    let nextBirthday = birthday.year(today.year()).startOf('day')

    if (nextBirthday.diff(today, 'day') < 0) {
      nextBirthday = nextBirthday.add(1, 'year')
    }

    const daysToBirthday = nextBirthday.diff(today, 'day')
    const weeksToBirthday = Math.floor(daysToBirthday / 7)

    if (weeksToBirthday === 0) {
      message += '\nMasz urodziny w tym tygodniu!'
    } else {
      message += `\nDo Twoich urodzin pozostało około ${weeksToBirthday} tygodni.`
    }
  }

  resultText.textContent = message
  dialog.showModal()
})

closeDialog.addEventListener('click', () => {
  dialog.close()
})