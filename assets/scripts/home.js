
fetch(`https://www.googleapis.com/books/v1/volumes?q=aqata`)  

.then(result => {
    console.log(result);
    return result.json() 
})
.then(importData => { 
    console.log(importData);
})
.catch(error => { 
    console.log(error);
})