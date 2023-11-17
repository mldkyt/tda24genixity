import { validateContact, validateExtraKeys, validateTags } from "./lecturers"

// Phone Number Regex

test('Phone number regex 1/3', () => {
    const regex = /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/g
    expect(regex.test('+31612345678')).toBe(true)
})

test('Phone number regex 2/3', () => {
    const regex = /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/g
    expect(regex.test('+123 777 338 111')).toBe(true)
})

test('Phone number regex 3/3', () => {
    const regex = /^(\+\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/g
    expect(regex.test('123456789')).toBe(true)
})

// ValidateExtraKeys

test('checks if validateExtraKeys works if we don\'t give it all the keys', () => {
    expect(validateExtraKeys({ 'name': 'test'}, ['name', 'age'])).toBe(true)
})

test('check if validateExtraKeys works if we give it extra keys', () => {
    expect(validateExtraKeys({ 'name': 'test', 'lastname': 'test'}, ['name', 'age'])).toBe(false)
})

test('check if validateExtraKeys works if we give it all the keys', () => {
    expect(validateExtraKeys({ 'name': 'test', 'age': 12}, ['name', 'age'])).toBe(true)
})

// CheckTags

test('test checkTags with 1 tag with name', () => {
    expect(validateTags([{name: 'test'}])).toBe(true)
})

test('test validateTags with 1 tag without name', () => {
    expect(validateTags([{}])).toBe(false)
})

test('test checkTags with multiple tags', () => {
    expect(validateTags([{name: 'test 1'}, {name: 'test 2'}, {name: 'test 3'}, {name: 'test 4'}])).toBe(true)
})

test('test checkTags with multiple tags but 1 invalid', () => {
    expect(validateTags([{name: 'test 1'}, {}, {name: 'test 3'}, {name: 'test 4'}])).toBe(false)
})

// ValidateContact

test('test validateContact with only email', () => {
    expect(validateContact({
        emails: ['programmerastolfo@gmail.com'],
        telephone_numbers: []
    })).toBe(true)
})

test('test validateContact with multiple emails', () => {
    expect(validateContact({
        emails: ['programmerastolfo@gmail.com', 'programmerastolfo@proton.me'],
        telephone_numbers: []
    })).toBe(true)
})

test('test validateContact with only phone number', () => {
    expect(validateContact({
        emails: [],
        telephone_numbers: ['+123 777 338 111']
    })).toBe(true)
})

test('test validateContact with multiple phone numbers', () => {
    expect(validateContact({
        emails: [],
        telephone_numbers: ['+123 777 338 111', '+123 711 338 777']
    })).toBe(true)
})

test('test validateContact with valid contact information', () => {
    expect(validateContact({
        emails: ['programmerastolfo@gmail.com'],
        telephone_numbers: ['+31612345678', '+123 777 338 111']
    })).toBe(true)
})

test('test validateContact with invalid email', () => {
    expect(validateContact({
        emails: ['programmerastolfo'],
        telephone_numbers: ['+31612345678']
    })).toBe(false)
})

test('test validateContact with invalid telephone number', () => {
    expect(validateContact({
        emails: ['programmerastolfo@gmail.com'],
        telephone_numbers: ['aidnjfo']
    })).toBe(false)
})