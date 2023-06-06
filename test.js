


console.log(Date.now());


async function fetchData(data) {
  // let data;
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=boolean');
    data = await response.json();
    // Handle the retrieved JSON data
    console.log(data.results);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.log('Error:', error);
  }
  return await data;
}

// console.log(fetch());

fetchData();

console.log(data);

data.map((data)=>{
  console.log(data);
});

