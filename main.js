// Vars
let btn = document.querySelector(".btn");
let mainDiv = document.querySelector(".main");
let surhaNum = document.querySelector(".num");
let verseNum = document.querySelector(".verse");
let audio = document.querySelector("audio");
let ayahDiv = document.querySelector(".ayah");
let ayahInfoDiv = document.querySelector(".ayah-info");
let surahInfoDiv = document.querySelector(".surah-info");

// Main Function That Fetch The API
btn.onclick = function () {
  fetch(`http://api.alquran.cloud/v1/surah/${surhaNum.value}/ar.alafasy`)
    .then((response) => response.json())
    .then((rowData) => getData(rowData));
};

// Get Data From Fetch
function getData(rowData) {
  if (surhaNum.value != "" && verseNum.value != "") {
    showSurha(rowData.data);
    showVerse(rowData.data.ayahs, rowData.data.ayahs.length);
  } else {
    ayahDiv.innerHTML = "Please";
  }
}

// showSurha Function
function showSurha(surah) {
  surahInfoDiv.innerHTML = "";
  // console.log(surah);
  ///////////////////////////////////////////////
  let surahName = document.createElement("div");
  surahName.innerHTML = surah.name;
  surahInfoDiv.appendChild(surahName);
  // console.log(surah.name);
  ///////////////////////////////////////////////
  // console.log(surah.number);
  let surahlen = document.createElement("div");
  surahlen.innerHTML = `رقم السورة => ${surah.number}`;
  surahInfoDiv.appendChild(surahlen);
  ///////////////////////////////////////////////
  let suraAyaLen = document.createElement("div");
  suraAyaLen.innerHTML = `عدد آيات السورة => ${surah.ayahs.length}`;
  surahInfoDiv.appendChild(suraAyaLen);
  // console.log(surah.ayahs.length);
  ///////////////////////////////////////////////
  let surahType = document.createElement("div");
  surahType.innerHTML =
    surah.revelationType == "Medinan" ? "سورة مدنية" : "سورة مكية";
  surahInfoDiv.appendChild(surahType);
  // console.log(surah.revelationType);
  ///////////////////////////////////////////////
}

// showVerse Function
// numOfVerse => verses length

function showVerse(verse, numOfVerse) {
  verse = verse[verseNum.value - 1];
  if (verseNum.value > numOfVerse) {
    ayahDiv.innerHTML = "Please 2";
  } else {
    // console.log(verse);
    // Clearing
    ayahInfoDiv.innerHTML = "";
    ayahDiv.innerHTML = "";
    ////////////////////////////////////////
    let bsmlha = document.createElement("div");
    bsmlha.innerHTML = " بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ";
    ayahDiv.appendChild(bsmlha);
    ///////////////////////////////////////////////
    let textDiv = document.createElement("div");
    textDiv.innerHTML = verse.text;
    ayahDiv.appendChild(textDiv);
    // console.log(verse.text);
    ////////////////////////////////////////////////
    let sdk = document.createElement("div");
    sdk.innerHTML = "صدق اللَّهُ العظيم";
    ayahDiv.appendChild(sdk);
    ////////////////////////////////////////////////
    let ayahlen = document.createElement("span");
    ayahlen.innerHTML = `رقم الآية => ${verse.numberInSurah}`;
    ayahInfoDiv.appendChild(ayahlen);
    // console.log(verse.numberInSurah);
    ////////////////////////////////////////////////
    let ayahPage = document.createElement("div");
    ayahPage.innerHTML = `رقم الصفحة => ${verse.page}`;
    ayahInfoDiv.appendChild(ayahPage);
    // console.log(verse.page);
    ////////////////////////////////////////////////
    audio.setAttribute("src", verse.audio);
    // console.log(verse.audio);
    ////////////////////////////////////////////////
    let hizbQ = document.createElement("div");
    hizbQ.innerHTML = `ربع الحزب => ${verse.hizbQuarter}`;
    ayahInfoDiv.appendChild(hizbQ);
    // console.log(verse.hizbQuarter);
    ////////////////////////////////////////////////
    let sajdaDiv = document.createElement("div");
    sajdaDiv.innerHTML = verse.sajda ? "يوجد سجدة" : "لا يوجد سجدة";
    ayahInfoDiv.appendChild(sajdaDiv);
    // console.log(verse.sajda);
    /////////////////////////////////////////////////
  }
}
