//General info - This programme generates employee data based on the input

function generateEmployeeData(dtoIn) {

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

    // Random year between startYear a endYear
    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

    const birthdate = new Date(Date.UTC(randomYear, 0, 1, 0, 0, 0, 0));

    const age = today.getFullYear() - birthdate.getUTCFullYear();
    if (age < minAge || age > maxAge) {
        throw new Error(`Generated birthdate does not match age limits: ${birthdate.toISOString()}`);
    }

    return birthdate.toISOString();
  }

  //Random workload generation
  function getRandomWorkload() {
    const workloads = [10, 20, 30, 40];
    return getRandomFromArray(workloads);
  }

  //Check input data
  if (
    !dtoIn || 
    typeof dtoIn.count !== "number" || dtoIn.count <= 0 || dtoIn.count > 50 || 
    typeof dtoIn.age?.min !== "number" || dtoIn.age.min < 18 || 
    typeof dtoIn.age?.max !== "number" || dtoIn.age.max > 65
  ) {
    throw new Error("Invalid input: count must be a positive number <= 50, and age must be between 18 and 65");
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
 
}; 

/*
  Statistical calculations 
*/

//1. Number of employees from the list
function calculateTotalEmployees(employees) {
  return employees.length;
}

//2. Number of employees by workload (10, 20, 30 and 40h/week)
function calculateEmployeesByWorkload(employees) {
  const workloads = { 10: 0, 20: 0, 30: 0, 40: 0 };
  for (const employee of employees) {
    workloads[employee.workload]++;
  }
  return workloads;
}

//3. Average age of employees
function calculateAverageAge(employees) {
  const today = new Date();
  let totalAge = 0;
  for (const employee of employees) {
    const birthdate = new Date(employee.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    totalAge = totalAge + age; //totalAge += age;
  }
  return +(totalAge / employees.length).toFixed(1);
}
//4. Age of the youngest employee
function calculateMinimumAge(employees) {
  const today = new Date();
  let minAge = Infinity;
  for (const employee of employees) {
    const birthdate = new Date(employee.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    if (age < minAge) {
      minAge = age;
    }
  }
  return minAge;
}

//5. Age of the oldest employee
function calculateMaximumAge(employees) {
  const today = new Date();
  let maxAge = -Infinity;
  for (const employee of employees) {
    const birthdate = new Date(employee.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    if (age > maxAge) {
      maxAge = age;
    }
  }
  return maxAge;
}

//6. Median age of the employees
function calculateMedianAge(employees) {
  const today = new Date();
  const ages = [];

  for (const employee of employees) {
    const birthdate = new Date(employee.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    ages.push(age);
  }

  ages.sort((a, b) => a - b); //sorted in ascending order to find the median

/*
  When the number of employees is even, the median is the average of the two middle values.
  Otherwise, the number is odd, the median is the middle value.
*/
  const mid = Math.floor(ages.length / 2);
  if (ages.length % 2 === 0) {
    return (ages[mid - 1] + ages[mid]) / 2;
  } else {
    return ages[mid];
  }
}

//7. Median workload
function calculateMedianWorkload(employees) {
  const workloads = employees.map(employee => employee.workload);

  workloads.sort((a, b) => a - b); //sorted in ascending order to find the median

  const mid = Math.floor(workloads.length / 2);
  if (workloads.length % 2 === 0) {
    return (workloads[mid - 1] + workloads[mid]) / 2;
  } else {
    return workloads[mid];
  }
}

//8. Average workload of female employees
function calculateAvgWorkloadWomen(employees) {
  let totalWorkload = 0;
  let count = 0;
  for (const employee of employees) {
    if (employee.gender === "female") {
      totalWorkload += employee.workload;
      count++;
    }
  }
  return count > 0 ? +(totalWorkload / count).toFixed(1) : 0;
}

//9. Employees sorted by workloads
function getEmployeesSortedByWorkload(employees) {
  return [...employees].sort((a, b) => a.workload - b.workload); 
}


/*
  Employee statistics - returns an object containing various calculated statistics
*/
function getEmployeeStatistics(employees) {
  return {
    totalEmployees: calculateTotalEmployees(employees),
    employeesByWorkload: calculateEmployeesByWorkload(employees),
    averageAge: calculateAverageAge(employees),
    minAge: calculateMinimumAge(employees),
    maxAge: calculateMaximumAge(employees),
    medianAge: calculateMedianAge(employees),
    medianWorkload: calculateMedianWorkload(employees),
    averageWomenWorkload: calculateAvgWorkloadWomen(employees),
    sortedByWorkload: getEmployeesSortedByWorkload(employees),
  };
}

//MAIN FUNCTION

function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn); //Array of employee objects generated based on input parameters
  const statistics = getEmployeeStatistics(employees); //Object containing calculated statistics based on the employee list
  return {
    total: statistics.totalEmployees,
    workload10: statistics.employeesByWorkload[10],
    workload20: statistics.employeesByWorkload[20],
    workload30: statistics.employeesByWorkload[30],
    workload40: statistics.employeesByWorkload[40],
    averageAge: statistics.averageAge,
    minAge: statistics.minAge,
    maxAge: statistics.maxAge,
    medianAge: statistics.medianAge,
    medianWorkload: statistics.medianWorkload,
    averageWomenWorkload: statistics.averageWomenWorkload,
    sortedByWorkload: statistics.sortedByWorkload,
  };
}

//Input
const dtoIn = {
    count: 50,
    age: { min: 19, max: 35,},
  };

//Output
const dtoOut = main(dtoIn);
console.log(dtoOut);


