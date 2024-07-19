

// async function effectGoal() {
//     var targetH = randomNum(-20, 20);
//     var currentH = goal.h;
//     var newH;
//     if (currentH === targetH) {
//         goalEffectComplete = true;
//     }
//     else {
//         if (currentH < targetH) {
//             for (var i = currentH; i < targetH; i++) {
//                 newH = i;
//                 await new Promise(r => setTimeout(r, 100));
//             }
//         }
//         else {
//             for (var i = currentH; i > targetH; i--) {
//                 newH = i;
//                 await new Promise(r => setTimeout(r, 100));
//             }
//         }
//         goal.h = newH;
//     }
// }