

function createUniqueStoriesWithAllTags(rows){

     // console.log(row);

     const stories = rows;

     /* Si un relato tiene varios tags, aparecerán tantos objetos de ese relato como tags tenga, todos iguales salvo el tagname. Para ellos necesitamos reconvertir esa informacion de forma que por cada relato únicamente haya un objeto el cual tenga el atributo tagname en formato array con todos los tags que le correspondan. */

     // El objeto Set te permite almacenar valores ÚNICOS de cualquier tipo
     // [...X] ya que no sabemos qué cantidad de elementos va a tener el array
     // Map realiza una operacion en cada uno de los valores y lo devuelve
     const distinctIds = [... new Set(stories.map( x => x.id))];
     // El map nos devovlería un array con todos los ids.
     // Set nos creará el array de ids cogiendo únicamente aquellos que sean distintos
     // Resultado: Crea un array indeterminado de valores DIFERENTES donde, por cada componente, guardará el id
     //console.log("distinctIds: ");
     //console.log(distinctIds); // Resultado [80, 75] --> Tenemos todos los ids que existen SIN repetirlos

     const uniqueIdStories = []; 
     // Array de objetos donde guardaremos los objetos Story sin repetir y que contendrá TODOS los tagas de cada uno

     // El método forEach() ejecuta la función indicada una vez por cada elemento del array.
     distinctIds.forEach(id => { // Cada elemento es un id, por eso lo llama id aquí, no es más que un nombre
         // hará este bucle n veces, donde n es el número de ids diferentes  
         uniqueIdStories // vamos a rellenarlo
         .push(stories.filter((element) => { // Filter devuelve los valores de stories que cumplen la condicion
             return element.id === id;
         }) // Ha copiado todos los objetos de stories que tuviesen el id de la iteración en la que estamos dentro de uniqueIdStories

         // Ahora vamos a reducir los que estén repetidos a uno solo pero añadiendo los tags nuevos que aparezcan
         .reduce((uniqueIdStoriesArray, storyElement)=> {
             // Reduce aplica una funcion acumulada que acaba devolviendo un solo valor
             // array.reduce(function(total, currentValue), initialValue)
             // total --> es en un principio el valor inicial (el primero)
             // initialValue --> Optional. A value to be passed to the function as the initial value
             uniqueIdStoriesArray.id = storyElement.id;
             uniqueIdStoriesArray.title = storyElement.title;
             uniqueIdStoriesArray.author_id = storyElement.author_id;
             uniqueIdStoriesArray.body = storyElement.body;
             uniqueIdStoriesArray.tagname.push(storyElement.tagname);
             return uniqueIdStoriesArray;
         }, {tagname: []}));
     });
     // console.log("Resultado final: ");
     // console.log(uniqueIdStories);


    return uniqueIdStories;
}

module.exports = {
    createUniqueStoriesWithAllTags,
  
};
  