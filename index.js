const trigram = require('./trigram.json')
var phone = "63362528"
var length = phone.length

var part1;
var part2;
phone = phone.split("0").join("8")
if(length % 2 == 0){
  part1 = phone.slice(0,-(length/2))
  part2 = phone.slice(length/2)
}else {
  part1 = phone.slice(0,-Math.round((length/2)-1))
  part2 = phone.slice(Math.floor((length/2)+1))
}

var zhuGuaTop = {
  sumOfDigits: part1.split("").reduce((partialSum, a) => Number(partialSum) + Number(a), 0),
  mod: part1.split("").reduce((partialSum, a) => Number(partialSum) + Number(a), 0) % 8
}

var zhuGuaBottom = {
  sumOfDigits: part2.split("").reduce((partialSum, a) => Number(partialSum) + Number(a), 0),
  mod: part2.split("").reduce((partialSum, a) => Number(partialSum) + Number(a), 0) % 8
}

if(zhuGuaTop.mod == 0) zhuGuaTop.mod = 8
if(zhuGuaBottom.mod == 0) zhuGuaBottom.mod = 8

zhuGuaTop.element = trigram[zhuGuaTop.mod.toString()].element
zhuGuaBottom.element = trigram[zhuGuaBottom.mod.toString()].element
zhuGuaTop.bagua = trigram[zhuGuaTop.mod.toString()].bagua
zhuGuaBottom.bagua = trigram[zhuGuaBottom.mod.toString()].bagua
zhuGuaTop.symbol = trigram[zhuGuaTop.mod.toString()].symbol
zhuGuaBottom.symbol = trigram[zhuGuaBottom.mod.toString()].symbol
zhuGuaTop.index = trigram[zhuGuaTop.mod.toString()].index
zhuGuaBottom.index = trigram[zhuGuaBottom.mod.toString()].index

function getHuGua(top, bottom, direction) {
    var huGuaTopIndex = trigram[top.mod.toString()].index
    var huGuaBottomIndex = trigram[bottom.mod.toString()].index
    if(direction == "top") {
        return [huGuaTopIndex[1], huGuaTopIndex[2], huGuaBottomIndex[0]]
    }else {
        return [huGuaTopIndex[2], huGuaBottomIndex[0], huGuaBottomIndex[1]]
    }
}

function arraysEqualInOrder(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

var huGuaTop = Object.values(trigram).find(gua => arraysEqualInOrder(gua.index, getHuGua(zhuGuaTop, zhuGuaBottom, "top")))

var huGuaBottom = Object.values(trigram).find(gua => arraysEqualInOrder(gua.index, getHuGua(zhuGuaTop, zhuGuaBottom, "bottom")))

var totalNumber = zhuGuaTop.sumOfDigits + zhuGuaBottom.sumOfDigits

var totalNumberMod = totalNumber % 6

if(totalNumberMod == 0) totalNumberMod = 6

var ziGuaIndex = zhuGuaTop.index.concat(zhuGuaBottom.index)

if(ziGuaIndex[ziGuaIndex.length - totalNumberMod] == 1) {
    ziGuaIndex[ziGuaIndex.length - totalNumberMod] = 0
}else {
    ziGuaIndex[ziGuaIndex.length - totalNumberMod] = 1
}

var ziGuaTop = Object.values(trigram).find(gua => arraysEqualInOrder(gua.index, ziGuaIndex.slice(0,3)))
var ziGuaBottom = Object.values(trigram).find(gua => arraysEqualInOrder(gua.index, ziGuaIndex.slice(3,6)))

console.log("输入号码: " + phone)
console.log("号码长度: " + length)
console.log("主卦上卦: " + zhuGuaTop.symbol + " " + zhuGuaTop.bagua + " " + zhuGuaTop.element + " (总和: " + zhuGuaTop.sumOfDigits + ", 取余: " + zhuGuaTop.mod + ")")
console.log("主卦下卦: " + zhuGuaBottom.symbol + " " + zhuGuaBottom.bagua + " " + zhuGuaBottom.element + " (总和: " + zhuGuaBottom.sumOfDigits + ", 取余: " + zhuGuaBottom.mod + ")")
console.log("互卦上卦: " + huGuaTop.symbol + " " + huGuaTop.bagua + " " + huGuaTop.element)
console.log("互卦下卦: " + huGuaBottom.symbol + " " + huGuaBottom.bagua + " " + huGuaBottom.element)
console.log("之卦上卦: " + ziGuaTop.symbol + " " + ziGuaTop.bagua + " " + ziGuaTop.element)
console.log("之卦下卦: " + ziGuaBottom.symbol + " " + ziGuaBottom.bagua + " " + ziGuaBottom.element)