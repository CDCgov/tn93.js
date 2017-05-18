;
"use strict";

(function(){

  // Valid matchModes include "RESOLVE", "AVERAGE", "SKIP", "GAPMM"
  function tn93(s1, s2, matchMode){
    if(!matchMode) matchMode = "RESOLVE";
    var L = Math.min(s1.length, s2.length);
    var mapChar = Array(256).fill(16);
    // For an Explanation of these codes, see [this Wikipedia Article on Nucleic Acid Notation](https://en.wikipedia.org/wiki/Nucleic_acid_notation)
    mapChar[45]  = 17; // GAP
    mapChar[65]  = 0;  // A
    mapChar[66]  = 11; // B
    mapChar[67]  = 1;  // C
    mapChar[68]  = 12; // D
    mapChar[71]  = 2;  // G
    mapChar[72]  = 13; // H
    mapChar[75]  = 9;  // K
    mapChar[77]  = 10; // M
    mapChar[78]  = 15; // N
    mapChar[82]  = 5;  // R
    mapChar[83]  = 7;  // S
    mapChar[84]  = 3;  // T
    mapChar[85]  = 4;  // U
    mapChar[86]  = 14; // V
    mapChar[87]  = 8;  // W
    mapChar[89]  = 6;  // Y
    mapChar[97]  = 0;  // a
    mapChar[98]  = 11; // b
    mapChar[99]  = 1;  // c
    mapChar[100] = 12; // d
    mapChar[103] = 2;  // g
    mapChar[104] = 13; // h
    mapChar[107] = 9;  // k
    mapChar[109] = 10; // m
    mapChar[110] = 15; // n
    mapChar[114] = 5;  // r
    mapChar[115] = 7;  // s
    mapChar[116] = 3;  // t
    mapChar[117] = 4;  // u
    mapChar[118] = 14; // v
    mapChar[119] = 8;  // w
    mapChar[121] = 6;  // y

    var resolutions = [
      [1,0,0,0],
      [0,1,0,0],
      [0,0,1,0],
      [0,0,0,1],
      [0,0,0,1], // U - 4
      [1,0,1,0], //RESOLVE_A | RESOLVE_G, // R - 5
      [0,1,0,1], //RESOLVE_C | RESOLVE_T, // Y - 6
      [0,1,1,0], //RESOLVE_C | RESOLVE_G, // S - 7
      [1,0,0,1], //RESOLVE_A | RESOLVE_T, // W - 8
      [0,0,1,1], //RESOLVE_G | RESOLVE_T, // K - 9
      [1,1,0,0], //RESOLVE_A | RESOLVE_C, // M - 10
      [0,1,1,1], // RESOLVE_C | RESOLVE_G | RESOLVE_T, // B - 11
      [1,0,1,1], //RESOLVE_A | RESOLVE_G | RESOLVE_T, // D - 12
      [1,1,0,1], //RESOLVE_A | RESOLVE_C | RESOLVE_T, // H - 13
      [1,1,1,0], // RESOLVE_A | RESOLVE_C | RESOLVE_G, // V - 14
      [1,1,1,1], // RESOLVE_A | RESOLVE_C | RESOLVE_G | RESOLVE_T , // N - 15
      [1,1,1,1], //RESOLVE_A | RESOLVE_C | RESOLVE_G | RESOLVE_T , // ? - 16
      [0,0,0,0] // GAP
    ];

    var resolutionsCount = [
      1.0, 1.0, 1.0, 1.0, 1.0,
      1.0/2.0, // R
      1.0/2.0, // Y
      1.0/2.0, // S
      1.0/2.0, // S
      1.0/2.0, // W
      1.0/2.0, // K
      1.0/2.0, // M
      1.0/3.0, // B
      1.0/3.0, // D
      1.0/3.0, // H
      1.0/3.0, // V
      1.0/4.0, // N
      1.0/4.0, // ?
      0.0
    ];

    var ambig_count = 0;
    var dist = 0;
    var pairwiseCounts = [
      [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
    ];

    for (var i = 0; i < 4; i++){
      for (var p = 0; p < L; p++){
        var c1 = mapChar[s1.charCodeAt(p)];
        var c2 = mapChar[s2.charCodeAt(p)];

        if (c1 < 4 && c2 < 4){
          pairwiseCounts [c1][c2] += 1;
        } else { // not both resolved
          if (c1 == 17 || c2 == 17){
            if (matchMode != "GAPMM"){
              continue;
            } else {
              if (c1 == 17 && c2 == 17){
                continue;
              } else {
                if (c1 == 17){
                  c1 = 15;
                } else {
                  c2 = 15;
                }
              }
            }
          }

          if (c1 < 4){ // c1 resolved and c2 is not
            if (matchMode != "SKIP"){
              if (resolutionsCount[c2] > 0){
                if (matchMode == "RESOLVE"){
                  if (resolutions[c2][c1]){
                    ambig_count++;
                    pairwiseCounts[c1][c1] += 1;
                    continue;
                  }
                }
                for(var j = 0; j < 4; j++){
                  if (resolutions[c2][j]){
                    pairwiseCounts[c1][j] += resolutionsCount[c2];
                  }
                }
              }
            }
          } else {
            if (matchMode != "SKIP"){
              if (c2 < 4){ // c2 resolved an c1 is not
                if (resolutionsCount[c1] > 0){
                  if (matchMode == "RESOLVE"){
                    if (resolutions[c1][c2]){
                      ambig_count++;
                      pairwiseCounts[c2][c2] += 1;
                      continue;
                    }
                  }
                  for(var j = 0; j < 4; j++){
                    if (resolutions[c1][j]){
                      pairwiseCounts[j][c2] += resolutionsCount[c1];
                    }
                  }
                }
              } else {
                // ambig and ambig
                norm = resolutionsCount[c1] * resolutionsCount[c2];
                if (norm > 0.0){
                  if (matchMode == "RESOLVE"){
                    ambig_count++;
                    matched_count = 0;
                    positive_match = [false, false, false, false];
                    for (var j = 0; j < 4; j++){
                      if (resolutions[c1][j] && resolutions[c2][j]){
                        matched_count++;
                        positive_match[j] = true;
                      }
                    }

                    if (matched_count > 0){
                      norm2 = 1/matched_count;
                      for (var j = 0; j < 4; j++){
                        if (positive_match[j]){
                          pairwiseCounts[j][j] += norm2;
                        }
                      }
                      continue;
                    }
                  }

                  for (var j = 0; j < 4; j++){
                    if (resolutions[c1][j]){
                      for (var k = 0; k < 4; k++){
                        if (resolutions[c2][k]){
                          pairwiseCounts[j][k] += norm;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    var nucFreq = [0, 0, 0, 0];
    for (var c1 = 0; c1 < 4; c1++){
      for (var c2 = 0; c2 < 4; c2++){
        nucFreq[c1] += pairwiseCounts[c1][c2];
        nucFreq[c2] += pairwiseCounts[c1][c2];
      }
    }

    var totalNonGap	= 2/(nucFreq[0] + nucFreq[1] + nucFreq[2] + nucFreq[3]);
    var AG = (pairwiseCounts[0][2] + pairwiseCounts[2][0]) * totalNonGap;
    var CT = (pairwiseCounts[1][3] + pairwiseCounts[3][1]) * totalNonGap;
    var tv = 1-((pairwiseCounts[0][0] + pairwiseCounts[1][1] + pairwiseCounts[2][2] + pairwiseCounts[3][3]) * totalNonGap + AG + CT);

    if (nucFreq[0] == 0 || nucFreq[1] == 0 || nucFreq[2] == 0 || nucFreq[3] == 0){
      AG = 1 - 2 * (AG + CT) - tv;
      CT = 1 - 2 * tv;
      if (AG > 0 && CT > 0){
        dist = -0.5 * Math.log(AG) - 0.25 * Math.log(CT);
      } else {
        dist = 1.0;
      }
    } else {
      var auxd = 1/(nucFreq[0] + nucFreq[1] + nucFreq[2] + nucFreq[3]);
      var nucF = [0, 0, 0, 0];
      for (var aux1 = 0; aux1 < 4; aux1++){
        nucF[aux1] = nucFreq[aux1] * auxd;
      }
      var fR = nucF[0] + nucF[2];
      var fY = nucF[1] + nucF[3];
      var K1 = 2 * nucF[0] * nucF[2] / fR;
      var K2 = 2 * nucF[1] * nucF[3] / fY;
      var K3 = 2 * (fR * fY - nucF[0] * nucF[2] * fY / fR - nucF[1] * nucF[3] * fR / fY);
      AG	= 1 - AG / K1 - 0.5 * tv / fR;
      CT	= 1 - CT / K2 - 0.5 * tv / fY;
      tv  = 1 - 0.5 * tv / fY / fR;
      dist = -K1 * Math.log(AG) - K2 * Math.log(CT) - K3 * Math.log(tv);
    }

    return(dist);
  }

  if(typeof exports !== 'undefined'){
    if(typeof module !== 'undefined' && module.exports){
      exports = module.exports = tn93;
    }
    exports.tn93 = tn93;
  } else {
    window.tn93 = tn93;
  }

})();
