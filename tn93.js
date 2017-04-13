// Valid matchModes include "RESOLVE", "AVERAGE", "SKIP", "GAPMM"
tn93 = function(s1, s2, matchMode = "RESOLVE") {
  var L = Math.min(s1.length, s2.length);
  var mapChar = [
    16, // 0
    16, // 1
    16, // 2
    16, // 3
    16, // 4
    16, // 5
    16, // 6
    16, // 7
    16, // 8
    16, // 9
    16, // 10
    16, // 11
    16, // 12
    16, // 13
    16, // 14
    16, // 15
    16, // 16
    16, // 17
    16, // 18
    16, // 19
    16, // 20
    16, // 21
    16, // 22
    16, // 23
    16, // 24
    16, // 25
    16, // 26
    16, // 27
    16, // 28
    16, // 29
    16, // 30
    16, // 31
    16, // 32
    16, // 33
    16, // 34
    16, // 35
    16, // 36
    16, // 37
    16, // 38
    16, // 39
    16, // 40
    16, // 41
    16, // 42
    16, // 43
    16, // 44
    17, // 45 = GAP
    16, // 46
    16, // 47
    16, // 48
    16, // 49
    16, // 50
    16, // 51
    16, // 52
    16, // 53
    16, // 54
    16, // 55
    16, // 56
    16, // 57
    16, // 58
    16, // 59
    16, // 60
    16, // 61
    16, // 62
    16, // 63 = ?
    16, // 64
    0, // 65 = A
    11, // 66 = B
    1, // 67 = C
    12, // 68 = D
    16, // 69
    16, // 70
    2, // 71 = G
    13, // 72 = H
    16, // 73
    16, // 74
    9, // 75 = K
    16, // 76
    10, // 77 = M
    15, // 78 = N
    16, // 79
    16, // 80
    16, // 81
    5, // 82 = R
    7, // 83 = S
    3, // 84 = T
    4, // 85 = U
    14, // 86 = V
    8, // 87 = W
    16, // 88
    6, // 89 = Y
    16, // 90
    16, // 91
    16, // 92
    16, // 93
    16, // 94
    16, // 95
    16, // 96
    0, // 97 = a
    11, // 98 = b
    1, // 99 = c
    12, // 100 = d
    16, // 101
    16, // 102
    2, // 103 = g
    13, // 104 = h
    16, // 105
    16, // 106
    9, // 107 = k
    16, // 108
    10, // 109 = m
    15, // 110 = n
    16, // 111
    16, // 112
    16, // 113
    5, // 114 = r
    7, // 115 = s
    3, // 116 = t
    4, // 117 = u
    14, // 118 = v
    8, // 119 = w
    16, // 120
    6, // 121 = y
    16, // 122
    16, // 123
    16, // 124
    16, // 125
    16, // 126
    16, // 127
    16, // 128
    16, // 129
    16, // 130
    16, // 131
    16, // 132
    16, // 133
    16, // 134
    16, // 135
    16, // 136
    16, // 137
    16, // 138
    16, // 139
    16, // 140
    16, // 141
    16, // 142
    16, // 143
    16, // 144
    16, // 145
    16, // 146
    16, // 147
    16, // 148
    16, // 149
    16, // 150
    16, // 151
    16, // 152
    16, // 153
    16, // 154
    16, // 155
    16, // 156
    16, // 157
    16, // 158
    16, // 159
    16, // 160
    16, // 161
    16, // 162
    16, // 163
    16, // 164
    16, // 165
    16, // 166
    16, // 167
    16, // 168
    16, // 169
    16, // 170
    16, // 171
    16, // 172
    16, // 173
    16, // 174
    16, // 175
    16, // 176
    16, // 177
    16, // 178
    16, // 179
    16, // 180
    16, // 181
    16, // 182
    16, // 183
    16, // 184
    16, // 185
    16, // 186
    16, // 187
    16, // 188
    16, // 189
    16, // 190
    16, // 191
    16, // 192
    16, // 193
    16, // 194
    16, // 195
    16, // 196
    16, // 197
    16, // 198
    16, // 199
    16, // 200
    16, // 201
    16, // 202
    16, // 203
    16, // 204
    16, // 205
    16, // 206
    16, // 207
    16, // 208
    16, // 209
    16, // 210
    16, // 211
    16, // 212
    16, // 213
    16, // 214
    16, // 215
    16, // 216
    16, // 217
    16, // 218
    16, // 219
    16, // 220
    16, // 221
    16, // 222
    16, // 223
    16, // 224
    16, // 225
    16, // 226
    16, // 227
    16, // 228
    16, // 229
    16, // 230
    16, // 231
    16, // 232
    16, // 233
    16, // 234
    16, // 235
    16, // 236
    16, // 237
    16, // 238
    16, // 239
    16, // 240
    16, // 241
    16, // 242
    16, // 243
    16, // 244
    16, // 245
    16, // 246
    16, // 247
    16, // 248
    16, // 249
    16, // 250
    16, // 251
    16, // 252
    16, // 253
    16, // 254
    16 // 255
  ];

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
  var nucFreq = [0, 0, 0, 0];
  var totalNonGap	= 0;
  var nucF = [0, 0, 0, 0];
  var pairwiseCounts = [
    [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
  ];

  for (var i = 0; i < 4; i++){
    for (var p = 0; p < L; p++) {
      var c1 = mapChar[s1.charCodeAt(p)];
      var c2 = mapChar[s2.charCodeAt(p)];

      if (c1 < 4 && c2 < 4) {
        pairwiseCounts [c1][c2] += 1;
      } else { // not both resolved
        if (c1 == 17 || c2 == 17) {
          if (matchMode != "GAPMM") {
            continue;
          } else {
            if (c1 == 17 && c2 == 17){
              continue;
            } else {
              if (c1 == 17) {
                c1 = 15;
              } else {
                c2 = 15;
              }
            }
          }
        }

        if (c1 < 4) { // c1 resolved and c2 is not
          if (matchMode != "SKIP") {
            if (resolutionsCount[c2] > 0) {
              if (matchMode == "RESOLVE") {
                if (resolutions[c2][c1]) {
                  ambig_count++;
                  pairwiseCounts[c1][c1] += 1;
                  continue;
                }
              }
              for(var j = 0; j < 4; j++) {
                if (resolutions[c2][j]) {
                  pairwiseCounts[c1][j] += resolutionsCount[c2];
                }
              }
            }
          }
        } else {
          if (matchMode != "SKIP") {
            if (c2 < 4) { // c2 resolved an c1 is not
              if (resolutionsCount[c1] > 0) {
                if (matchMode == "RESOLVE") {
                  if (resolutions[c1][c2]) {
                    ambig_count++;
                    pairwiseCounts[c2][c2] += 1;
                    continue;
                  }
                }
                for(var j = 0; j < 4; j++) {
                  if (resolutions[c1][j]) {
                    pairwiseCounts[j][c2] += resolutionsCount[c1];
                  }
                }
              }
            } else {
              // ambig and ambig
              norm = resolutionsCount[c1] * resolutionsCount[c2];
              if (norm > 0.0) {
                if (matchMode == "RESOLVE") {
                  ambig_count++;
                  matched_count = 0;
                  positive_match = [false, false, false, false];
                  for (var j = 0; j < 4; j++) {
                    if (resolutions[c1][j] && resolutions[c2][j]) {
                      matched_count++;
                      positive_match[j] = true;
                    }
                  }

                  if (matched_count > 0) {
                    norm2 = 1/matched_count;
                    for (var j = 0; j < 4; j++) {
                      if (positive_match[j]) {
                        pairwiseCounts[j][j] += norm2;
                      }
                    }
                    continue;
                  }
                }

                for (var j = 0; j < 4; j++) {
                  if (resolutions[c1][j]) {
                    for (var k = 0; k < 4; k++) {
                      if (resolutions[c2][k]) {
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

  for (var c1 = 0; c1 < 4; c1++) {
    for (var c2 = 0; c2 < 4; c2++) {
      totalNonGap += pairwiseCounts[c1][c2];
      nucFreq[c1] += pairwiseCounts[c1][c2];
      nucFreq[c2] += pairwiseCounts[c1][c2];
    }
  }

  totalNonGap = 2/(nucFreq[0] + nucFreq[1] + nucFreq[2] + nucFreq[3]);
  var auxd = 1/(nucFreq[0] + nucFreq[1] + nucFreq[2] + nucFreq[3]);
  for (var aux1 = 0; aux1 < 4; aux1++){
    nucF[aux1] = nucFreq[aux1] * auxd;
  }

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
