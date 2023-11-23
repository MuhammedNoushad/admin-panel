const num = 3;

const array = [3,4,5,6,7,8];

array.splice(3,0,10);

console.log(array);

const sum = array.reduce((acc,num)=> {
return acc+num;
},0)

console.log(sum);

(function hello (){
    console.log("hello world");
})();