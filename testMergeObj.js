// function mergeObjects(obj1, obj2, concatArrays = false) {
//   // Recursively merge deeply nested objects.
//   const acc = Object.assign({}, obj1) // Prevent mutation of source object.
//   // console.log(acc, 'acc')
//   return Object.keys(obj2).reduce((acc, key) => {
//     const left = obj1 ? obj1[key] : {},
//       right = obj2[key]
//     if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
//       acc[key] = mergeObjects(left, right, concatArrays)
//     } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
//       acc[key] = left.concat(right)
//     } else {
//       acc[key] = right
//     }
//     return acc
//   }, acc)
// }

function isObject(thing) {
  return typeof thing === 'object' && thing !== null && !Array.isArray(thing)
}

function mergeObjects(obj1, obj2, isMergeArray = false) {
  const acc = Object.assign({}, obj1)
  return Object.keys(obj2).reduce((acc, key) => {
    console.log('1')
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]
    // 注意了,obj1[key]拿到的可能是自身属性,也可能是原型链上的属性！所以要用hasOwnProperty
    // 来保证其自身具备该属性！
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, isMergeArray)
    } else if (isMergeArray && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}

const obj1 = { name: 'york', age: 12, pets: ['dog', 'cat'] }
const obj2 = { age: 1, gender: 'male' }

const obj = mergeObjects(obj1, obj2, true)
console.log(obj, 'obj')
