let fname = "Hemant"
let lname = "Yadav"

let f2 = fname
 console.log(f2)

f2 = "Madhu";

console.log(f2)
console.log(fname)

const Human = {
    name: "hemant Kumar",
    height: 6,
    isMarried: true,
    hobbies: [`dancing`, `martial arts`, `swimming`],
    childern: {
        name: `any`,
        age: 1,
        isHealthy: true,
        hobbies: {
            fitness: `martial arts`,
            entertainment: `dancing`,
            tech: `coding`
        }
    }
}

console.log(Human)

const h1 = Human;

h1.name = `Sumant`;

console.log(Human.name)
// this is shallow copy
const h2 = {
    ...Human
}

h2.name = `Android`

h2.hobbies[1]=`Android development`;

console.log(Human.name);
console.log(Human.hobbies[1])

const str = JSON.stringify(Human);
console.log(str);

// this is deep copy
const h3 = JSON.parse(str);

console.log(h3);

h3.childern.hobbies.entertainment= `Singing`;

console.log(Human.childern.hobbies.entertainment)


console.log(h3.childern.hobbies.entertainment)