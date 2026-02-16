
const word = "my name is kaif and i am from delhi"

console.log(word.split(" "))

const letter = word.split(' ')
letter.map(c => {
    c.split('').map( l =>{
        console.log(l)
    })
})