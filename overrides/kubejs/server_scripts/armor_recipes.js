
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

let armor_pieces = [
    'helmet',
    'chestplate',
    'leggings',
    'boots'
]

let armor_materials = [
    'minecraft:netherite_',
    'minecraft:diamond_',
    'minecraft:gold_',
    'minecraft:iron_',
    'minecraft:chainmail_',
    'minecraft:leather_'
]

onEvent('item.tags', event =>{
    event.add('curios:body','minecraft:chainmail_chestplate')
})


onEvent('recipes', event => {



})