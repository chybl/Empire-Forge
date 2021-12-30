// kubejs/server_scripts/example.js
// This is just an example script to show off multiple types of recipes and removal methods
// Supports /reload

// Listen to server recipe event

//remove C&C bnackport tags bc it was causing problems w the script. Not like it was being used anyway.
onEvent('item.tags', event =>{
    event.remove('forge:ingots','cavesandcliffs:copper_ingot')
    event.remove('forge:ingots/copper','cavesandcliffs:copper_ingot')
})

//fix creates stupid tagging
onEvent('item.tags', event =>{
    
    metalList.forEach(element => {
        event.add('create:crushed_ores/'+element,'create:crushed_'+element+'_ore')
        
    })

    //create crushed brass given the proper tag.
    //event.add('create:crushed_ores/brass','create:crushed_brass')
})




/** ListMaker
 * makes a new list that's a copy of every element with the prefix attached.
 * 
 * @param {*} prefix a prefix that will be added to every element in the list.
 * @param {*} suffixList a list of elements that need a prefix.
 * @returns a list of the same elements inputted with the prefix attached.
 */
function listMaker(prefix,suffixList)
{
    //define output
    let output = []

    //for every suffix in the suffix list,
    // make a string,
    // add the prefix to the begginning and push it on to output.
    suffixList.forEach(element => {output.push(prefix+element)})
    
    return output 
}


//ingot list
let metalList = [
    'gold',
    'copper',
    'zinc',
    'iron'
]


//all of these arrays should have the same length of metalList
let ingotList = listMaker('#forge:ingots/',metalList)

let nuggetList = listMaker('#forge:nuggets/',metalList)

let oreList = listMaker('#forge:ores/',metalList)

let crushedOreList = listMaker('#create:crushed_ores/',metalList)

let blocksList = listMaker('#forge:storage_blocks/',metalList)

let dustList = listMaker('#forge:dusts/',metalList)

//basically public static void Main(String args[])
onEvent('recipes', event => {

    

    //remove every recipe for an ingot in list.
    ingotList.forEach(element => event.remove({output:element}))
    crushedOreList.forEach(element => event.remove({output:element}))

    //add t1 and t1.5 furnace/blast furnace recpies recipes
    
    for(let i = 0; i<metalList.length; i++)
    {
        event.smelting(nuggetList[i],oreList[i])
        event.blasting('2x '+nuggetList[i],oreList[i])
    }

    //add nugget to ingot crafting.
    //and block to ingot crafting.
    //create compacting added automatically.
    for(let i = 0; i<metalList.length; i++)
    {
        event.shapeless(ingotList[i],[nuggetList[i],nuggetList[i],nuggetList[i],nuggetList[i],nuggetList[i],nuggetList[i],nuggetList[i],nuggetList[i],nuggetList[i]])
        event.shapeless('9x '+ingotList[i], blocksList[i])
    }

    //adds t2 milling, crushing, and crushed ore smelthing recipes
    for(let i = 0; i<metalList.length; i++)
    {
        event.recipes.createMilling('1x '+crushedOreList[i],oreList[i])
        event.recipes.createCrushing(['2x '+crushedOreList[i],Item.of(crushedOreList[i]).withChance(0.25)],oreList[i])
    }

   //add crushed to blast recipes.
   for(let i = 0; i<metalList.length; i++){
        event.smelting(nuggetList[i],crushedOreList[i])
        event.blasting('3x '+nuggetList[i],crushedOreList[i]) 
   }

   //add t3 ore processing. crushed ore ->[splashing] -> dust
   for(let i = 0; i < dustList.length; i++)
   {
        event.recipes.createSplashing(['2x '+dustList[i],Item.of(dustList[i]).withChance(0.50)],crushedOreList[i])
        event.smelting(nuggetList[i],dustList[i])
        event.blasting('3x '+nuggetList[i],dustList[i])
    }

   
})
