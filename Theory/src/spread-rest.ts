const hobbies = ['Code', 'Game'];
const activeHobbies = ['Hiking'];

// spread
activeHobbies.push(...hobbies);
console.log(activeHobbies); // ['Hiking', 'Code', 'Game']

// rest parameters
function combine(...rest: any[]) {
  console.log(rest);
}

combine(hobbies, activeHobbies, 'Sleep');
// [ [ 'Code', 'Game' ], [ 'Hiking', 'Code', 'Game' ], 'Sleep' ]
