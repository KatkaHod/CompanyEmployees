//General info - Function for generating random employees data

function main(dtoIn) {

 //Array of names and surnames
 const maleNames = ["Jiří", "Jan", "Petr", "Martin", "Tomáš", "Pavel", "Jaroslav", "Miroslav", "Zdeněk", "František", "Vratislav", "Vladimír", "Josef", "Ondřej", "Lukáš", "Radek", "Václav", "Milan", "Roman", "Aleš", "Libor", "Daniel", "Karel", "Vít"];
 const femaleNames = ["Diana", "Petra", "Lucie", "Veronika", "Eliška", "Kateřina", "Hana", "Jana", "Alena", "Ivana", "Anna", "Tereza", "Marie", "Zuzana", "Lenka", "Martina", "Monika", "Simona", "Barbora", "Markéta", "Renata", "Kamila", "Radka", "Dana"];
 const maleSurnames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Pokorný", "Marek", "Pospíšil", "Hájek", "Král", "Jelínek", "Růžička", "Beneš", "Fiala", "Sedláček", "Kolář", "Navrátil", "Čech"];
 const femaleSurnames = ["Malá", "Holubová", "Štěpánková", "Urbanová", "Bláhová", "Vlčková", "Šťastná", "Matoušková", "Říhová", "Vaňková", "Kadlecová", "Poláková", "Musilová", "Křížová", "Krejčíová", "Hrušková", "Tomanová", "Konečná", "Chalupová", "Hájeková"];
   
 //GetRandomFromArray
 function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }  
 
 //Random gender generation
 function getRandomGenderMaleOrFemale() {
    return Math.random() < 0.5 ? "male" : "female";
  }

 //Random date of birth generation - YYYY-MM-DDTHH:mm:ss.sssZ
 function getRandomBirthdate(minAge, maxAge) {
    if (minAge > maxAge) {
        throw new Error("Invalid age range: min age cannot be greater than max age");
    }

    const today = new Date();
    const startYear = today.getFullYear() - maxAge;
    const endYear = today.getFullYear() - minAge;

    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth = Math.floor(Math.random() * 12);
    const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate(); //Last day of the month
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

    return new Date(Date.UTC(randomYear, randomMonth, randomDay)).toISOString();
  }

  //Random workload generation
  function getRandomWorkload() {
    const workloads = [10, 20, 30, 40];
    return getRandomFromArray(workloads);
  }

  //Check input data
  if (
    !dtoIn || 
    typeof dtoIn.count !== "number" || dtoIn.count <= 0 || dtoIn.count > 40 || 
    typeof dtoIn.age?.min !== "number" || dtoIn.age.min < 18 || 
    typeof dtoIn.age?.max !== "number" || dtoIn.age.max > 65
  ) {
    throw new Error("Invalid input: count must be a positive number ≤ 40, and age must be between 18 and 65");
  }

  //Generate employees list
  const employees = [];
  for (let i = 0; i < dtoIn.count; i++) {
    const gender = getRandomGenderMaleOrFemale();
    const name = gender === "male" ? getRandomFromArray(maleNames) : getRandomFromArray(femaleNames);
    const surname = gender === "male" ? getRandomFromArray(maleSurnames) : getRandomFromArray(femaleSurnames);
    const birthdate = getRandomBirthdate(dtoIn.age.min, dtoIn.age.max);
    const workload = getRandomWorkload();

    employees.push({
        gender,
        name,
        surname,
        birthdate,
        workload,
      });
    }

 return employees;
 
}; //End of function main

//Input
const dtoIn = {
    count: 30,
    age: { min: 18, max: 65,},
  };

//Output
const dtoOut = main(dtoIn);
console.log(dtoOut);


