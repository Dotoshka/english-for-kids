export default function shuffle(array) {
  const newArr = array;
  for (let i = array.length; i > 0; i--) {
    const randInd = Math.floor(Math.random() * i);
    const randElem = newArr.splice(randInd, 1)[0];
    newArr.push(randElem);
  }
  return newArr;
}
