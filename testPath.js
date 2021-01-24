const path = ['obj', 'a']
const errorSchema = {}
let parent = errorSchema
for (const segment of path) {
  if (!(segment in parent)) {
    parent[segment] = {}
  }
  parent = parent[segment]
}

console.log(errorSchema)
